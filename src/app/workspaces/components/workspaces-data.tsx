import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { WorkspaceRole } from '@/generated/prisma/client'
import { Badge } from '@/components/ui/badge'
import type { WorkspaceListItem } from '@/app/workspaces/components/get-workspaces'

const roleVariants: Record<WorkspaceRole, 'success' | 'info' | 'neutral'> = {
    OWNER: 'success',
    ADMIN: 'info',
    MEMBER: 'neutral',
}

function getWorkspaceInitial(name: string) {
    return name.trim().charAt(0).toUpperCase() || '?'
}

export function WorkspacesData({ workspaces }: { workspaces: WorkspaceListItem[] }) {
    if (workspaces.length === 0) {
        return (
            <div className="mt-6 rounded-lg border border-line bg-surface px-4 py-7 text-center">
                <p className="text-sm text-text-muted">Você ainda não participa de nenhum workspace.</p>
                <p className="mt-1 text-[13px] leading-5 text-text-subtle">Crie um workspace para começar.</p>
            </div>
        )
    }

    return (
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
            {workspaces.map((workspace, index) => (
                <Link
                    key={workspace.id}
                    href={`/workspaces/${workspace.slug}`}
                    aria-label={`Abrir workspace ${workspace.name}`}
                    className={`flex min-w-0 items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-raised focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-[-2px] ${index > 0 ? 'border-t border-line' : ''}`}
                >
                    <span className="grid size-7 shrink-0 place-items-center rounded-sm bg-text text-xs font-semibold text-bg">
                        {getWorkspaceInitial(workspace.name)}
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm leading-5 font-medium text-text">
                            {workspace.name}
                        </span>
                        <span className="text-[13px] leading-[18px] text-text-muted">
                            {workspace.memberCount === 1
                                ? '1 membro'
                                : `${workspace.memberCount} membros`}
                        </span>
                    </span>

                    <Badge variant={roleVariants[workspace.role]} size="sm" mono>
                        {workspace.role}
                    </Badge>
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-text-muted" />
                </Link>
            ))}
        </div>
    )
}
