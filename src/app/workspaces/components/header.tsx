import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvatarDropdown } from '@/components/avatar-dropdown'
import { AvatarDropdownSkeleton } from '@/components/avatar-dropdown-skeleton'

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between gap-4 px-4 sm:px-8">
            <Link
                href="/workspaces"
                className="flex items-center gap-2.5 text-text focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4"
            >
                <Image src="/assets/lab-logo.svg" alt="" width={22} height={24} />
                <span className="text-base leading-6 font-semibold tracking-[-0.01em]">Workspace</span>
            </Link>

            <Suspense fallback={<AvatarDropdownSkeleton />}>
                <AvatarDropdown />
            </Suspense>
        </header>
    )
}
