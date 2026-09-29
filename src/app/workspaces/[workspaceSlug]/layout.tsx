import type { ReactNode } from 'react'
import { WorkspaceSidebar } from '@/app/workspaces/[workspaceSlug]/components/workspace-sidebar'
import { requireAuthenticatedUser } from '@/lib/authentication'
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
    const user = await requireAuthenticatedUser()

    return (
        <div className="flex min-h-dvh bg-bg">
            <WorkspaceSidebar user={user} workspaceSlug={workspaceSlug} />
            <main className="min-w-0 flex-1">{children}</main>
        </div>
    )
}
