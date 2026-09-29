export default function Page() {
    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-10">
            <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
                    Visão geral
                </p>

                <h1 className="mt-2 text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                    Um espaço compartilhado por todos
                </h1>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                    Esta página representa uma rota comum do workspace. Qualquer
                    membro pode acessá-la, independentemente da role atribuída à
                    sua Membership.
                </p>
            </div>

            <div className="mt-8 rounded-xl border border-line bg-bg-subtle p-6">
                <p className="text-sm font-medium text-text">
                    Quem pode acessar
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-text">
                        OWNER
                    </span>

                    <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-text">
                        ADMIN
                    </span>

                    <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-text">
                        MEMBER
                    </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-text-muted">
                    A diferença entre as roles aparece nas operações e áreas
                    administrativas. O acesso a esta rota não depende de uma
                    permissão específica além de pertencer ao workspace.
                </p>
            </div>
        </main>
    )
}
