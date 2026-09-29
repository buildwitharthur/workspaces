import type { Metadata } from 'next'
import { Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist',
    subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Workspace',
    description: 'Experimento de autenticação e autorização em workspaces.',
    icons: {
        icon: '/assets/lab-logo.svg',
    },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="pt-BR" className={`${geistSans.variable} ${jetbrainsMono.variable}`}>
            <body>{children}</body>
        </html>
    )
}
