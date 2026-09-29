'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { revokeInvite } from './revoke-invite'

export function RevokeInviteButton({
    workspaceSlug,
    inviteId,
}: {
    workspaceSlug: string
    inviteId: string
}) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRevoke = async () => {
        if (isSubmitting) {
            return
        }

        setIsSubmitting(true)
        setError(null)

        const result = await revokeInvite(workspaceSlug, inviteId)

        if (!result.success) {
            setError(result.message)
            setIsSubmitting(false)
            return
        }

        router.refresh()
    }

    return (
        <span className="flex flex-col items-start gap-1">
            <Button
                variant="text"
                size="sm"
                onClick={handleRevoke}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Spinner />
                        Revogando...
                    </>
                ) : (
                    'Revogar'
                )}
            </Button>
            {error ? (
                <span
                    role="alert"
                    className="max-w-48 text-[11px] leading-4 text-danger-text"
                >
                    {error}
                </span>
            ) : null}
        </span>
    )
}
