import { z } from 'zod'
import { WorkspaceRole } from '@/generated/prisma/enums'

export const inviteMemberSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: 'Informe um e-mail válido.' }),
    role: z.enum([WorkspaceRole.MEMBER, WorkspaceRole.ADMIN]),
})

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>
