import type { AvatarDropdownVariant } from '@/components/user-menu'

export function AvatarDropdownSkeleton({
    variant = 'default',
}: {
    variant?: AvatarDropdownVariant
}) {
    if (variant === 'default') {
        return (
            <span
                aria-hidden="true"
                className="block size-8 animate-pulse rounded-pill bg-surface-raised"
            />
        )
    }

    return (
        <span
            aria-hidden="true"
            className="flex w-full min-w-0 max-w-full items-center gap-2.5"
        >
            <span className="size-8 shrink-0 animate-pulse rounded-pill bg-surface-raised" />
            <span className="min-w-0 flex-1 space-y-1 overflow-hidden">
                <span className="block h-3.5 w-28 max-w-full animate-pulse rounded bg-surface-raised" />
                <span className="block h-3 w-36 max-w-full animate-pulse rounded bg-surface-raised" />
            </span>
            <span className="size-4 shrink-0 animate-pulse rounded bg-surface-raised" />
        </span>
    )
}
