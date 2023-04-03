'use client';

import { SimpleCategory } from '@/models/Category';
import { ItemEditable } from './ItemEditable';
import { EditableText } from '@/components/EditableText';

export function CategoryEditable({ category }: { category: SimpleCategory }) {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="divider">
                <EditableText
                    defaultValue={category.name_en}
                    placeholder="Category name"
                    valueName="name_en"
                    fetchUrl={`/api/category/${category._id}`}
                    className="input-ghost input text-center text-xl font-bold"
                />
            </div>
            {category.items &&
                category.items.map((item, index) => (
                    <ItemEditable item={item} key={index} />
                ))}
        </div>
    );
}
