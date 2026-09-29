import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { WorkspaceRole } from '@/generated/prisma/enums'
import type { MemberListItem } from './get-members'

const roleVariants = {
    [WorkspaceRole.OWNER]: 'success',
    [WorkspaceRole.ADMIN]: 'info',
    [WorkspaceRole.MEMBER]: 'neutral',
} as const

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

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function MembersData({ members }: { members: MemberListItem[] }) {
    return (
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[680px] border-collapse">
                <thead>
                    <tr className="border-b border-line">
                        <th scope="col" className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted">
                            Nome
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted">
                            E-mail
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted">
                            Role
                        </th>
                        <th scope="col" className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted">
                            Entrou em
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {members.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-7 text-center text-sm text-text-muted">
                                Nenhum membro encontrado.
                            </td>
                        </tr>
                    ) : (
                        members.map((member) => (
                            <tr key={member.id} className="border-b border-line last:border-b-0 hover:bg-surface-raised">
                                <td className="px-4 py-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <Avatar aria-hidden="true" size="md">
                                            {getInitials(member.name)}
                                        </Avatar>
                                        <div className="min-w-0">
                                            <div className="flex min-w-0 items-center gap-2">
                                                <span className="truncate text-sm leading-5 font-medium text-text">
                                                    {member.name || 'Usuário'}
                                                </span>
                                                {member.isCurrentUser ? (
                                                    <span className="shrink-0 rounded-pill bg-surface-raised px-2 py-0.5 text-[11px] leading-4 text-text-muted">
                                                        você
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm leading-5 text-text-muted">
                                    {member.email || '—'}
                                </td>
                                <td className="px-4 py-3">
                                    <Badge variant={roleVariants[member.role]} size="sm" mono>
                                        {member.role}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm leading-5 text-text-muted">
                                    {formatDate(member.joinedAt)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
