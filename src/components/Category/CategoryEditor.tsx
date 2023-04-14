import { SimpleCategory } from '@/models/Category';
import { ItemEditor } from '../Item/ItemEditor';
import { EditableText } from '@/components/EditableText';
import { Category } from './Category';
import { NewItem } from '../Item/NewItem';
import { DeleteButton } from '../DeleteButton';
import { EllipsisMenu } from '../EllipsisMenu';

export function CategoryEditor({
    category,
    id,
}: {
    category: SimpleCategory;
    id?: string;
}) {
    return (
        <Category
            title={
                <>
                    <EditableText
                        id={id}
                        defaultValue={category.name}
                        fetchUrl={`/api/category/${category._id}/name`}
                        className="input-bordered input w-48 text-center text-xl font-bold xs:w-64"
                        placeholder="Category name"
                    />
                    <EllipsisMenu>
                        <li>
                            <DeleteButton
                                fetchUrl={`/api/category/${category._id}`}
                            />
                        </li>
                    </EllipsisMenu>
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
