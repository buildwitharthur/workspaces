import type { WorkspaceRole } from '@/generated/prisma/client'
import { InviteStatus } from '@/generated/prisma/enums'
import { db } from '@/lib/db'
import { requireAuthPage } from '@/lib/authentication'

export type PendingInviteItem = {
    id: string
    workspaceId: string
    workspaceName: string
    workspaceSlug: string
    invitedByName: string | null
    role: WorkspaceRole
}

export async function getPendingInvites(): Promise<PendingInviteItem[]> {
    const user = await requireAuthPage()

    if (!user.email) {
        return []
    }

    const invites = await db.invite.findMany({
        where: {
            email: user.email,
            status: InviteStatus.PENDING,
            expiresAt: {
                gt: new Date(),
            },
        },
        select: {
            id: true,
            role: true,
            workspace: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
            invitedBy: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return invites.map((invite) => ({
        id: invite.id,
        workspaceId: invite.workspace.id,
        workspaceName: invite.workspace.name,
        workspaceSlug: invite.workspace.slug,
        invitedByName: invite.invitedBy.name,
        role: invite.role,
    }))
}
