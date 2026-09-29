'use client'

import { MoreHorizontal, Trash2, UserCog } from 'lucide-react'
import { WorkspaceRole } from '@/generated/prisma/enums'
import { useWorkspaceStore } from '@/store/workspace'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type MemberActionsDropdownProps = {
    member: {
        id: string
        name: string | null
        role: WorkspaceRole
        isCurrentUser: boolean
    }
}

export function MemberActionsDropdown({
    member,
}: MemberActionsDropdownProps) {
    const currentUserRole = useWorkspaceStore((state) => state.role)

    const canChangeRole =
        currentUserRole === WorkspaceRole.OWNER &&
        !member.isCurrentUser &&
        member.role !== WorkspaceRole.OWNER

    const canRemove =
        !member.isCurrentUser &&
        member.role !== WorkspaceRole.OWNER &&
        (currentUserRole === WorkspaceRole.OWNER ||
            (currentUserRole === WorkspaceRole.ADMIN &&
                member.role === WorkspaceRole.MEMBER))

    if (!canChangeRole && !canRemove) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button
                    type="button"
                    aria-label={`Ações de ${member.name ?? 'membro'}`}
                    className="grid size-8 place-items-center rounded-md text-text-muted transition-colors hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
                >
                    <MoreHorizontal aria-hidden="true" className="size-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent aria-label={`Ações de ${member.name ?? 'membro'}`} className="w-48">
                {canChangeRole ? (
                    <DropdownMenuItem>
                        <UserCog aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
                        <span>Alterar role</span>
                    </DropdownMenuItem>
                ) : null}

                {canChangeRole && canRemove ? <DropdownMenuSeparator /> : null}

                {canRemove ? (
                    <DropdownMenuItem variant="danger">
                        <Trash2 aria-hidden="true" className="size-4 shrink-0" />
                        <span>Remover membro</span>
                    </DropdownMenuItem>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
