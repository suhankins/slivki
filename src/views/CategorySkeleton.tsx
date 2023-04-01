import { ItemSkeleton } from './ItemSkeleton';

export function CategorySkeleton() {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="divider">
                {/* Name */}
                <div className="h-12 w-96 animate-pulse rounded-lg bg-primary" />
            </div>
            <ItemSkeleton />
            <ItemSkeleton />
        </div>
    );
}
