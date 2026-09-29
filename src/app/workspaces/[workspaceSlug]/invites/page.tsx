import { redirect } from 'next/navigation'
import { WorkspaceRole } from '@/generated/prisma/enums'
import { InvitesHeader } from '@/app/workspaces/[workspaceSlug]/invites/components/invites-header'
import { requireWorkspaceMember } from '@/lib/workspace-authorization'

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
            <InvitesHeader role={membership.role} />
        </div>
    )
}
