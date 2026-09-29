import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const buttonVariants = tv({
    base: [
        'inline-flex items-center justify-center gap-2',
        'h-control-md rounded-pill border border-transparent px-4',
        'text-sm leading-5 font-medium whitespace-nowrap',
        'cursor-pointer select-none transition-[background-color,border-color,color] duration-150',
        'focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:border-line disabled:text-text-subtle',
    ],
    variants: {
        variant: {
            primary: 'bg-brand-500 text-on-brand hover:bg-brand-600',
            secondary: 'bg-surface border-line text-text-2 hover:border-line-strong hover:text-text',
            danger: 'bg-danger text-on-brand hover:bg-danger-strong',
            text: 'bg-transparent text-text-muted hover:bg-surface-raised hover:text-text',
            ghost: 'bg-transparent text-text-muted hover:bg-surface-raised hover:text-text',
        },
        size: {
            sm: 'h-control-sm px-3 text-[13px]',
            md: 'h-control-md px-4',
            lg: 'h-control-lg px-5',
            icon: 'size-control-sm rounded-sm px-0',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
})

export type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants>

export function Button({
    className,
    variant,
    size,
    type = 'button',
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={twMerge(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
}
