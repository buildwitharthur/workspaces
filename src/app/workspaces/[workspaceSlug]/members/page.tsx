import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { WorkspaceRole } from '@/generated/prisma/enums'
import { requireWorkspaceMember } from '@/lib/workspace-authorization'
import { MembersHeader } from './components/members-header'
import { MembersList } from './components/members-list'
import { MembersListSkeleton } from './components/members-list-skeleton'

export default async function Page({
    params,
}: {
    params: Promise<{ workspaceSlug: string }>
}) {
    const { workspaceSlug } = await params
    const membership = await requireWorkspaceMember(workspaceSlug)

    if (
        membership.role !== WorkspaceRole.OWNER &&
        membership.role !== WorkspaceRole.ADMIN
    ) {
        redirect(`/workspaces/${workspaceSlug}`)
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
            <MembersHeader />

            <Suspense fallback={<MembersListSkeleton />}>
                <MembersList workspaceSlug={workspaceSlug} />
            </Suspense>
        </div>
    )
}
