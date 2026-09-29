import type { PropsWithChildren } from 'react'
import { requireAuthPage } from '@/lib/authentication'

export default async function WorkspacesLayout({
    children,
}: PropsWithChildren) {
    await requireAuthPage()
    return children
}
