/**
 * For loading screens
 */
export function ItemSkeleton(): JSX.Element {
    // TODO: Make it look like actual Item
    return (
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 rounded-lg bg-base-200 p-4">
            {/* Picture */}
            <div className="skeleton aspect-square h-full w-full rounded-lg sm:row-span-2" />
            <div className="vertical-list">
                {/* Name */}
                <div className="skeleton h-8 w-32 rounded-lg" />
                {/* Description */}
                <div className="flex flex-col gap-1">
                    <div className="skeleton h-6 w-36 rounded-lg" />
                    <div className="skeleton h-6 w-16 rounded-lg" />
                </div>
            </div>
            <div className="col-span-2 flex w-full items-center gap-4 self-end sm:col-span-1">
                <div className="skeleton h-14 w-full rounded-full" />
                <div className="skeleton h-14 w-24 rounded-lg" />
            </div>
        </div>
    );
}
