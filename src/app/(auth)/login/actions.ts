'use server'

import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function signInWithEmail(formData: FormData) {
    const value = formData.get('email')
    const email = typeof value === 'string' ? value.trim().toLowerCase() : ''

    if (!email || !emailPattern.test(email)) {
        redirect('/login?error=email')
    }

    try {
        await signIn('resend', {
            email,
            redirectTo: '/workspaces',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            redirect('/login?error=email')
        }

        throw error
    }
}

export async function signInWithGoogle() {
    try {
        await signIn('google', {
            redirectTo: '/workspaces',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            redirect('/login?error=oauth')
        }

        throw error
    }
}
