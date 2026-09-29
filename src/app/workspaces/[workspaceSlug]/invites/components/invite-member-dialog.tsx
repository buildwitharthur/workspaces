'use client'

import { Plus } from 'lucide-react'
import { WorkspaceRole } from '@/generated/prisma/enums'
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

export function InviteMemberDialog({ role }: { role: WorkspaceRole }) {
    const availableRoles =
        role === WorkspaceRole.OWNER
            ? [WorkspaceRole.MEMBER, WorkspaceRole.ADMIN]
            : [WorkspaceRole.MEMBER]

    return (
        <Dialog>
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

                <form onSubmit={(event) => event.preventDefault()}>
                    <DialogBody>
                        <Field label="E-mail" htmlFor="invite-email">
                            <Input
                                id="invite-email"
                                name="email"
                                type="email"
                                inputMode="email"
                                autoComplete="off"
                                spellCheck={false}
                                placeholder="nome@email.com"
                                required
                                data-autofocus
                            />
                        </Field>

                        <Field label="Role" htmlFor="invite-role">
                            <Select id="invite-role" name="role" defaultValue={WorkspaceRole.MEMBER}>
                                {availableRoles.map((availableRole) => (
                                    <option key={availableRole} value={availableRole}>
                                        {availableRole}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                    </DialogBody>

                    <DialogFooter>
                        <DialogClose>
                            <Button variant="secondary">Cancelar</Button>
                        </DialogClose>
                        <Button variant="primary" type="submit">
                            Enviar convite
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
