import { getWorkspaceOptions } from '@/app/workspaces/[workspaceSlug]/components/get-workspace-options'
import { WorkspaceSelectData } from '@/app/workspaces/[workspaceSlug]/components/workspace-select-data'

export async function WorkspaceSelect({
    workspaceSlug,
}: {
    workspaceSlug: string
}) {
    const workspaces = await getWorkspaceOptions()
    const currentWorkspace =
        workspaces.find((workspace) => workspace.slug === workspaceSlug) ?? null

    return (
        <WorkspaceSelectData
            currentWorkspace={currentWorkspace}
            workspaces={workspaces}
        />
    )
}
