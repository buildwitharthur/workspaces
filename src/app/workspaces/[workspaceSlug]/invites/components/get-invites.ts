import { redirect } from 'next/navigation'
import type { InviteStatus, WorkspaceRole } from '@/generated/prisma/enums'
import { WorkspaceRole as WorkspaceRoleEnum } from '@/generated/prisma/enums'
import { db } from '@/lib/db'
import { requireWorkspaceMember } from '@/lib/workspace-authorization'

export type InviteListItem = {
    id: string
    email: string
    role: WorkspaceRole
    status: InviteStatus
    createdAt: Date
    expiresAt: Date
}

export async function getInvites(workspaceSlug: string): Promise<InviteListItem[]> {
    const membership = await requireWorkspaceMember(workspaceSlug)
    const canManageInvites =
        membership.role === WorkspaceRoleEnum.OWNER ||
        membership.role === WorkspaceRoleEnum.ADMIN

    if (!canManageInvites) {
        redirect(`/workspaces/${workspaceSlug}`)
    }

    return db.invite.findMany({
        where: {
            workspaceId: membership.workspaceId,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            expiresAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
}
