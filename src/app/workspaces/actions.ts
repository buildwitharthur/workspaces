'use server'

import { revalidatePath } from 'next/cache'
import { Prisma, WorkspaceRole } from '@/generated/prisma/client'
import { requireAuthAction } from '@/lib/authentication'
import { db } from '@/lib/db'
import type { ActionResult } from '@/types/action-result'
import { createWorkspaceSchema, type CreateWorkspaceInput } from './schema'

type CreatedWorkspace = {
    id: string
    name: string
    slug: string
}

export async function createWorkspace(
    input: CreateWorkspaceInput,
): Promise<ActionResult<CreatedWorkspace>> {
    const authResult = await requireAuthAction()

    if (!authResult.success) {
        return authResult
    }

    const parsed = createWorkspaceSchema.safeParse(input)

    if (!parsed.success) {
        return {
            success: false,
            data: null,
            message: parsed.error.issues[0]?.message ?? 'Dados inválidos.',
        }
    }

    try {
        const workspace = await db.$transaction(async (tx) => {
            const workspace = await tx.workspace.create({
                data: {
                    name: parsed.data.name,
                    slug: parsed.data.slug,
                },
            })

            await tx.membership.create({
                data: {
                    userId: authResult.data.id,
                    workspaceId: workspace.id,
                    role: WorkspaceRole.OWNER,
                },
            })

            return workspace
        })

        revalidatePath('/workspaces')

        return {
            success: true,
            data: {
                id: workspace.id,
                name: workspace.name,
                slug: workspace.slug,
            },
        }
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            return {
                success: false,
                data: null,
                message: 'Este slug já está em uso.',
            }
        }

        throw error
    }
}
