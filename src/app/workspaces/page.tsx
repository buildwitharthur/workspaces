import { Suspense } from 'react'
import { Header } from '@/app/workspaces/components/header'
import { PageHeader } from '@/app/workspaces/components/page-header'
import { PendingInvites } from '@/app/workspaces/components/pending-invites'
import { PendingInvitesSkeleton } from '@/app/workspaces/components/pending-invites-skeleton'
import { WorkspacesList } from '@/app/workspaces/components/workspaces-list'
import { WorkspacesListSkeleton } from '@/app/workspaces/components/workspaces-list-skeleton'

export default async function Page() {
    return (
        <div className="min-h-dvh">
            <Header />
            <main className="mx-auto w-full max-w-[720px] px-4 pt-7 sm:px-6 sm:pt-10">
                <PageHeader />
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
