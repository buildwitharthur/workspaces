import { redirect } from 'next/navigation'
import type { Membership } from '@/generated/prisma/client'
import { db } from '@/lib/db'
import type { ActionResult } from '@/types/action-result'
import { requireAuthAction, requireAuthPage } from '@/lib/authentication'

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

export async function requireWorkspaceMemberPage(
    workspaceSlug: string,
): Promise<Membership> {
    const user = await requireAuthPage()

    const membership = await findMembership(user.id, workspaceSlug)

    if (!membership) {
        redirect('/workspaces')
    }

    return membership
}

export async function requireWorkspaceMemberAction(
    workspaceSlug: string,
): Promise<ActionResult<Membership>> {
    const authResult = await requireAuthAction()

    if (!authResult.success) {
        return authResult
    }

    const membership = await findMembership(authResult.data.id, workspaceSlug)

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
