import { twMerge } from 'tailwind-merge'

export type InputProps = React.ComponentProps<'input'>

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={twMerge(
                [
                    'h-control-lg w-full rounded-md border border-line bg-surface px-3',
                    'text-sm text-text outline-none transition-[border-color,box-shadow] duration-150',
                    'placeholder:text-text-subtle hover:border-line-strong',
                    'focus:border-brand-600 focus:shadow-[var(--shadow-focus)]',
                    'aria-[invalid=true]:border-danger',
                    'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-text-subtle',
                ].join(' '),
                className,
            )}
            {...props}
        />
    )
}
