import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import type { ActionResult } from '@/types/action-result'
import { User } from 'next-auth'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
    const session = await auth()

    return session?.user ?? null
})

export async function requireAuthPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return user
}

export async function requireAuthAction(): Promise<
    ActionResult<{ id: string } & User>
> {
    const user = await getCurrentUser()

    if (!user) {
        return {
            success: false,
            data: null,
            message: 'Usuário não autenticado.',
        }
    }

    return {
        success: true,
        data: user,
    }
}
