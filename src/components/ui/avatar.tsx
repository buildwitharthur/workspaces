'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const avatarVariants = tv({
    base: 'grid shrink-0 place-items-center overflow-hidden rounded-pill bg-gradient-to-br from-brand-600 to-accent-text font-semibold text-bg',
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

export type AvatarProps = ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Root
> &
    VariantProps<typeof avatarVariants> & {
        src?: string | null
        alt?: string
    }

export const Avatar = forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, size, src, alt = '', children, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={twMerge(avatarVariants({ size }), className)}
        {...props}
    >
        <AvatarPrimitive.Image
            src={src ?? undefined}
            alt={alt}
            className="size-full object-cover"
        />
        <AvatarPrimitive.Fallback className="grid size-full place-items-center">
            {children}
        </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
))
Avatar.displayName = AvatarPrimitive.Root.displayName
