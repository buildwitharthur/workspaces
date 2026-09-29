'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@/generated/prisma/client'
import { InviteStatus } from '@/generated/prisma/enums'
import { requireAuthAction } from '@/lib/authentication'
import { db } from '@/lib/db'
import type { ActionResult } from '@/types/action-result'

type AcceptedInvite = {
    workspaceSlug: string
}

function getInviteStatusMessage(status: InviteStatus) {
    switch (status) {
        case InviteStatus.ACCEPTED:
            return 'Este convite já foi aceito.'
        case InviteStatus.REVOKED:
            return 'Este convite foi revogado.'
        case InviteStatus.EXPIRED:
            return 'Este convite expirou.'
        case InviteStatus.DECLINED:
            return 'Este convite não está mais disponível.'
        default:
            return 'Este convite não está mais disponível.'
    }
}

export async function acceptInvite(
    inviteId: string,
): Promise<ActionResult<AcceptedInvite>> {
    const authResult = await requireAuthAction()

    if (!authResult.success) {
        return authResult
    }

    const userEmail = authResult.data.email?.trim().toLowerCase()

    if (!userEmail) {
        return {
            success: false,
            data: null,
            message: 'Sua conta não possui um e-mail válido.',
        }
    }

    const invite = await db.invite.findUnique({
        where: { id: inviteId },
        select: {
            id: true,
            email: true,
            workspaceId: true,
            role: true,
            status: true,
            expiresAt: true,
            workspace: {
                select: {
                    slug: true,
                },
            },
        },
    })

    if (!invite) {
        return {
            success: false,
            data: null,
            message: 'Convite não encontrado.',
        }
    }

    if (invite.email.trim().toLowerCase() !== userEmail) {
        return {
            success: false,
            data: null,
            message: 'Este convite não pertence à sua conta.',
        }
    }

    if (invite.status !== InviteStatus.PENDING) {
        return {
            success: false,
            data: null,
            message: getInviteStatusMessage(invite.status),
        }
    }

    const now = new Date()

    if (invite.expiresAt <= now) {
        await db.invite.updateMany({
            where: {
                id: invite.id,
                status: InviteStatus.PENDING,
            },
            data: {
                status: InviteStatus.EXPIRED,
            },
        })

        return {
            success: false,
            data: null,
            message: 'Este convite expirou.',
        }
    }

    try {
        const result = await db.$transaction(async (tx) => {
            const existingMembership = await tx.membership.findUnique({
                where: {
                    userId_workspaceId: {
                        userId: authResult.data.id,
                        workspaceId: invite.workspaceId,
                    },
                },
                select: { id: true },
            })

            if (existingMembership) {
                return { kind: 'already-member' as const }
            }

            const updatedInvite = await tx.invite.updateMany({
                where: {
                    id: invite.id,
                    status: InviteStatus.PENDING,
                    expiresAt: { gt: now },
                },
                data: {
                    status: InviteStatus.ACCEPTED,
                },
            })

            if (updatedInvite.count !== 1) {
                const currentInvite = await tx.invite.findUnique({
                    where: { id: invite.id },
                    select: {
                        status: true,
                        expiresAt: true,
                    },
                })

                return {
                    kind: 'not-pending' as const,
                    status: currentInvite?.status ?? null,
                    expiresAt: currentInvite?.expiresAt ?? null,
                }
            }

            await tx.membership.create({
                data: {
                    userId: authResult.data.id,
                    workspaceId: invite.workspaceId,
                    role: invite.role,
                },
            })

            return { kind: 'accepted' as const }
        })

        if (result.kind === 'already-member') {
            return {
                success: false,
                data: null,
                message: 'Você já faz parte deste workspace.',
            }
        }

        if (result.kind === 'not-pending') {
            if (result.expiresAt && result.expiresAt <= new Date()) {
                await db.invite.updateMany({
                    where: {
                        id: invite.id,
                        status: InviteStatus.PENDING,
                    },
                    data: {
                        status: InviteStatus.EXPIRED,
                    },
                })

                return {
                    success: false,
                    data: null,
                    message: 'Este convite expirou.',
                }
            }

            return {
                success: false,
                data: null,
                message: result.status
                    ? getInviteStatusMessage(result.status)
                    : 'Convite não encontrado.',
            }
        }

        revalidatePath('/workspaces')

        return {
            success: true,
            data: {
                workspaceSlug: invite.workspace.slug,
            },
            message: 'Convite aceito com sucesso.',
        }
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            return {
                success: false,
                data: null,
                message: 'Você já faz parte deste workspace.',
            }
        }

        throw error
    }
}
