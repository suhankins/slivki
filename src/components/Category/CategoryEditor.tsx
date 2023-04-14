import { SimpleCategory } from '@/models/Category';
import { ItemEditor } from '../Item/ItemEditor';
import { EditableText } from '@/components/EditableText';
import { Category } from './Category';
import { NewItem } from '../Item/NewItem';
import { DeleteButton } from '../DeleteButton';

export function CategoryEditor({ category }: { category: SimpleCategory }) {
    return (
        <Category
            title={
                <>
                    <EditableText
                        defaultValue={category.name}
                        fetchUrl={`/api/category/${category._id}/name`}
                        className="input-bordered input w-48 text-center text-xl font-bold xs:w-64"
                        placeholder="Category name"
                    />
                    <DeleteButton fetchUrl={`/api/category/${category._id}`} />
                </>
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
            <NewItem categoryId={category._id} />
        </Category>
    );
}
