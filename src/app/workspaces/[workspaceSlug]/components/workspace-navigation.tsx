'use client'

import { LayoutGrid, Mail, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WorkspaceRole } from '@/generated/prisma/enums'
import { useWorkspaceStore } from '@/store/workspace'

export function WorkspaceNavigation() {
    const workspaceSlug = useWorkspaceStore((state) => state.workspaceSlug)
    const role = useWorkspaceStore((state) => state.role)

    const pathname = usePathname()

    if (workspaceSlug === null || role === null) {
        return null
    }

    const canManageWorkspace =
        role === WorkspaceRole.OWNER || role === WorkspaceRole.ADMIN

    const basePath = `/workspaces/${workspaceSlug}`

    const navigationItems = [
        {
            label: 'Visão geral',
            href: basePath,
            icon: LayoutGrid,
            exact: true,
        },

        {
            label: 'Membros',
            href: `${basePath}/members`,
            icon: Users,
            adminOnly: true,
        },
        {
            label: 'Convites',
            href: `${basePath}/invites`,
            icon: Mail,
            adminOnly: true,
        },
    ]

    return (
        <nav aria-label="Navegação do workspace">
            <ul className="flex flex-col gap-1">
                {navigationItems
                    .filter((item) => !item.adminOnly || canManageWorkspace)
                    .map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname === item.href ||
                              pathname.startsWith(`${item.href}/`)
                        const Icon = item.icon

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={[
                                        'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm leading-5 transition-colors',
                                        'focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2',
                                        isActive
                                            ? 'border border-line bg-surface text-text'
                                            : 'border border-transparent text-text-muted hover:bg-surface-raised hover:text-text',
                                    ].join(' ')}
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className={[
                                            'size-4 shrink-0',
                                            isActive
                                                ? 'text-accent-text'
                                                : 'text-text-muted',
                                        ].join(' ')}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
            </ul>
        </nav>
    )
}
