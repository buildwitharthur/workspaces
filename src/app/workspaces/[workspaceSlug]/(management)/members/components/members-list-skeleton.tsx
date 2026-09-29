function SkeletonBar({ className }: { className: string }) {
    return <span className={`block animate-pulse rounded bg-surface-raised ${className}`} />
}

export function MembersListSkeleton() {
    return (
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[680px] border-collapse">
                <thead>
                    <tr className="border-b border-line">
                        {['Nome', 'E-mail', 'Role', 'Entrou em'].map((label) => (
                            <th key={label} scope="col" className="px-4 py-2.5 text-left text-xs leading-4 font-medium text-text-muted">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 4 }, (_, index) => (
                        <tr key={index} className="border-b border-line last:border-b-0">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <SkeletonBar className="size-8 rounded-pill" />
                                    <SkeletonBar className={index % 2 === 0 ? 'h-4 w-28' : 'h-4 w-36'} />
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <SkeletonBar className={index % 2 === 0 ? 'h-4 w-40' : 'h-4 w-32'} />
                            </td>
                            <td className="px-4 py-3">
                                <SkeletonBar className="h-[18px] w-16 rounded-pill" />
                            </td>
                            <td className="px-4 py-3">
                                <SkeletonBar className="h-4 w-20" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
