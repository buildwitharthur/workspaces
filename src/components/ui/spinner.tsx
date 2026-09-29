import { twMerge } from 'tailwind-merge'

export type SpinnerProps = React.ComponentProps<'span'>

export function Spinner({ className, ...props }: SpinnerProps) {
    return (
        <span
            aria-hidden="true"
            className={twMerge(
                'inline-block size-3.5 shrink-0 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin motion-reduce:animate-none',
                className,
            )}
            {...props}
        />
    )
}
