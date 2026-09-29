import { AvatarDropdownMenu } from '@/components/avatar-dropdown-menu'
import { requireAuthPage } from '@/lib/authentication'

export type AvatarDropdownVariant = 'default' | 'extended'

export async function AvatarDropdown({
    variant = 'default',
}: {
    variant?: AvatarDropdownVariant
}) {
    const user = await requireAuthPage()

    return (
        <AvatarDropdownMenu
            user={{
                name: user.name ?? null,
                email: user.email ?? null,
                image: user.image ?? null,
            }}
            variant={variant}
        />
    )
}
