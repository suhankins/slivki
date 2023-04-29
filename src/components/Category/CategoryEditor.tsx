import { SimpleCategory } from '@/models/Category';
import { ItemEditor } from '../Item/ItemEditor';
import { EditableText } from '@/components/EditableText';
import { Category } from './Category';
import { NewItem } from '../Item/NewItem';
import { DeleteButton } from '../buttons/DeleteButton';
import { EllipsisMenu } from '../EllipsisMenu';
import { MoveButton } from '../buttons/MoveButton';
import { Position, getPosition } from '@/utils/client/Position';
import { SizeEditor } from './SizeEditor';

export function CategoryEditor({
    category,
    position,
    id,
}: {
    category: SimpleCategory;
    position: Position;
    id?: string;
}) {
    return (
        <Category
            id={id}
            title={
                <>
                    <EditableText
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
                        {position !== 'alone' && (
                            <>
                                {position !== 'first' && (
                                    <li>
                                        <MoveButton
                                            direction="up"
                                            categoryId={category._id}
                                        />
                                    </li>
                                )}
                                {position !== 'last' && (
                                    <li>
                                        <MoveButton
                                            direction="down"
                                            categoryId={category._id}
                                        />
                                    </li>
                                )}
                            </>
                        )}
                        <li>
                            <EditableText
                                defaultValue={category.depth?.toString() ?? '0'}
                                fetchUrl={`/api/category/${category._id}/depth`}
                                type="number"
                                className="input-bordered input w-32"
                                placeholder="Depth"
                            />
                        </li>
                        <li>
                            <SizeEditor
                                sizes={category.sizes}
                                categoryId={category._id}
                                className=""
                            />
                        </li>
                    </EllipsisMenu>
                </>
            }
        >
            {category.items &&
                category.items.map((item, index, array) => (
                    <ItemEditor
                        category={category}
                        position={getPosition(index, array.length)}
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
