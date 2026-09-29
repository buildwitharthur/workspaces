import { redirect } from 'next/navigation'
import { WorkspaceRole } from '@/generated/prisma/enums'
import type { WorkspaceRole as WorkspaceRoleType } from '@/generated/prisma/enums'
import { db } from '@/lib/db'
import { requireWorkspaceMember } from '@/lib/workspace-authorization'

export type MemberListItem = {
    id: string
    userId: string
    name: string | null
    email: string | null
    image: string | null
    role: WorkspaceRoleType
    joinedAt: Date
    isCurrentUser: boolean
}

export type MembersResult = {
    members: MemberListItem[]
    currentUserRole: WorkspaceRoleType
}

export async function getMembers(
    workspaceSlug: string,
): Promise<MembersResult> {
    const currentMembership = await requireWorkspaceMember(workspaceSlug)

    if (
        currentMembership.role !== WorkspaceRole.OWNER &&
        currentMembership.role !== WorkspaceRole.ADMIN
    ) {
        redirect(`/workspaces/${workspaceSlug}`)
    }

    const memberships = await db.membership.findMany({
        where: {
            workspaceId: currentMembership.workspaceId,
        },
        select: {
            id: true,
            userId: true,
            role: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    return {
        members: memberships.map((member) => ({
            id: member.id,
            userId: member.userId,
            name: member.user.name,
            email: member.user.email,
            image: member.user.image,
            role: member.role,
            joinedAt: member.createdAt,
            isCurrentUser: member.userId === currentMembership.userId,
        })),
        currentUserRole: currentMembership.role,
    }
}
