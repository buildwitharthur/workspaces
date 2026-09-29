function SkeletonCell({ className }: { className: string }) {
    return <span className={`block h-4 animate-pulse rounded-sm bg-surface-raised ${className}`} />
}

export function InvitesListSkeleton() {
    return (
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse">
                <thead>
                    <tr className="border-b border-line">
                        {[56, 12, 16, 20, 20].map((width, index) => (
                            <th key={index} scope="col" className="px-4 py-3">
                                <SkeletonCell className={`w-${width}`} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2].map((row) => (
                        <tr key={row} className="border-b border-line last:border-b-0">
                            <td className="px-4 py-3"><SkeletonCell className="w-44" /></td>
                            <td className="px-4 py-3"><SkeletonCell className="w-14" /></td>
                            <td className="px-4 py-3"><SkeletonCell className="w-16" /></td>
                            <td className="px-4 py-3"><SkeletonCell className="w-20" /></td>
                            <td className="px-4 py-3"><SkeletonCell className="w-20" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
