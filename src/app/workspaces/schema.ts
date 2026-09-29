import { z } from 'zod'

const slugMessage = 'Use apenas letras minúsculas, números e hífen.'

export const createWorkspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Informe um nome para o workspace.')
        .max(48, 'O nome deve ter no máximo 48 caracteres.'),
    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(2, slugMessage)
        .max(40, slugMessage)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, slugMessage),
})

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>
