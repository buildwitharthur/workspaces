import type { ReactNode } from 'react'
import { WorkspaceSidebar } from '@/app/workspaces/[workspaceSlug]/components/workspace-sidebar'
import { requireWorkspaceMemberPage } from '@/lib/workspace-authorization'
import { WorkspaceStoreSync } from '@/store/workspace'

export default async function WorkspaceLayout({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ workspaceSlug: string }>
}) {
    const { workspaceSlug } = await params

    const membership = await requireWorkspaceMemberPage(workspaceSlug)

    return (
        <div className="flex min-h-dvh bg-bg">
            <WorkspaceStoreSync
                workspaceSlug={workspaceSlug}
                role={membership.role}
            />
            <WorkspaceSidebar workspaceSlug={workspaceSlug} />
            <main className="min-w-0 flex-1">{children}</main>
        </div>
    )
}
