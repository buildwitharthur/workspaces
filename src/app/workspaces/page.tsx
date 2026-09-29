import { Header } from '@/app/workspaces/components/header'
import { requireAuthenticatedUser } from '@/lib/authentication'

export default async function Page() {
    const user = await requireAuthenticatedUser()

    return (
        <div className="min-h-dvh">
            <Header user={user} />
            <main />
        </div>
    )
}
