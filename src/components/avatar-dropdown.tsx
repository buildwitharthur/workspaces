import { AvatarDropdownMenu } from '@/components/avatar-dropdown-menu'
import { requireAuthPage } from '@/lib/authentication'

export async function AvatarDropdown() {
    const user = await requireAuthPage()

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
