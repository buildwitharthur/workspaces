export function WorkspaceSelectSkeleton() {
    return (
        <div className="flex h-[58px] w-full items-center gap-2 rounded-md border border-line bg-surface p-2">
            <span className="size-7 shrink-0 animate-pulse rounded-sm bg-surface-raised" />
            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="h-3.5 w-24 animate-pulse rounded-sm bg-surface-raised" />
                <span className="h-[18px] w-14 animate-pulse rounded-pill bg-surface-raised" />
            </span>
            <span className="size-4 animate-pulse rounded-sm bg-surface-raised" />
        </div>
    )
}
