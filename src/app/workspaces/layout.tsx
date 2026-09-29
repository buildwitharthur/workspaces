import type { PropsWithChildren, ReactNode } from 'react'
import { requireAuthenticatedUser } from '@/lib/authentication'

export default async function WorkspacesLayout({
    children,
}: PropsWithChildren) {
    await requireAuthenticatedUser()

    return children
}
