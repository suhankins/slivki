import { CategoryClass } from '@/models/Category';
import { Item } from './Item';

export function Category({ category }: { category: CategoryClass }) {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="divider">
                <span className="text-center text-xl font-bold">
                    {category.name_en}
                </span>
            </div>
            {category.items &&
                category.items.map((item) => <Item item={item} />)}
        </div>
    );
}
