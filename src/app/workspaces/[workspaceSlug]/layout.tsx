import type { ReactNode } from 'react'
import { requireWorkspaceMember } from '@/lib/workspace-authorization'

export default async function WorkspaceLayout({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ workspaceSlug: string }>
}) {
    const { workspaceSlug } = await params

    await requireWorkspaceMember(workspaceSlug)

    return children
}
