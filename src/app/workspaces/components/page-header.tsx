import { CreateWorkspaceDialog } from '@/app/workspaces/components/create-workspace-dialog'

export function PageHeader() {
    return (
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                    Seus workspaces
                </h1>
                <p className="mt-1 text-sm leading-5 text-text-muted">
                    Acesse os ambientes dos quais você faz parte.
                </p>
            </div>
            <CreateWorkspaceDialog />
        </div>
    )
}
