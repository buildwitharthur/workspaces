import { Badge } from '@/components/ui/badge'
import type { InviteListItem } from '@/app/workspaces/[workspaceSlug]/(management)/invites/components/get-invites'

const roleVariants = {
    OWNER: 'success',
    ADMIN: 'info',
    MEMBER: 'neutral',
} as const

const statusVariants = {
    PENDING: 'warning',
    ACCEPTED: 'success',
    DECLINED: 'neutral',
    REVOKED: 'danger',
    EXPIRED: 'neutral',
} as const

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function InvitesData({ invites }: { invites: InviteListItem[] }) {
    return (
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse">
                <thead>
                    <tr className="border-b border-line">
                        <th
                            scope="col"
                            className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted"
                        >
                            E-mail
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted"
                        >
                            Role
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted"
                        >
                            Criado em
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted"
                        >
                            Expira em
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invites.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-4 py-7 text-center text-sm text-text-muted"
                            >
                                Nenhum convite neste workspace.
                            </td>
                        </tr>
                    ) : (
                        invites.map((invite) => (
                            <tr
                                key={invite.id}
                                className="border-b border-line last:border-b-0 hover:bg-surface-raised"
                            >
                                <td className="px-4 py-3 text-sm leading-5 font-medium text-text">
                                    {invite.email}
                                </td>
                                <td className="px-4 py-3">
                                    <Badge
                                        variant={roleVariants[invite.role]}
                                        size="sm"
                                        mono
                                    >
                                        {invite.role}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">
                                    <Badge
                                        variant={statusVariants[invite.status]}
                                        size="sm"
                                        mono
                                    >
                                        {invite.status}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm leading-5 text-text-muted">
                                    {formatDate(invite.createdAt)}
                                </td>
                                <td className="px-4 py-3 text-sm leading-5 text-text-muted">
                                    {formatDate(invite.expiresAt)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
