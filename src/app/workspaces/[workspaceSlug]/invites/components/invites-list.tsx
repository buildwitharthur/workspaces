import { getInvites } from '@/app/workspaces/[workspaceSlug]/invites/components/get-invites'
import { InvitesData } from '@/app/workspaces/[workspaceSlug]/invites/components/invites-data'

export async function InvitesList({ workspaceSlug }: { workspaceSlug: string }) {
    const invites = await getInvites(workspaceSlug)

    return <InvitesData invites={invites} />
}
