import { Header } from '@/app/workspaces/components/header'
import { PageHeader } from '@/app/workspaces/components/page-header'
import { requireAuthenticatedUser } from '@/lib/authentication'

export default async function Page() {
    const user = await requireAuthenticatedUser()

    return (
        <div className="min-h-dvh">
            <Header user={user} />
            <main className="mx-auto w-full max-w-[720px] px-4 pt-7 sm:px-6 sm:pt-10">
                <PageHeader />
            </main>
        </div>
    )
}
