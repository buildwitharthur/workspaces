import { Suspense } from 'react'

import { MembersList } from './components/members-list'
import { MembersListSkeleton } from './components/members-list-skeleton'

export default async function Page({
    params,
}: {
    params: Promise<{ workspaceSlug: string }>
}) {
    const { workspaceSlug } = await params

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
            <header>
                <h1 className="text-2xl leading-8 font-semibold tracking-[-0.02em] text-text">
                    Membros
                </h1>
                <p className="mt-1.5 text-sm leading-5 text-text-muted">
                    Pessoas que fazem parte deste workspace.
                </p>
            </header>

            <Suspense fallback={<MembersListSkeleton />}>
                <MembersList workspaceSlug={workspaceSlug} />
            </Suspense>
        </div>
    )
}
