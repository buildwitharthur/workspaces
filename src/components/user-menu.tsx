'use client'

import { ChevronDown, LayoutGrid, LogOut } from 'lucide-react'
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

export type AvatarDropdownVariant = 'default' | 'extended'

export type UserMenuUser = {
    name: string | null
    email: string | null
    image: string | null
}

function getDisplayName(user: UserMenuUser) {
    return user.name?.trim() || user.email?.split('@')[0] || 'Usuário'
}

export function UserMenu({
    user,
    variant = 'default',
}: {
    user: UserMenuUser
    variant?: AvatarDropdownVariant
}) {
    const displayName = getDisplayName(user)
    const displayEmail = user.email ?? ''
    const initial = displayName.charAt(0).toUpperCase()
    const isExtended = variant === 'extended'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
                        alt={displayName}
                        className="shrink-0"
                    >
                        {initial}
                    </Avatar>
                    {isExtended ? (
                        <div className="min-w-0 flex-1 overflow-hidden text-left">
                            <p className="truncate text-sm leading-5 font-semibold text-text">
                                {displayName}
                            </p>
                            {displayEmail ? (
                                <p className="truncate text-xs leading-[18px] text-text-muted">
                                    {displayEmail}
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
                align="end"
                aria-label="Menu da conta"
                className="w-[260px]"
            >
                {!isExtended ? (
                    <>
                        <div className="flex min-w-0 items-center gap-2.5 px-2.5 py-2">
                            <Avatar
                                size="md"
                                src={user.image}
                                alt={displayName}
                            >
                                {initial}
                            </Avatar>
                            <div className="min-w-0">
                                <p className="truncate text-sm leading-5 font-semibold text-text">
                                    {displayName}
                                </p>
                                {displayEmail ? (
                                    <p className="truncate text-xs leading-[18px] text-text-muted">
                                        {displayEmail}
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
