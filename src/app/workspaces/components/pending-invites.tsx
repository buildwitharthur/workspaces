import { getPendingInvites } from '@/app/workspaces/components/get-pending-invites'
import { PendingInvitesData } from '@/app/workspaces/components/pending-invites-data'

export async function PendingInvites() {
    const invites = await getPendingInvites()

    if (invites.length === 0) {
        return null
    }

    return <PendingInvitesData invites={invites} />
}
