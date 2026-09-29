import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WorkspaceRole } from '@/generated/prisma/enums'
import type { PendingInviteItem } from '@/app/workspaces/components/get-pending-invites'

const roleVariants: Record<WorkspaceRole, 'success' | 'info' | 'neutral'> = {
    [WorkspaceRole.OWNER]: 'success',
    [WorkspaceRole.ADMIN]: 'info',
    [WorkspaceRole.MEMBER]: 'neutral',
}

function getWorkspaceInitial(name: string) {
    return name.trim().charAt(0).toUpperCase() || '?'
}

export function PendingInvitesData({
    invites,
}: {
    invites: PendingInviteItem[]
}) {
    return (
        <section className="mt-8" aria-labelledby="pending-invites-title">
            <div>
                <h2 id="pending-invites-title" className="text-[15px] leading-5 font-semibold text-text">
                    Convites pendentes
                </h2>
                <p className="mt-1 text-sm leading-5 text-text-muted">
                    Workspaces que convidaram você para participar.
                </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
                {invites.map((invite, index) => (
                    <div
                        key={invite.id}
                        className={`flex min-w-0 flex-wrap items-center gap-x-3 gap-y-3 px-4 py-3.5 ${index > 0 ? 'border-t border-line' : ''}`}
                    >
                        <span className="grid size-7 shrink-0 place-items-center rounded-sm bg-text text-xs font-semibold text-bg">
                            {getWorkspaceInitial(invite.workspaceName)}
                        </span>

                        <div className="min-w-0 flex-1 basis-48">
                            <p className="truncate text-sm leading-5 font-semibold text-text">
                                {invite.workspaceName}
                            </p>
                            <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                                <p className="truncate text-[13px] leading-[18px] text-text-muted">
                                    {invite.invitedByName
                                        ? `${invite.invitedByName} convidou você`
                                        : 'Você recebeu um convite'}
                                </p>
                                <Badge variant={roleVariants[invite.role]} size="sm" mono>
                                    {invite.role}
                                </Badge>
                            </div>
                        </div>

                        <div className="ml-auto flex shrink-0 items-center gap-1">
                            <Button variant="text" size="sm">
                                Recusar
                            </Button>
                            <Button variant="primary" size="sm">
                                Aceitar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
