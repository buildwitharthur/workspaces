'use server'

import type { Membership } from '@/generated/prisma/client'
import type { ActionResult } from '@/types/action-result'
import { requireWorkspaceMemberAction } from '@/lib/workspace-authorization'

export async function updateWorkspace(
    workspaceSlug: string,
): Promise<ActionResult<Membership>> {
    const authorization = await requireWorkspaceMemberAction(workspaceSlug)

    if (!authorization.success) {
        return authorization
    }

    return {
        success: true,
        data: authorization.data,
    }
}
