import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <main className="flex min-h-dvh flex-col">
            <section className="flex flex-1 items-center justify-center px-6 py-8 text-center">
                <div className="w-full max-w-[320px]">
                    <Image
                        src="/assets/lab-logo.svg"
                        alt=""
                        width={32}
                        height={35}
                        priority
                        className="mx-auto mb-4 h-[35px] w-8"
                    />
                    <h1 className="text-2xl leading-8 font-semibold tracking-[-0.015em] text-text">
                        Confira seu e-mail
                    </h1>
                    <p className="mt-1.5 text-text-muted">
                        Enviamos um link de acesso para o seu e-mail.
                    </p>
                    <p className="mt-1.5 text-text-muted">
                        Você pode fechar esta página depois de abrir o link.
                    </p>
                    <Link
                        href="/login"
                        className="mt-6 inline-flex h-control-lg items-center justify-center rounded-pill border border-line bg-surface px-5 text-sm leading-5 font-medium text-text-2 transition-[background-color,border-color,color] duration-150 hover:border-line-strong hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
                    >
                        Voltar para entrar
                    </Link>
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
