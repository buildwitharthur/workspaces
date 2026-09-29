'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { acceptInvite } from '@/app/workspaces/components/accept-invite'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export function AcceptInviteButton({ inviteId }: { inviteId: string }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleAccept = async () => {
        if (isSubmitting) {
            return
        }

        setIsSubmitting(true)
        setError(null)

        const result = await acceptInvite(inviteId)

        if (!result.success) {
            setError(result.message)
            setIsSubmitting(false)
            return
        }

        router.refresh()
        router.push(`/workspaces/${result.data.workspaceSlug}`)
    }

    return (
        <span className="flex flex-col items-end gap-1">
            <Button
                variant="primary"
                size="sm"
                onClick={handleAccept}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Spinner />
                        Aceitando...
                    </>
                ) : (
                    'Aceitar'
                )}
            </Button>
            {error ? (
                <span
                    role="alert"
                    className="max-w-48 text-right text-[11px] leading-4 text-danger-text"
                >
                    {error}
                </span>
            ) : null}
        </span>
    )
}
