import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const badgeVariants = tv({
    base: [
        'inline-flex items-center gap-1.5 rounded-pill',
        'h-[22px] px-[9px] pl-2 text-xs leading-none font-medium whitespace-nowrap text-text-2',
        'before:size-1.5 before:shrink-0 before:rounded-full before:content-[""]',
    ],
    variants: {
        variant: {
            success: 'bg-tint-success before:bg-brand-500',
            info: 'bg-tint-info before:bg-info',
            neutral: 'bg-tint-neutral before:bg-text-subtle',
            warning: 'bg-tint-warning before:bg-warning',
            danger: 'bg-tint-danger before:bg-danger',
        },
        size: {
            sm: 'h-[18px] px-[7px] pl-1.5 text-[10px]',
            md: 'h-[22px]',
        },
        mono: {
            true: 'font-[var(--font-mono)] text-[11px] tracking-[0.04em]',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'neutral',
        size: 'md',
        mono: false,
    },
})

export type BadgeProps = React.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & {
        mono?: boolean
    }

export function Badge({
    className,
    variant,
    size,
    mono,
    ...props
}: BadgeProps) {
    return <span className={twMerge(badgeVariants({ variant, size, mono }), className)} {...props} />
}
