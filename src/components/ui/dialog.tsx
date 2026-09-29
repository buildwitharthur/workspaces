'use client'

import {
    cloneElement,
    createContext,
    isValidElement,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from 'react'
import { twMerge } from 'tailwind-merge'

type DialogContextValue = {
    open: boolean
    setOpen: (open: boolean) => void
    close: () => void
    dialogRef: React.RefObject<HTMLDialogElement | null>
    titleId: string
    descriptionId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
    const context = useContext(DialogContext)
    if (!context) throw new Error('Dialog components must be used inside <Dialog>.')
    return context
}

export function Dialog({
    children,
    className,
    open: controlledOpen,
    onOpenChange,
}: {
    children: ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = (nextOpen: boolean) => {
        if (controlledOpen === undefined) setUncontrolledOpen(nextOpen)
        onOpenChange?.(nextOpen)
    }
    const dialogRef = useRef<HTMLDialogElement>(null)
    const lastActiveElement = useRef<HTMLElement | null>(null)
    const id = useId()
    const titleId = `${id}-title`
    const descriptionId = `${id}-description`

    const close = () => {
        dialogRef.current?.close()
        setOpen(false)
        window.setTimeout(() => lastActiveElement.current?.focus(), 0)
    }

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (open && !dialog.open) {
            lastActiveElement.current = document.activeElement as HTMLElement | null
            dialog.showModal()
            const autofocus = dialog.querySelector<HTMLElement>('[data-autofocus]')
            ;(autofocus ?? dialog.querySelector<HTMLElement>('input, select, button'))?.focus()
        } else if (!open && dialog.open) {
            dialog.close()
        }
    }, [open])

    return (
        <DialogContext.Provider value={{ open, setOpen, close, dialogRef, titleId, descriptionId }}>
            <div className={className}>{children}</div>
        </DialogContext.Provider>
    )
}

export function DialogTrigger({ children }: { children: ReactElement }) {
    const { setOpen } = useDialogContext()

    if (!isValidElement<{ onClick?: (event: MouseEvent) => void }>(children)) return children

    return cloneElement(children, {
        onClick: (event: MouseEvent) => {
            children.props.onClick?.(event)
            if (!event.defaultPrevented) setOpen(true)
        },
    })
}

export function DialogContent({ className, children }: { className?: string; children: ReactNode }) {
    const { dialogRef, close, titleId, descriptionId } = useDialogContext()

    return (
        <dialog
            ref={dialogRef}
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={twMerge(
                [
                    'm-auto max-h-[calc(100dvh-48px)] w-[calc(100%-32px)] max-w-[440px] overflow-auto',
                    'rounded-lg border border-line bg-surface p-6 text-text shadow-[var(--shadow-modal)]',
                    'motion-safe:animate-[ui-rise_0.16s_ease-out_both] motion-reduce:animate-none backdrop:bg-scrim',
                    'max-[720px]:max-h-[calc(100dvh-32px)]',
                ].join(' '),
                className,
            )}
            onCancel={(event) => {
                event.preventDefault()
                close()
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) close()
            }}
        >
            {children}
        </dialog>
    )
}

export function DialogClose({ children }: { children: ReactElement }) {
    const { close } = useDialogContext()
    if (!isValidElement<{ onClick?: (event: MouseEvent) => void }>(children)) return children

    return cloneElement(children, {
        onClick: (event: MouseEvent) => {
            children.props.onClick?.(event)
            if (!event.defaultPrevented) close()
        },
    })
}

export function DialogHeader({ className, children }: { className?: string; children: ReactNode }) {
    return <header className={twMerge('flex flex-col', className)}>{children}</header>
}

export function DialogTitle({ className, children }: { className?: string; children: ReactNode }) {
    const { titleId } = useDialogContext()
    return <h2 id={titleId} className={twMerge('text-lg leading-[26px] font-semibold tracking-[-0.01em]', className)}>{children}</h2>
}

export function DialogDescription({ className, children }: { className?: string; children: ReactNode }) {
    const { descriptionId } = useDialogContext()
    return <p id={descriptionId} className={twMerge('mt-1 text-text-muted', className)}>{children}</p>
}

export function DialogBody({ className, children }: { className?: string; children: ReactNode }) {
    return <div className={twMerge('mt-5 flex flex-col gap-4', className)}>{children}</div>
}

export function DialogFooter({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <footer
            className={twMerge(
                'mt-6 flex justify-end gap-2 max-[720px]:flex-col-reverse [&>*]:max-[720px]:w-full',
                className,
            )}
        >
            {children}
        </footer>
    )
}
