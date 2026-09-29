import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type FieldProps = {
    label: ReactNode
    htmlFor?: string
    description?: ReactNode
    error?: ReactNode
    children: ReactNode
    className?: string
}

export function Field({
    label,
    htmlFor,
    description,
    error,
    children,
    className,
}: FieldProps) {
    const message = error ?? description

    return (
        <div className={twMerge('flex flex-col gap-2', className)}>
            <label htmlFor={htmlFor} className="text-sm leading-5 font-medium text-text">
                {label}
            </label>
            {children}
            {message ? (
                <p className={error ? 'text-[13px] leading-5 text-danger-text' : 'text-[13px] leading-5 text-text-muted'}>
                    {message}
                </p>
            ) : null}
        </div>
    )
}
