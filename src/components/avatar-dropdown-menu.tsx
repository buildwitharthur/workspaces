'use client'

import { ChevronDown, LayoutGrid, LogOut } from 'lucide-react'
import Link from 'next/link'
import type { AvatarDropdownVariant } from '@/components/avatar-dropdown'
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
    variant?: AvatarDropdownVariant
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

export function AvatarDropdownMenu({
    user,
    variant = 'default',
}: AvatarDropdownMenuProps) {
    const accessibleName = user.name ?? user.email ?? 'Usuário'
    const isExtended = variant === 'extended'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button
                    type="button"
                    aria-label="Abrir menu da conta"
                    className={
                        isExtended
                            ? 'flex w-full min-w-0 max-w-full items-center gap-2.5 overflow-hidden rounded-pill text-left focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2'
                            : 'rounded-pill focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2'
                    }
                >
                    <Avatar
                        size="md"
                        src={user.image}
                        alt={accessibleName}
                        className="shrink-0"
                    >
                        {getInitials(user.name)}
                    </Avatar>
                    {isExtended ? (
                        <div className="min-w-0 flex-1 overflow-hidden text-left">
                            <p className="truncate text-sm leading-5 font-semibold text-text">
                                {user.name ?? 'Usuário'}
                            </p>
                            {user.email ? (
                                <p className="truncate text-xs leading-[18px] text-text-muted">
                                    {user.email}
                                </p>
                            ) : null}
                        </div>
                    ) : null}
                    {isExtended ? (
                        <ChevronDown
                            aria-hidden="true"
                            className="size-4 shrink-0 text-text-muted"
                        />
                    ) : null}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                aria-label="Menu da conta"
                className="w-[260px]"
                align="start"
                side="top"
            >
                {!isExtended ? (
                    <>
                        <div className="flex min-w-0 items-center gap-2.5 px-2.5 py-2">
                            <Avatar
                                size="md"
                                src={user.image}
                                alt={accessibleName}
                            >
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
                    </>
                ) : null}

                <DropdownMenuItem asChild>
                    <Link href="/workspaces">
                        <LayoutGrid
                            aria-hidden="true"
                            className="size-4 shrink-0 text-text-muted"
                        />
                        <span>Todos os workspaces</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild variant="danger">
                    <button type="button" onClick={() => signOutAction()}>
                        <LogOut
                            aria-hidden="true"
                            className="size-4 shrink-0"
                        />
                        <span>Sair</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
