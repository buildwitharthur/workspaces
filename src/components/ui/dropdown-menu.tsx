'use client'

import {
    cloneElement,
    createContext,
    isValidElement,
    useContext,
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from 'react'
import { twMerge } from 'tailwind-merge'

type MenuContextValue = {
    open: boolean
    setOpen: (open: boolean) => void
    close: (restoreFocus?: boolean) => void
    triggerRef: React.RefObject<HTMLElement | null>
    contentRef: React.RefObject<HTMLDivElement | null>
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
    const context = useContext(MenuContext)
    if (!context) throw new Error('Dropdown menu components must be used inside <DropdownMenu>.')
    return context
}

export function DropdownMenu({ children, className }: { children: ReactNode; className?: string }) {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const close = (restoreFocus = true) => {
        setOpen(false)
        if (restoreFocus) window.setTimeout(() => triggerRef.current?.focus(), 0)
    }

    useEffect(() => {
        if (!open) return

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node
            if (!contentRef.current?.contains(target) && !triggerRef.current?.contains(target)) close(false)
        }
        const onResize = () => close(false)
        const onScroll = () => close(false)

        document.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('resize', onResize)
        document.addEventListener('scroll', onScroll, true)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('resize', onResize)
            document.removeEventListener('scroll', onScroll, true)
        }
    }, [open])

    return (
        <MenuContext.Provider value={{ open, setOpen, close, triggerRef, contentRef }}>
            <span className={twMerge('relative inline-block', className)}>{children}</span>
        </MenuContext.Provider>
    )
}

export function DropdownMenuTrigger({ children }: { children: ReactElement }) {
    const { open, setOpen, triggerRef } = useMenuContext()
    if (!isValidElement<{ onClick?: (event: MouseEvent) => void; [key: string]: unknown }>(children)) return children

    // The trigger is cloned to preserve the caller's native button/link semantics.
    // eslint-disable-next-line react-hooks/refs
    return cloneElement(children, {
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        onClick: (event: MouseEvent) => {
            triggerRef.current = event.currentTarget as HTMLElement
            children.props.onClick?.(event)
            if (!event.defaultPrevented) setOpen(!open)
        },
    })
}

export function DropdownMenuContent({
    className,
    children,
    'aria-label': ariaLabel,
}: {
    className?: string
    children: ReactNode
    'aria-label'?: string
}) {
    const { open, close, contentRef } = useMenuContext()

    useEffect(() => {
        if (open) {
            const firstItem = contentRef.current?.querySelector<HTMLButtonElement>('[role^="menuitem"]:not(:disabled)')
            firstItem?.focus()
        }
    }, [open, contentRef])

    if (!open) return null

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const items = Array.from(
            contentRef.current?.querySelectorAll<HTMLButtonElement>('[role^="menuitem"]:not(:disabled)') ?? [],
        )
        const current = document.activeElement as HTMLButtonElement
        const index = items.indexOf(current)
        const focus = (item: HTMLButtonElement | undefined) => item?.focus()

        if (event.key === 'ArrowDown') {
            event.preventDefault()
            focus(items[(index + 1 + items.length) % items.length])
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            focus(items[(index - 1 + items.length) % items.length])
        } else if (event.key === 'Home') {
            event.preventDefault()
            focus(items[0])
        } else if (event.key === 'End') {
            event.preventDefault()
            focus(items.at(-1))
        } else if (event.key === 'Escape') {
            event.preventDefault()
            close()
        } else if (event.key === 'Tab') {
            close(false)
        }
    }

    return (
        <div
            ref={contentRef}
            role="menu"
            aria-label={ariaLabel}
            tabIndex={-1}
            className={twMerge(
                [
                    'absolute top-full right-0 z-40 mt-1 min-w-[220px] max-w-[calc(100vw-16px)] p-1.5',
                    'rounded-[12px] border border-line bg-surface shadow-[var(--shadow-popover)]',
                    'motion-safe:animate-[ui-pop_0.16s_ease-out_both] motion-reduce:animate-none',
                ].join(' '),
                className,
            )}
            onKeyDown={onKeyDown}
        >
            {children}
        </div>
    )
}

export function DropdownMenuItem({
    className,
    children,
    variant = 'default',
    checked,
    disabled = false,
    onSelect,
}: {
    className?: string
    children: ReactNode
    variant?: 'default' | 'danger'
    checked?: boolean
    disabled?: boolean
    onSelect?: () => void
}) {
    const { close } = useMenuContext()

    return (
        <button
            type="button"
            role={checked === undefined ? 'menuitem' : 'menuitemradio'}
            aria-checked={checked}
            aria-disabled={disabled}
            disabled={disabled}
            tabIndex={-1}
            className={twMerge(
                [
                    'flex min-h-control-sm w-full items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-1.5',
                    'text-left text-sm leading-5 font-medium text-text-2',
                    'hover:bg-surface-raised focus-visible:bg-surface-raised focus-visible:outline-none',
                    'disabled:cursor-not-allowed disabled:text-text-subtle disabled:hover:bg-transparent',
                    variant === 'danger' ? 'text-danger-text' : '',
                    checked ? 'bg-surface-raised' : '',
                ].join(' '),
                className,
            )}
            onClick={() => {
                if (disabled) return
                onSelect?.()
                close()
            }}
        >
            {children}
        </button>
    )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
    return <div role="separator" className={twMerge('my-1.5 mx-1 h-px bg-line', className)} />
}
