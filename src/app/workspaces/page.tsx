import { Suspense } from 'react'

import { PendingInvites } from '@/app/workspaces/components/pending-invites'
import { PendingInvitesSkeleton } from '@/app/workspaces/components/pending-invites-skeleton'
import { WorkspacesList } from '@/app/workspaces/components/workspaces-list'
import { WorkspacesListSkeleton } from '@/app/workspaces/components/workspaces-list-skeleton'
import { CreateWorkspaceDialog } from './components/create-workspace-dialog'
import Link from 'next/link'
import Image from 'next/image'
import { AvatarDropdownSkeleton } from '@/components/avatar-dropdown-skeleton'
import { AvatarDropdown } from '@/components/avatar-dropdown'

export default async function Page() {
    return (
        <div className="min-h-dvh">
            <header className="flex h-16 items-center justify-between gap-4 px-4 sm:px-8">
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

                <Suspense fallback={<AvatarDropdownSkeleton />}>
                    <AvatarDropdown />
                </Suspense>
            </header>
            <main className="mx-auto w-full max-w-[720px] px-4 pt-7 sm:px-6 sm:pt-10">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                            Seus workspaces
                        </h1>
                        <p className="mt-1 text-sm leading-5 text-text-muted">
                            Acesse os ambientes dos quais você faz parte.
                        </p>
                    </div>
                    <CreateWorkspaceDialog />
                </div>
                <Suspense fallback={<PendingInvitesSkeleton />}>
                    <PendingInvites />
                </Suspense>
                <Suspense fallback={<WorkspacesListSkeleton />}>
                    <WorkspacesList />
                </Suspense>
            </main>
        </div>
    )
}
