import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import type { ActionResult } from '@/types/action-result'
import { Session, User } from 'next-auth'

export async function getCurrentUser() {
    const session = await auth()

    return session?.user ?? null
}

export async function requireAuthenticatedUser() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return user
}

export async function authorizeAuthenticatedUser(): Promise<
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
