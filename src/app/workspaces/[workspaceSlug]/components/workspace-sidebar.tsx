import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarDropdown } from '@/components/avatar-dropdown'
import { AvatarDropdownSkeleton } from '@/components/avatar-dropdown-skeleton'
import { WorkspaceNavigation } from '@/app/workspaces/[workspaceSlug]/components/workspace-navigation'
import { WorkspaceSelect } from '@/app/workspaces/[workspaceSlug]/components/workspace-select'
import { WorkspaceSelectSkeleton } from '@/app/workspaces/[workspaceSlug]/components/workspace-select-skeleton'

export function WorkspaceSidebar({
    workspaceSlug,
}: {
    workspaceSlug: string
}) {
    return (
        <aside className="flex min-h-dvh w-[260px] shrink-0 flex-col border-r border-line bg-bg">
            <div className="p-4">
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
            </div>

            <div className="px-4">
                <Suspense fallback={<WorkspaceSelectSkeleton />}>
                    <WorkspaceSelect workspaceSlug={workspaceSlug} />
                </Suspense>
            </div>

            <div className="mt-3 px-4">
                <WorkspaceNavigation />
            </div>

            <div className="flex-1" />

            <div className="p-4">
                <Suspense fallback={<AvatarDropdownSkeleton />}>
                    <AvatarDropdown />
                </Suspense>
            </div>
        </aside>
    )
}
