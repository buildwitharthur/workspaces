'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { WorkspaceRole } from '@/generated/prisma/enums'

type WorkspaceState = {
    workspaceSlug: string | null
    role: WorkspaceRole | null

    setWorkspace: (workspace: {
        workspaceSlug: string
        role: WorkspaceRole
    }) => void

    clearWorkspace: () => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    workspaceSlug: null,
    role: null,
    setWorkspace: ({ workspaceSlug, role }) => set({ workspaceSlug, role }),
    clearWorkspace: () => set({ workspaceSlug: null, role: null }),
}))

type WorkspaceStoreSyncProps = {
    workspaceSlug: string
    role: WorkspaceRole
}

export function WorkspaceStoreSync({
    workspaceSlug,
    role,
}: WorkspaceStoreSyncProps) {
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace)

    useEffect(() => {
        setWorkspace({
            workspaceSlug,
            role,
        })
    }, [workspaceSlug, role, setWorkspace])

    return null
}
