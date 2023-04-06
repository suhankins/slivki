import { SimpleCategory } from '@/models/Category';
import { ItemEditor } from '../Item/ItemEditor';
import { EditableText } from '@/components/EditableText';
import { Category } from './Category';

export function CategoryEditor({ category }: { category: SimpleCategory }) {
    return (
        <Category
            title={
                <EditableText
                    defaultValue={category.name_en}
                    placeholder="Category name"
                    valueName="name_en"
                    fetchUrl={`/api/category/${category._id}`}
                    className="input-ghost input text-center text-xl font-bold"
                />
            }
        >
            {category.items &&
                category.items.map((item, index) => (
                    <ItemEditor
                        itemIndex={index}
                        categoryId={category._id}
                        item={item}
                        key={index}
                    />
                ))}
        </Category>
    );
}