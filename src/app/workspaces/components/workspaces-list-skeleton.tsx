function WorkspaceRowSkeleton() {
    return (
        <div className="flex items-center gap-3 px-4 py-3.5">
            <span className="size-7 shrink-0 animate-pulse rounded-sm bg-surface-raised" />
            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="h-4 w-32 animate-pulse rounded-sm bg-surface-raised" />
                <span className="h-3.5 w-20 animate-pulse rounded-sm bg-surface-raised" />
            </span>
            <span className="h-[18px] w-14 animate-pulse rounded-pill bg-surface-raised" />
            <span className="size-4 animate-pulse rounded-sm bg-surface-raised" />
        </div>
    )
}

export function WorkspacesListSkeleton() {
    return (
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
            <WorkspaceRowSkeleton />
            <div className="border-t border-line" />
            <WorkspaceRowSkeleton />
            <div className="border-t border-line" />
            <WorkspaceRowSkeleton />
        </div>
    )
}
