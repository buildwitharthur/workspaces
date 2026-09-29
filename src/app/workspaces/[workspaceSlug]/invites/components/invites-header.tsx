import { InviteMemberDialog } from '@/app/workspaces/[workspaceSlug]/invites/components/invite-member-dialog'
import type { WorkspaceRole } from '@/generated/prisma/enums'

export function InvitesHeader({ role }: { role: WorkspaceRole }) {
    return (
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 className="text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                    Convites
                </h1>
                <p className="mt-1 text-sm leading-5 text-text-muted">
                    Gerencie convites enviados para novos membros.
                </p>
            </div>
            <InviteMemberDialog role={role} />
        </div>
    )
}
