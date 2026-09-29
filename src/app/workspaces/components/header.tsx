import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'

type HeaderProps = {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

function getInitials(name?: string | null) {
    const parts = name?.trim().split(/\s+/).filter(Boolean) ?? []

    return parts.length > 0
        ? parts
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase()
        : '?'
}

export function Header({ user }: HeaderProps) {
    const initials = getInitials(user.name)

    return (
        <header className="flex h-16 items-center justify-between gap-4 px-4 sm:px-8">
            <Link
                href="/workspaces"
                className="flex items-center gap-2.5 text-text focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4"
            >
                <Image src="/assets/lab-logo.svg" alt="" width={22} height={24} />
                <span className="text-base leading-6 font-semibold tracking-[-0.01em]">Workspace</span>
            </Link>

            <div className="flex min-w-0 items-center gap-2.5">
                <div className="hidden min-w-0 text-right sm:flex sm:flex-col">
                    <span className="truncate text-sm leading-5 font-medium text-text">
                        {user.name ?? ''}
                    </span>
                    <span className="max-w-56 truncate text-[13px] leading-[18px] text-text-muted">
                        {user.email ?? ''}
                    </span>
                </div>
                <Avatar size="md" aria-label={user.name ?? user.email ?? 'Usuário'}>
                    {initials}
                </Avatar>
            </div>
        </header>
    )
}
