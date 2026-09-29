import type { WorkspaceRole } from '@/generated/prisma/client'
import { requireAuthPage } from '@/lib/authentication'
import { db } from '@/lib/db'

export type WorkspaceOption = {
    id: string
    name: string
    slug: string
    role: WorkspaceRole
}

export async function getWorkspaceOptions(): Promise<WorkspaceOption[]> {
    const user = await requireAuthPage()

    const memberships = await db.membership.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            workspace: {
                name: 'asc',
            },
        },
        select: {
            role: true,
            workspace: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    })

    return memberships.map(({ role, workspace }) => ({
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        role,
    }))
}
