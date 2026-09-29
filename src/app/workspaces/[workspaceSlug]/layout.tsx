import type { ReactNode } from 'react'
import { WorkspaceSidebar } from '@/app/workspaces/[workspaceSlug]/components/workspace-sidebar'
import { requireWorkspaceMember } from '@/lib/workspace-authorization'

export default async function WorkspaceLayout({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ workspaceSlug: string }>
}) {
    const { workspaceSlug } = await params

    const membership = await requireWorkspaceMember(workspaceSlug)

    return (
        <div className="flex min-h-dvh bg-bg">
            <WorkspaceSidebar
                workspaceSlug={workspaceSlug}
                role={membership.role}
            />
            <main className="min-w-0 flex-1">{children}</main>
        </div>
    )
}
