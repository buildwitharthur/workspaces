'use server'

import { revalidatePath } from 'next/cache'
import { InviteStatus, WorkspaceRole } from '@/generated/prisma/enums'
import { requireWorkspaceMemberAction } from '@/lib/workspace-authorization'
import { db } from '@/lib/db'
import type { ActionResult } from '@/types/action-result'

type RevokedInvite = {
    id: string
}

function getInviteStatusMessage(status: InviteStatus) {
    switch (status) {
        case InviteStatus.ACCEPTED:
            return 'Este convite já foi aceito.'
        case InviteStatus.REVOKED:
            return 'Este convite já foi revogado.'
        case InviteStatus.DECLINED:
            return 'Este convite não está mais disponível.'
        case InviteStatus.EXPIRED:
            return 'Este convite expirou.'
        default:
            return 'Este convite não está mais disponível.'
    }
}

export async function revokeInvite(
    workspaceSlug: string,
    inviteId: string,
): Promise<ActionResult<RevokedInvite>> {
    const membershipResult = await requireWorkspaceMemberAction(workspaceSlug)

    if (!membershipResult.success) {
        return membershipResult
    }

    const membership = membershipResult.data

    if (
        membership.role !== WorkspaceRole.OWNER &&
        membership.role !== WorkspaceRole.ADMIN
    ) {
        return {
            success: false,
            data: null,
            message: 'Você não possui permissão para revogar este convite.',
        }
    }

    const invite = await db.invite.findFirst({
        where: {
            id: inviteId,
            workspaceId: membership.workspaceId,
        },
        select: {
            id: true,
            status: true,
            expiresAt: true,
        },
    })

    if (!invite) {
        return {
            success: false,
            data: null,
            message: 'Convite não encontrado.',
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
                workspaceId: membership.workspaceId,
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

    const updatedInvite = await db.invite.updateMany({
        where: {
            id: invite.id,
            workspaceId: membership.workspaceId,
            status: InviteStatus.PENDING,
            expiresAt: { gt: now },
        },
        data: {
            status: InviteStatus.REVOKED,
        },
    })

    if (updatedInvite.count !== 1) {
        const currentInvite = await db.invite.findFirst({
            where: {
                id: invite.id,
                workspaceId: membership.workspaceId,
            },
            select: {
                status: true,
                expiresAt: true,
            },
        })

        if (currentInvite && currentInvite.expiresAt <= new Date()) {
            await db.invite.updateMany({
                where: {
                    id: invite.id,
                    workspaceId: membership.workspaceId,
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
            message: currentInvite
                ? getInviteStatusMessage(currentInvite.status)
                : 'Convite não encontrado.',
        }
    }

    revalidatePath(`/workspaces/${workspaceSlug}/invites`)

    return {
        success: true,
        data: {
            id: invite.id,
        },
        message: 'Convite revogado com sucesso.',
    }
}
