import type { WorkspaceRole } from '@/generated/prisma/client'
import { db } from '@/lib/db'
import { requireAuthenticatedUser } from '@/lib/authentication'

export type WorkspaceListItem = {
    id: string
    name: string
    slug: string
    role: WorkspaceRole
    memberCount: number
}

export async function getWorkspaces(): Promise<WorkspaceListItem[]> {
    const user = await requireAuthenticatedUser()

    const memberships = await db.membership.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            workspace: {
                createdAt: 'desc',
            },
        },
        select: {
            role: true,
            workspace: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    _count: {
                        select: {
                            memberships: true,
                        },
                    },
                },
            },
        },
    })

    return memberships.map(({ role, workspace }) => ({
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        role,
        memberCount: workspace._count.memberships,
    }))
}
