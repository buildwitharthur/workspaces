'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function CreateWorkspaceDialog() {
    return (
        <Dialog>
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

                <form onSubmit={(event) => event.preventDefault()}>
                    <DialogBody>
                        <Field label="Nome do workspace" htmlFor="workspace-name">
                            <Input
                                id="workspace-name"
                                name="name"
                                placeholder="ArthurLabs"
                                autoComplete="off"
                                maxLength={48}
                                required
                                data-autofocus
                            />
                        </Field>

                        <Field
                            label="Slug"
                            htmlFor="workspace-slug"
                            description="Letras minúsculas, números e hífen."
                        >
                            <div className="flex overflow-hidden rounded-md border border-line bg-surface transition-[border-color,box-shadow] duration-150 focus-within:border-brand-600 focus-within:shadow-[var(--shadow-focus)]">
                                <span className="flex shrink-0 items-center border-r border-line bg-surface-raised px-3 font-mono text-xs text-text-muted">
                                    workspace.app/
                                </span>
                                <Input
                                    id="workspace-slug"
                                    name="slug"
                                    placeholder="arthurlabs"
                                    autoComplete="off"
                                    spellCheck={false}
                                    maxLength={40}
                                    required
                                    className="rounded-none border-0 focus:border-0 focus:shadow-none"
                                />
                            </div>
                        </Field>
                    </DialogBody>

                    <DialogFooter>
                        <DialogClose>
                            <Button variant="secondary">Cancelar</Button>
                        </DialogClose>
                        <Button variant="primary" type="submit">
                            Criar workspace
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
