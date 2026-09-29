'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
    forwardRef,
    type ComponentPropsWithoutRef,
    type ElementRef,
    type ReactNode,
} from 'react'
import { twMerge } from 'tailwind-merge'

type DropdownMenuProps = ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Root
> & {
    className?: string
    children: ReactNode
}

export function DropdownMenu({ className, children, ...props }: DropdownMenuProps) {
    return (
        <DropdownMenuPrimitive.Root {...props}>
            <span className={twMerge('relative inline-block', className)}>
                {children}
            </span>
        </DropdownMenuPrimitive.Root>
    )
}

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export const DropdownMenuTrigger = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Trigger
        ref={ref}
        className={className}
        {...props}
    />
))
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName

export const DropdownMenuContent = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, align = 'start', sideOffset = 8, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={twMerge(
                [
                    'z-50 min-w-[220px] overflow-hidden rounded-[12px] border border-line bg-surface p-1.5 text-text-2 shadow-[var(--shadow-popover)]',
                    'origin-[--radix-dropdown-menu-content-transform-origin]',
                    'data-[state=open]:animate-[ui-pop_0.16s_ease-out_both] data-[state=closed]:animate-[ui-pop_0.12s_ease-in_reverse_both]',
                    'motion-reduce:animate-none',
                ].join(' '),
                className,
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

type DropdownMenuItemProps = ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Item
> & {
    variant?: 'default' | 'danger'
    checked?: boolean
}

export const DropdownMenuItem = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, variant = 'default', checked, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        aria-checked={checked}
        className={twMerge(
            [
                'relative flex min-h-control-sm w-full cursor-default select-none items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-1.5',
                'text-left text-sm leading-5 font-medium outline-none',
                'transition-colors hover:bg-surface-raised focus:bg-surface-raised',
                'data-[disabled]:pointer-events-none data-[disabled]:text-text-subtle',
                checked ? 'bg-surface-raised' : '',
                variant === 'danger' ? 'text-danger-text' : '',
            ].join(' '),
            className,
        )}
        {...props}
    />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export const DropdownMenuSeparator = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
        ref={ref}
        className={twMerge('my-1.5 h-px bg-line', className)}
        {...props}
    />
))
DropdownMenuSeparator.displayName =
    DropdownMenuPrimitive.Separator.displayName
