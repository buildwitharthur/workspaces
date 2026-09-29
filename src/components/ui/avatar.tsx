import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const avatarVariants = tv({
    base: 'grid shrink-0 place-items-center rounded-pill bg-surface-raised font-semibold text-text-2',
    variants: {
        size: {
            sm: 'size-7 text-[11px]',
            md: 'size-8 text-xs',
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

export type AvatarProps = React.ComponentProps<'span'> &
    VariantProps<typeof avatarVariants> & {
        src?: string | null
        alt?: string
    }

export function Avatar({ className, size, src, alt = '', children, ...props }: AvatarProps) {
    return (
        <span className={twMerge(avatarVariants({ size }), className)} {...props}>
            {src ? <img src={src} alt={alt} className="size-full rounded-pill object-cover" /> : children}
        </span>
    )
}
