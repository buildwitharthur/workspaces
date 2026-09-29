'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { WorkspaceRole } from '@/generated/prisma/enums'
import { createInvite } from '@/app/workspaces/[workspaceSlug]/invites/components/create-invite'
import { inviteMemberSchema, type InviteMemberInput } from '@/app/workspaces/[workspaceSlug]/invites/components/invite-member-schema'
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
import { Select } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'

export function InviteMemberDialog({
    workspaceSlug,
    role,
}: {
    workspaceSlug: string
    role: WorkspaceRole
}) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const availableRoles =
        role === WorkspaceRole.OWNER
            ? [WorkspaceRole.MEMBER, WorkspaceRole.ADMIN]
            : [WorkspaceRole.MEMBER]
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InviteMemberInput>({
        resolver: zodResolver(inviteMemberSchema),
        defaultValues: {
            email: '',
            role: WorkspaceRole.MEMBER,
        },
    })

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)

        if (!nextOpen && !isSubmitting) {
            reset()
        }
    }

    const onSubmit = async (values: InviteMemberInput) => {
        clearErrors('root.server')

        const result = await createInvite(workspaceSlug, values)

        if (!result.success) {
            setError('root.server', {
                type: 'server',
                message: result.message,
            })
            return
        }

        reset()
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button variant="primary">
                    <Plus aria-hidden="true" size={16} strokeWidth={2} />
                    Convidar membro
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Convidar membro</DialogTitle>
                    <DialogDescription>
                        A pessoa receberá um convite para participar deste workspace.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogBody>
                        <Field label="E-mail" htmlFor="invite-email" error={errors.email?.message}>
                            <Input
                                id="invite-email"
                                type="email"
                                inputMode="email"
                                autoComplete="off"
                                spellCheck={false}
                                placeholder="nome@email.com"
                                required
                                data-autofocus
                                aria-invalid={!!errors.email}
                                {...register('email')}
                            />
                        </Field>

                        <Field label="Role" htmlFor="invite-role" error={errors.role?.message}>
                            <Select
                                id="invite-role"
                                aria-invalid={!!errors.role}
                                defaultValue={WorkspaceRole.MEMBER}
                                {...register('role')}
                            >
                                {availableRoles.map((availableRole) => (
                                    <option key={availableRole} value={availableRole}>
                                        {availableRole}
                                    </option>
                                ))}
                            </Select>
                        </Field>

                        {errors.root?.server?.message ? (
                            <p role="alert" className="text-[13px] leading-5 text-danger-text">
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
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Spinner />
                                    Enviando...
                                </>
                            ) : (
                                'Enviar convite'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
