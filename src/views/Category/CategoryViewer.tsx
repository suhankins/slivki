import { SimpleCategory } from '@/models/Category';
import { ItemViewer } from '../Item/ItemViewer';
import { Category } from './Category';

export interface CategoryProps {
    category: SimpleCategory;
    id?: string;
}

export function CategoryViewer({ category, id }: CategoryProps) {
    return (
        <Category
            title={
                <span className="text-center text-xl font-bold" id={id}>
                    {category.name_en}
                </span>
            }
        >
            {category.items &&
                category.items.map((item, index) => (
                    <ItemViewer item={item} key={index} />
                ))}
        </Category>
    );
}
