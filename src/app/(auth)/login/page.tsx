import Image from 'next/image'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { signInWithEmail, signInWithGoogle } from './actions'

type LoginPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

const errorMessages = {
    email: 'Não foi possível enviar o link de acesso. Tente novamente.',
    oauth: 'Não foi possível entrar com Google. Tente novamente.',
    generic: 'Não foi possível concluir o login. Tente novamente.',
} as const

export default async function Page({ searchParams }: LoginPageProps) {
   

    const params = await searchParams
    const error = typeof params.error === 'string' ? params.error : undefined
    const errorMessage =
        errorMessages[error as keyof typeof errorMessages] ??
        (error ? errorMessages.generic : undefined)

    return (
        <main className="flex min-h-dvh flex-col">
            <section className="flex flex-1 items-center justify-center px-6 py-8">
                <div className="w-full max-w-[360px]">
                    <Image
                        src="/assets/lab-logo.svg"
                        alt=""
                        width={32}
                        height={35}
                        priority
                        className="mb-5 h-[35px] w-8"
                    />

                    <h1 className="text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                        Entrar no Workspace
                    </h1>
                    <p className="mt-1.5 text-text-muted">
                        Entre para acessar seus workspaces.
                    </p>

                    {errorMessage ? (
                        <p
                            role="alert"
                            className="mt-4 text-[13px] leading-5 text-danger-text"
                        >
                            {errorMessage}
                        </p>
                    ) : null}

                    <form
                        action={signInWithEmail}
                        className="mt-7 flex flex-col gap-3"
                    >
                        <Field label="E-mail" htmlFor="email">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                inputMode="email"
                                placeholder="voce@email.com"
                                autoComplete="email"
                                spellCheck={false}
                                required
                            />
                        </Field>
                        <Button type="submit" size="lg" className="w-full">
                            Continuar com e-mail
                        </Button>
                    </form>

                    <div
                        role="presentation"
                        className="my-5 flex items-center gap-3 text-xs text-text-subtle"
                    >
                        <span className="h-px flex-1 bg-line" />
                        <span>ou</span>
                        <span className="h-px flex-1 bg-line" />
                    </div>

                    <form action={signInWithGoogle}>
                        <Button
                            type="submit"
                            variant="secondary"
                            size="lg"
                            className="w-full"
                        >
                            Continuar com Google
                        </Button>
                    </form>
                </div>
            </section>

            <footer className="flex justify-center px-4 pt-12 pb-7">
                <a
                    href="https://arthurlabs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] leading-5 text-text-subtle opacity-75 transition-[opacity,color] duration-150 hover:text-text-muted hover:opacity-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4"
                >
                    <Image
                        src="/assets/lab-logo.svg"
                        alt=""
                        width={16}
                        height={18}
                        className="h-[18px] w-4"
                    />
                    <span>
                        um experimento{' '}
                        <strong className="font-semibold text-text-muted">
                            ArthurLabs
                        </strong>
                    </span>
                </a>
            </footer>
        </main>
    )
}
