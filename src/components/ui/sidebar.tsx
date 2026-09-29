'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Slot } from '@radix-ui/react-slot'
import { Menu, X } from 'lucide-react'
import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ComponentProps,
    type CSSProperties,
    type ReactNode,
} from 'react'
import { twMerge } from 'tailwind-merge'

const SIDEBAR_WIDTH = '260px'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

type SidebarContextValue = {
    state: 'expanded' | 'collapsed'
    open: boolean
    setOpen: (open: boolean) => void
    isMobile: boolean
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)')
        const handleChange = () => setIsMobile(mediaQuery.matches)

        handleChange()
        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return isMobile
}

export function useSidebar() {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.')
    }

    return context
}

export function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
}: ComponentProps<'div'> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children: ReactNode
}) {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = useState(false)
    const [_open, _setOpen] = useState(defaultOpen)
    const open = openProp ?? _open

    const setOpen = useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const nextOpen =
                typeof value === 'function' ? value(open) : value

            if (setOpenProp) {
                setOpenProp(nextOpen)
            } else {
                _setOpen(nextOpen)
            }

            document.cookie = `${SIDEBAR_COOKIE_NAME}=${nextOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        },
        [open, setOpenProp],
    )

    const toggleSidebar = useCallback(() => {
        return isMobile
            ? setOpenMobile((currentOpen) => !currentOpen)
            : setOpen((currentOpen) => !currentOpen)
    }, [isMobile, setOpen])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                toggleSidebar()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    const contextValue = {
        state: open ? 'expanded' : 'collapsed',
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
    } satisfies SidebarContextValue

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                data-sidebar="provider"
                style={
                    {
                        '--sidebar-width': SIDEBAR_WIDTH,
                        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                        ...style,
                    } as CSSProperties
                }
                className={twMerge(
                    'group/sidebar-wrapper flex min-h-svh w-full bg-bg',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
}

type SidebarProps = ComponentProps<'div'> & {
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
}

export function Sidebar({
    side = 'left',
    variant = 'sidebar',
    collapsible = 'offcanvas',
    className,
    children,
    ...props
}: SidebarProps) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === 'none') {
        return (
            <div
                data-sidebar="sidebar"
                className={twMerge(
                    'flex h-full w-[--sidebar-width] flex-col bg-bg text-text',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        )
    }

    if (isMobile) {
        return (
            <DialogPrimitive.Root
                open={openMobile}
                onOpenChange={setOpenMobile}
            >
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-scrim data-[state=open]:animate-[ui-pop_0.16s_ease-out_both]" />
                    <DialogPrimitive.Content
                        data-sidebar="sidebar"
                        data-mobile="true"
                        data-side={side}
                        className={twMerge(
                            'fixed inset-y-0 z-50 flex h-svh w-[--sidebar-width] flex-col bg-bg p-0 text-text shadow-[var(--shadow-modal)] outline-none',
                            side === 'left'
                                ? 'left-0 data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0'
                                : 'right-0 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0',
                            'transition-transform duration-200 ease-out',
                            className,
                        )}
                        {...props}
                    >
                        <DialogPrimitive.Title className="sr-only">
                            Navegação principal
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Description className="sr-only">
                            Menu de navegação do workspace
                        </DialogPrimitive.Description>
                        <DialogPrimitive.Close
                            className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-md text-text-muted transition-colors hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
                            aria-label="Fechar navegação"
                        >
                            <X aria-hidden="true" className="size-4" />
                        </DialogPrimitive.Close>
                        {children}
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        )
    }

    return (
        <div
            data-sidebar="sidebar"
            data-state={state}
            data-collapsible={state === 'collapsed' ? collapsible : ''}
            data-variant={variant}
            data-side={side}
            className="group peer hidden text-text md:block"
        >
            <div
                className={twMerge(
                    'relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
                    'group-data-[collapsible=offcanvas]:w-0',
                    'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
                    variant === 'floating' || variant === 'inset'
                        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4))]'
                        : '',
                )}
            />
            <div
                className={twMerge(
                    'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] flex-col bg-bg transition-[left,right,width] duration-200 ease-linear md:flex',
                    side === 'left'
                        ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                        : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                    variant === 'floating'
                        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4)+2px)]'
                        : 'border-line group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
                    className,
                )}
                {...props}
            >
                <div className="flex size-full flex-col bg-bg">
                    {children}
                </div>
            </div>
        </div>
    )
}

export const SidebarHeader = forwardRef<
    HTMLDivElement,
    ComponentProps<'div'>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-sidebar="header"
        className={twMerge('flex flex-col gap-2', className)}
        {...props}
    />
))
SidebarHeader.displayName = 'SidebarHeader'

export const SidebarContent = forwardRef<
    HTMLDivElement,
    ComponentProps<'div'>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-sidebar="content"
        className={twMerge(
            'flex min-h-0 flex-1 flex-col gap-2 overflow-auto overflow-x-hidden',
            className,
        )}
        {...props}
    />
))
SidebarContent.displayName = 'SidebarContent'

export const SidebarFooter = forwardRef<
    HTMLDivElement,
    ComponentProps<'div'>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-sidebar="footer"
        className={twMerge('flex flex-col gap-2', className)}
        {...props}
    />
))
SidebarFooter.displayName = 'SidebarFooter'

export const SidebarMenu = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
        <ul
            ref={ref}
            data-sidebar="menu"
            className={twMerge('flex w-full min-w-0 flex-col gap-1', className)}
            {...props}
        />
    ),
)
SidebarMenu.displayName = 'SidebarMenu'

export const SidebarMenuItem = forwardRef<
    HTMLLIElement,
    ComponentProps<'li'>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        data-sidebar="menu-item"
        className={twMerge('group/menu-item relative', className)}
        {...props}
    />
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

export const SidebarMenuButton = forwardRef<
    HTMLButtonElement,
    ComponentProps<'button'> & {
        asChild?: boolean
        isActive?: boolean
    }
>(({ className, asChild = false, isActive = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            ref={ref}
            data-sidebar="menu-button"
            data-active={isActive}
            className={twMerge(
                'flex h-control-md w-full min-w-0 items-center gap-3 overflow-hidden rounded-md px-2.5 text-sm leading-5 text-text-muted outline-none transition-colors hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2',
                'data-[active=true]:border data-[active=true]:border-line data-[active=true]:bg-surface data-[active=true]:text-text',
                className,
            )}
            {...props}
        />
    )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

export const SidebarTrigger = forwardRef<
    HTMLButtonElement,
    ComponentProps<'button'>
>(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
        <button
            ref={ref}
            type="button"
            data-sidebar="trigger"
            aria-label="Abrir navegação"
            className={twMerge(
                'grid size-8 place-items-center rounded-md text-text-muted transition-colors hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2',
                className,
            )}
            onClick={(event) => {
                onClick?.(event)
                toggleSidebar()
            }}
            {...props}
        >
            <Menu aria-hidden="true" className="size-4" />
            <span className="sr-only">Abrir navegação</span>
        </button>
    )
})
SidebarTrigger.displayName = 'SidebarTrigger'

export const SidebarInset = forwardRef<HTMLElement, ComponentProps<'main'>>(
    ({ className, ...props }, ref) => (
        <main
            ref={ref}
            data-sidebar="inset"
            className={twMerge(
                'relative flex min-h-svh min-w-0 flex-1 flex-col bg-bg',
                className,
            )}
            {...props}
        />
    ),
)
SidebarInset.displayName = 'SidebarInset'
