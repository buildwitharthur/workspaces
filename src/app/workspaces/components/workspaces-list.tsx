import { getWorkspaces } from '@/app/workspaces/components/get-workspaces'
import { WorkspacesData } from '@/app/workspaces/components/workspaces-data'

export async function WorkspacesList() {
    const workspaces = await getWorkspaces()

    return <WorkspacesData workspaces={workspaces} />
}
