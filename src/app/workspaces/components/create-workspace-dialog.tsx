'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createWorkspace } from '@/app/workspaces/actions'
import {
    createWorkspaceSchema,
    type CreateWorkspaceInput,
} from '@/app/workspaces/schema'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

function slugify(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40)
        .replace(/-+$/g, '')
}

export function CreateWorkspaceDialog() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [slugTouched, setSlugTouched] = useState(false)
    
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateWorkspaceInput>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const resetForm = () => {
        reset()
        setSlugTouched(false)
    }

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)

        if (!nextOpen && !isSubmitting) {
            resetForm()
        }
    }

    const onSubmit = async (values: CreateWorkspaceInput) => {
        const result = await createWorkspace(values)

        if (!result.success) {
            if (result.message === 'Este slug já está em uso.') {
                setError('slug', { type: 'server', message: result.message })
            } else {
                setError('root.server', {
                    type: 'server',
                    message: result.message,
                })
            }
            return
        }

        resetForm()
        setOpen(false)
        router.push(`/workspaces/${result.data.slug}`)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button variant="primary">
                    <Plus aria-hidden="true" size={16} strokeWidth={2} />
                    Criar workspace
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar workspace</DialogTitle>
                    <DialogDescription>
                        Crie um novo ambiente para organizar seus membros.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogBody>
                        <Field
                            label="Nome do workspace"
                            htmlFor="workspace-name"
                            error={errors.name?.message}
                        >
                            <Input
                                id="workspace-name"
                                placeholder="ArthurLabs"
                                autoComplete="off"
                                maxLength={48}
                                required
                                data-autofocus
                                aria-invalid={!!errors.name}
                                {...register('name', {
                                    onChange: (event) => {
                                        if (!slugTouched) {
                                            setValue(
                                                'slug',
                                                slugify(event.target.value),
                                                {
                                                    shouldValidate: true,
                                                },
                                            )
                                        }
                                    },
                                })}
                            />
                        </Field>

                        <Field
                            label="Slug"
                            htmlFor="workspace-slug"
                            description={
                                errors.slug
                                    ? undefined
                                    : 'Letras minúsculas, números e hífen.'
                            }
                            error={errors.slug?.message}
                        >
                            <div className="flex overflow-hidden rounded-md border border-line bg-surface transition-[border-color,box-shadow] duration-150 focus-within:border-brand-600 focus-within:shadow-[var(--shadow-focus)]">
                                <span className="flex shrink-0 items-center border-r border-line bg-surface-raised px-3 font-mono text-xs text-text-muted">
                                    workspaces/
                                </span>
                                <Input
                                    id="workspace-slug"
                                    placeholder="arthurlabs"
                                    autoComplete="off"
                                    spellCheck={false}
                                    maxLength={40}
                                    required
                                    aria-invalid={!!errors.slug}
                                    className="rounded-none border-0 focus:border-0 focus:shadow-none"
                                    {...register('slug', {
                                        onChange: () => {
                                            setSlugTouched(true)
                                        },
                                    })}
                                />
                            </div>
                        </Field>

                        {errors.root?.server?.message ? (
                            <p
                                role="alert"
                                className="text-[13px] leading-5 text-danger-text"
                            >
                                {errors.root.server.message}
                            </p>
                        ) : null}
                    </DialogBody>

                    <DialogFooter>
                        <DialogClose>
                            <Button variant="secondary" disabled={isSubmitting}>
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner />
                                    Criando...
                                </>
                            ) : (
                                'Criar workspace'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
