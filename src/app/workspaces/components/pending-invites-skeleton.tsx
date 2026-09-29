function SkeletonBar({ className }: { className: string }) {
    return (
        <span
            className={`block animate-pulse rounded bg-surface-raised ${className}`}
        />
    )
}

export function PendingInvitesSkeleton() {
    return (
        <section className="mt-8" aria-hidden="true">
            <SkeletonBar className="h-5 w-36" />
            <SkeletonBar className="mt-2 h-5 w-72 max-w-full" />

            <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
                {Array.from({ length: 2 }, (_, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-4 py-3.5 ${index > 0 ? 'border-t border-line' : ''}`}
                    >
                        <SkeletonBar className="size-7 shrink-0 rounded-sm" />
                        <div className="min-w-0 flex-1">
                            <SkeletonBar
                                className={
                                    index === 0 ? 'h-4 w-32' : 'h-4 w-40'
                                }
                            />
                            <SkeletonBar className="mt-2 h-4 w-52 max-w-full" />
                        </div>
                        <SkeletonBar className="h-[18px] w-16 shrink-0 rounded-pill" />
                        <div className="flex shrink-0 gap-1">
                            <SkeletonBar className="h-8 w-16 rounded-pill" />
                            <SkeletonBar className="h-8 w-16 rounded-pill" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
