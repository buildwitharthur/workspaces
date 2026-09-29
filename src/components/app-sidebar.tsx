import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarDropdown } from '@/components/avatar-dropdown'
import { AvatarDropdownSkeleton } from '@/components/avatar-dropdown-skeleton'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { WorkspaceNavigation } from '@/app/workspaces/[workspaceSlug]/components/workspace-navigation'
import { WorkspaceSelect } from '@/app/workspaces/[workspaceSlug]/components/workspace-select'
import { WorkspaceSelectSkeleton } from '@/app/workspaces/[workspaceSlug]/components/workspace-select-skeleton'

export function AppSidebar({ workspaceSlug }: { workspaceSlug: string }) {
    return (
        <Sidebar className="border-r border-line">
            <SidebarHeader className="p-4">
                <Link
                    href="/workspaces"
                    className="flex items-center gap-2.5 text-text focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4"
                >
                    <Image
                        src="/assets/lab-logo.svg"
                        alt=""
                        width={22}
                        height={24}
                    />
                    <span className="text-base leading-6 font-semibold tracking-[-0.01em]">
                        Workspace
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <div className="px-4">
                    <Suspense fallback={<WorkspaceSelectSkeleton />}>
                        <WorkspaceSelect workspaceSlug={workspaceSlug} />
                    </Suspense>
                </div>

                <div className="mt-3 px-4">
                    <WorkspaceNavigation />
                </div>
            </SidebarContent>

            <SidebarFooter className="p-4">
                <Suspense
                    fallback={<AvatarDropdownSkeleton variant="extended" />}
                >
                    <AvatarDropdown variant="extended" />
                </Suspense>
            </SidebarFooter>
        </Sidebar>
    )
}
