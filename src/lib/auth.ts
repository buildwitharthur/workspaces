import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const { auth, handlers, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,

    adapter: PrismaAdapter(db),

    pages: {
        signIn: '/login',
        verifyRequest: '/login/verify-request',
        newUser: '/workspaces',
        signOut: '/login',
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Resend({
            apiKey: process.env.AUTH_RESEND_KEY,
            from: process.env.EMAIL_FROM,
        }),
    ],
})
