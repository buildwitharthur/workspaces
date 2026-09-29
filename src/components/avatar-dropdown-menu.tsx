'use client'

import { LayoutGrid, LogOut } from 'lucide-react'
import Link from 'next/link'
import { signOutAction } from '@/components/sign-out'
import { Avatar } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type AvatarDropdownMenuProps = {
    user: {
        name: string | null
        email: string | null
        image: string | null
    }
}

function getInitials(name: string | null) {
    const parts = name?.trim().split(/\s+/).filter(Boolean) ?? []

    if (parts.length === 0) {
        return '?'
    }

    return parts
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
}

export function AvatarDropdownMenu({ user }: AvatarDropdownMenuProps) {
    const accessibleName = user.name ?? user.email ?? 'Usuário'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button
                    type="button"
                    aria-label="Abrir menu da conta"
                    className="rounded-pill focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
                >
                    <Avatar size="md" src={user.image} alt={accessibleName}>
                        {getInitials(user.name)}
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent aria-label="Menu da conta" className="w-[260px]">
                <div className="flex min-w-0 items-center gap-2.5 px-2.5 py-2">
                    <Avatar size="md" src={user.image} alt={accessibleName}>
                        {getInitials(user.name)}
                    </Avatar>
                    <div className="min-w-0">
                        <p className="truncate text-sm leading-5 font-semibold text-text">
                            {user.name ?? 'Usuário'}
                        </p>
                        {user.email ? (
                            <p className="truncate text-xs leading-[18px] text-text-muted">
                                {user.email}
                            </p>
                        ) : null}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/workspaces">
                        <LayoutGrid aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
                        <span>Todos os workspaces</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <form action={signOutAction}>
                    <DropdownMenuItem asChild variant="danger">
                        <button type="submit">
                            <LogOut aria-hidden="true" className="size-4 shrink-0" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
