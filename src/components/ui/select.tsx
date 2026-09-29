import { twMerge } from 'tailwind-merge'

export type SelectProps = React.ComponentProps<'select'>

export function Select({ className, children, ...props }: SelectProps) {
    return (
        <span className="relative block w-full">
            <select
                className={twMerge(
                    [
                        'h-control-lg w-full appearance-none rounded-md border border-line bg-surface px-3 pr-9',
                        'text-sm text-text outline-none transition-[border-color,box-shadow] duration-150',
                        'hover:border-line-strong focus:border-brand-600 focus:shadow-[var(--shadow-focus)]',
                        'aria-[invalid=true]:border-danger',
                        'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-text-subtle',
                    ].join(' '),
                    className,
                )}
                {...props}
            >
                {children}
            </select>
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-subtle"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m7 10 5 5 5-5" />
            </svg>
        </span>
    )
}
