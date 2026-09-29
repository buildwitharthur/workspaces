import { getMembers } from './get-members'
import { MembersData } from './members-data'

export async function MembersList({
    workspaceSlug,
}: {
    workspaceSlug: string
}) {
    const { members, currentUserRole } = await getMembers(workspaceSlug)

    return <MembersData members={members} currentUserRole={currentUserRole} />
}
