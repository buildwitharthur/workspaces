import { redirect } from 'next/navigation'
import { WorkspaceRole } from '@/generated/prisma/client'
import { requireWorkspaceMemberPage } from '@/lib/workspace-authorization'

type ManagementLayoutProps = {
    children: React.ReactNode
    params: Promise<{
        workspaceSlug: string
    }>
}

export default async function ManagementLayout({
    children,
    params,
}: ManagementLayoutProps) {
    const { workspaceSlug } = await params

    const membership = await requireWorkspaceMemberPage(workspaceSlug)

    if (
        membership.role !== WorkspaceRole.OWNER &&
        membership.role !== WorkspaceRole.ADMIN
    ) {
        redirect(`/workspaces/${workspaceSlug}`)
    }

    return children
}
