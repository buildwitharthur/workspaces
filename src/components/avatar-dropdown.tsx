import { AvatarDropdownMenu } from '@/components/avatar-dropdown-menu'
import { requireAuthenticatedUser } from '@/lib/authentication'

export async function AvatarDropdown() {
    const user = await requireAuthenticatedUser()

    return (
        <AvatarDropdownMenu
            user={{
                name: user.name ?? null,
                email: user.email ?? null,
                image: user.image ?? null,
            }}
        />
    )
}
