import type { ReactNode } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { requireWorkspaceMemberPage } from '@/lib/workspace-authorization'
import { WorkspaceStoreSync } from '@/store/workspace'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'

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
        <SidebarProvider>
            <WorkspaceStoreSync
                workspaceSlug={workspaceSlug}
                role={membership.role}
            />
            <AppSidebar workspaceSlug={workspaceSlug} />
            <SidebarInset>
                <header className="flex h-12 items-center border-b border-line px-4 md:hidden">
                    <SidebarTrigger />
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
