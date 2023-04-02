/**
 * For loading screens
 */
export function ItemSkeleton(): JSX.Element {
    return (
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 rounded-lg bg-base-200 p-4">
            {/* Picture */}
            <div className="aspect-square h-full w-full animate-pulse rounded-lg bg-primary sm:row-span-2" />
            <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="h-8 w-32 animate-pulse rounded-lg bg-primary" />
                {/* Description */}
                <div className="flex flex-col gap-1">
                    <div className="h-6 w-36 animate-pulse rounded-lg bg-primary" />
                    <div className="h-6 w-16 animate-pulse rounded-lg bg-primary" />
                </div>
            </div>
            <div className="col-span-2 flex w-full items-center gap-4 self-end sm:col-span-1">
                <div className="h-16 w-full animate-pulse rounded-full bg-primary" />
                <div className="h-16 w-24 animate-pulse rounded-lg bg-primary" />
            </div>
        </div>
    );
}
