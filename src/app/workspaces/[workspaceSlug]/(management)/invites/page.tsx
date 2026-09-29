import { Suspense } from 'react'

import { InvitesList } from '@/app/workspaces/[workspaceSlug]/(management)/invites/components/invites-list'
import { InvitesListSkeleton } from '@/app/workspaces/[workspaceSlug]/(management)/invites/components/invites-list-skeleton'
import { InviteMemberDialog } from './components/invite-member-dialog'

export default async function Page({
    params,
}: {
    params: Promise<{ workspaceSlug: string }>
}) {
    const { workspaceSlug } = await params

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                        Convites
                    </h1>
                    <p className="mt-1 text-sm leading-5 text-text-muted">
                        Gerencie convites enviados para novos membros.
                    </p>
                </div>
                <InviteMemberDialog />
            </div>
            <Suspense fallback={<InvitesListSkeleton />}>
                <InvitesList workspaceSlug={workspaceSlug} />
            </Suspense>
        </div>
    )
}
