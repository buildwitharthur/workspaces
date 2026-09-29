import { redirect } from 'next/navigation'
import type { Membership } from '@/generated/prisma/client'
import { db } from '@/lib/db'
import type { ActionResult } from '@/types/action-result'
import { getCurrentUser } from '@/lib/authentication'

async function findMembership(userId: string, workspaceSlug: string) {
    return db.membership.findFirst({
        where: {
            userId,
            workspace: {
                slug: workspaceSlug,
            },
        },
    })
}

export async function requireWorkspaceMember(
    workspaceSlug: string,
): Promise<Membership> {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const membership = await findMembership(user.id, workspaceSlug)

    if (!membership) {
        redirect('/workspaces')
    }

    return membership
}

export async function authorizeWorkspaceMember(
    workspaceSlug: string,
): Promise<ActionResult<Membership>> {
    const user = await getCurrentUser()

    if (!user) {
        return {
            success: false,
            data: null,
            message: 'Usuário não autenticado.',
        }
    }

    const membership = await findMembership(user.id, workspaceSlug)

    if (!membership) {
        return {
            success: false,
            data: null,
            message: 'Você não possui acesso a este workspace.',
        }
    }

    return {
        success: true,
        data: membership,
    }
}
