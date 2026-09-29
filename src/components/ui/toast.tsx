'use client'

import { useSyncExternalStore } from 'react'
import { twMerge } from 'tailwind-merge'

type ToastAction = {
    label: string
    onClick: () => void
}

type ToastState = {
    id: number
    message: string
    action?: ToastAction
} | null

let currentToast: ToastState = null
let nextId = 0
let timer: ReturnType<typeof setTimeout> | undefined
const listeners = new Set<() => void>()

function emit() {
    listeners.forEach((listener) => listener())
}

export function toast(message: string, options?: { action?: ToastAction }) {
    currentToast = { id: ++nextId, message, action: options?.action }
    emit()
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        currentToast = null
        emit()
    }, options?.action ? 5000 : 2600)
}

function dismissToast() {
    if (timer) clearTimeout(timer)
    currentToast = null
    emit()
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function getSnapshot() {
    return currentToast
}

function getServerSnapshot() {
    return null
}

export function Toast({ className }: { className?: string }) {
    const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    if (!value) return null

    return (
        <div
            key={value.id}
            role="status"
            aria-live="polite"
            className={twMerge(
                [
                    'fixed bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 z-[60]',
                    'flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-3',
                    'rounded-pill bg-toast-bg px-4 py-2.5 text-[13px] leading-5 font-medium text-toast-text',
                    'motion-safe:animate-[ui-toast-in_0.2s_ease-out_both] motion-reduce:animate-none',
                ].join(' '),
                className,
            )}
        >
            <span className="min-w-0 truncate">{value.message}</span>
            {value.action ? (
                <button
                    type="button"
                    className="shrink-0 rounded-sm bg-transparent px-1 py-0.5 font-semibold text-brand-300 focus-visible:outline-2 focus-visible:outline-toast-text focus-visible:outline-offset-2"
                    onClick={() => {
                        const action = value.action
                        dismissToast()
                        action?.onClick()
                    }}
                >
                    {value.action.label}
                </button>
            ) : null}
        </div>
    )
}
