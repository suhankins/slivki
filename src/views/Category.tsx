'use client';

import { SimpleCategory } from '@/models/Category';
import { Item } from './Item';

export interface CategoryProps {
    category: SimpleCategory;
    id?: string;
}

export function Category({ category, id }: CategoryProps) {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="divider" id={id}>
                <span className="text-center text-xl font-bold">
                    {category.name_en}
                </span>
            </div>
            {category.items &&
                category.items.map((item) => <Item item={item} />)}
        </div>
    );
}
