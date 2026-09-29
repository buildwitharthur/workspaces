import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { WorkspaceSelect } from '@/app/workspaces/[workspaceSlug]/components/workspace-select'
import { WorkspaceSelectSkeleton } from '@/app/workspaces/[workspaceSlug]/components/workspace-select-skeleton'

type WorkspaceSidebarProps = {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

function getInitials(name?: string | null) {
    const parts = name?.trim().split(/\s+/).filter(Boolean) ?? []

    return parts.length > 0
        ? parts
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase()
        : '?'
}

export function WorkspaceSidebar({
    user,
    workspaceSlug,
}: WorkspaceSidebarProps & { workspaceSlug: string }) {
    return (
        <aside className="flex min-h-dvh w-[220px] shrink-0 flex-col border-r border-line bg-bg">
            <div className="p-4">
                <Link
                    href="/workspaces"
                    className="flex items-center gap-2.5 text-text focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4"
                >
                    <Image src="/assets/lab-logo.svg" alt="" width={22} height={24} />
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

            <div className="flex-1" />

            <div className="flex min-w-0 items-center gap-2.5 p-4">
                <Avatar size="sm" aria-label={user.name ?? user.email ?? 'Usuário'}>
                    {getInitials(user.name)}
                </Avatar>
                <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm leading-5 font-medium text-text">
                        {user.name ?? 'Usuário'}
                    </span>
                    <span className="truncate text-xs leading-[18px] text-text-muted">
                        {user.email ?? ''}
                    </span>
                </div>
            </div>
        </aside>
    )
}
