import {
    UserMenu,
    type AvatarDropdownVariant,
} from '@/components/user-menu'
import { requireAuthPage } from '@/lib/authentication'

export type { AvatarDropdownVariant } from '@/components/user-menu'

export async function AvatarDropdown({
    variant = 'default',
}: {
    variant?: AvatarDropdownVariant
}) {
    const user = await requireAuthPage()

    return (
        <UserMenu
            user={{
                name: user.name ?? null,
                email: user.email ?? null,
                image: user.image ?? null,
            }}
            variant={variant}
        />
    )
}
