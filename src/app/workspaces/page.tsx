import { requireAuthenticatedUser } from '@/lib/authentication'

export default async function Page() {
    await requireAuthenticatedUser()

    return <main>Workspaces</main>
}
