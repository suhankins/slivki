import { ItemSkeleton } from './ItemSkeleton';

export function CategorySkeleton() {
    return (
        <div
            className="flex w-full flex-col items-center gap-4"
            aria-busy="true"
        >
            <div className="divider w-full">
                {/* Name */}
                <div className="skeleton h-9 w-96 rounded-lg" />
            </div>
            <ItemSkeleton />
            <ItemSkeleton />
        </div>
    );
}
