'use client'

import { LayoutGrid, ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { WorkspaceOption } from '@/app/workspaces/[workspaceSlug]/components/get-workspace-options'

const roleVariants = {
    OWNER: 'success',
    ADMIN: 'info',
    MEMBER: 'neutral',
} as const

function getWorkspaceInitial(name: string) {
    return name.trim().charAt(0).toUpperCase() || '?'
}

export function WorkspaceSelectData({
    currentWorkspace,
    workspaces,
}: {
    currentWorkspace: WorkspaceOption | null
    workspaces: WorkspaceOption[]
}) {
    const router = useRouter()

    if (!currentWorkspace || workspaces.length === 0) {
        return null
    }

    return (
        <DropdownMenu className="block w-full">
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-md border border-line bg-surface p-2 text-left transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2 "
                >
                    <span className="grid size-7 shrink-0 place-items-center rounded-sm bg-text text-xs font-semibold text-bg">
                        {getWorkspaceInitial(currentWorkspace.name)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-[13px] leading-5 font-semibold text-text">
                            {currentWorkspace.name}
                        </span>
                        <Badge
                            variant={roleVariants[currentWorkspace.role]}
                            size="sm"
                            mono
                        >
                            {currentWorkspace.role}
                        </Badge>
                    </span>
                    <ChevronsUpDown
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-text-muted"
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                aria-label="Selecionar workspace"
                className="left-0 right-auto w-full min-w-[188px] space-y-1"
            >
                {workspaces.map((workspace) => {
                    const isCurrent = workspace.slug === currentWorkspace.slug

                    return (
                        <DropdownMenuItem
                            key={workspace.id}
                            checked={isCurrent}
                            onSelect={() => {
                                if (!isCurrent)
                                    router.push(`/workspaces/${workspace.slug}`)
                            }}
                            className="rounded-sm p-2"
                        >
                            <span className="grid size-5.5 shrink-0 place-items-center bg-text text-xs font-semibold text-bg rounded-sm">
                                {getWorkspaceInitial(workspace.name)}
                            </span>

                            <span className="flex min-w-0 flex-1 justify-between">
                                <span className="truncate">
                                    {workspace.name}
                                </span>
                                <Badge
                                    variant={roleVariants[workspace.role]}
                                    size="sm"
                                    mono
                                >
                                    {workspace.role}
                                </Badge>
                            </span>
                        </DropdownMenuItem>
                    )
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="rounded-sm p-2">
                    <Link href="/workspaces">
                        <LayoutGrid
                            aria-hidden="true"
                            className="size-4 shrink-0 text-text-muted"
                        />
                        <span>Todos os workspaces</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
