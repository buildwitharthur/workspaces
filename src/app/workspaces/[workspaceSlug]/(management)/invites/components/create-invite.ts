'use server'

import { randomBytes } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { InviteStatus, WorkspaceRole } from '@/generated/prisma/enums'
import { requireWorkspaceMemberAction } from '@/lib/workspace-authorization'
import { db } from '@/lib/db'
import { resend } from '@/lib/resend'
import type { ActionResult } from '@/types/action-result'
import {
    inviteMemberSchema,
    type InviteMemberInput,
} from './invite-member-schema'

type CreatedInvite = {
    id: string
    email: string
    role: WorkspaceRole
    status: InviteStatus
}

export async function createInvite(
    workspaceSlug: string,
    input: InviteMemberInput,
): Promise<ActionResult<CreatedInvite>> {
    const membershipResult = await requireWorkspaceMemberAction(workspaceSlug)

    if (!membershipResult.success) {
        return membershipResult
    }

    const parsed = inviteMemberSchema.safeParse(input)

    if (!parsed.success) {
        return {
            success: false,
            data: null,
            message: parsed.error.issues[0]?.message ?? 'Dados inválidos.',
        }
    }

    const membership = membershipResult.data

    if (
        membership.role !== WorkspaceRole.OWNER &&
        membership.role !== WorkspaceRole.ADMIN
    ) {
        return {
            success: false,
            data: null,
            message: 'Você não possui permissão para enviar convites.',
        }
    }

    if (
        membership.role === WorkspaceRole.ADMIN &&
        parsed.data.role !== WorkspaceRole.MEMBER
    ) {
        return {
            success: false,
            data: null,
            message: 'Administradores só podem convidar membros.',
        }
    }

    const existingMember = await db.membership.findFirst({
        where: {
            workspaceId: membership.workspaceId,
            user: {
                email: {
                    equals: parsed.data.email,
                    mode: 'insensitive',
                },
            },
        },
        select: { id: true },
    })

    if (existingMember) {
        return {
            success: false,
            data: null,
            message: 'Este usuário já faz parte do workspace.',
        }
    }

    const existingPendingInvite = await db.invite.findFirst({
        where: {
            workspaceId: membership.workspaceId,
            email: parsed.data.email,
            status: InviteStatus.PENDING,
            expiresAt: { gt: new Date() },
        },
        select: { id: true },
    })

    if (existingPendingInvite) {
        return {
            success: false,
            data: null,
            message: 'Já existe um convite pendente para este e-mail.',
        }
    }

    const workspace = await db.workspace.findUnique({
        where: { id: membership.workspaceId },
        select: { name: true },
    })

    if (!workspace) {
        throw new Error('Workspace da membership não foi encontrado.')
    }

    const appUrl = process.env.APP_URL
    const from = process.env.EMAIL_FROM

    if (!appUrl || !from) {
        throw new Error('APP_URL e EMAIL_FROM precisam estar configurados.')
    }

    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const invite = await db.invite.create({
        data: {
            workspaceId: membership.workspaceId,
            invitedById: membership.userId,
            email: parsed.data.email,
            role: parsed.data.role,
            token,
            status: InviteStatus.PENDING,
            expiresAt,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
        },
    })

    try {
        const result = await resend.emails.send({
            from,
            to: parsed.data.email,
            subject: `Convite para ${workspace.name}`,
            text: [
                `Você foi convidado para participar de ${workspace.name}.`,
                '',
                'Acesse o link abaixo para visualizar o convite:',
                `${appUrl}/workspaces?invite=${token}`,
            ].join('\n'),
        })

        if (result.error) throw result.error
    } catch (error) {
        try {
            await db.invite.delete({ where: { id: invite.id } })
        } catch {
            // Preserve the original email delivery error.
        }

        throw error
    }

    revalidatePath(`/workspaces/${workspaceSlug}/invites`)
    revalidatePath('/workspaces')

    return {
        success: true,
        data: invite,
    }
}
