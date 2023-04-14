import { ItemSkeleton } from '../Item/ItemSkeleton';
import { Category } from './Category';

export function CategorySkeleton() {
    return (
        <Category
            title={<div className="skeleton h-9 w-96 rounded-lg" />}
            props={{
                'aria-busy': true,
            }}
        >
            <ItemSkeleton />
            <ItemSkeleton />
        </Category>
    );
}
