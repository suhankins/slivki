import { EditableText } from '@/components/EditableText';
import { Item } from './Item';
import { EditableImage } from '@/components/Image/EditableImage';
import { ItemClass } from '@/models/Item';
import { PriceSelectorEditor } from '@/components/PriceSelector/PriceSelectorEditor';
import { DeleteButton } from '@/components/buttons/DeleteButton';
import { UploadButton } from '@/components/buttons/UploadButton';
import { EllipsisMenu } from '../EllipsisMenu';
import { Position } from '@/utils/client/Position';
import { MoveButton } from '../buttons/MoveButton';

export function ItemEditor({
    item,
    categoryId,
    itemIndex,
    position,
}: {
    item: ItemClass;
    categoryId: string;
    itemIndex: number;
    position: Position;
}) {
    return (
        <Item
            picture={
                <EditableImage
                    categoryId={categoryId}
                    itemIndex={itemIndex}
                    image={item.image}
                />
            }
            title={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/name`}
                    placeholder="Title"
                    defaultValue={item.name}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0 text-2xl"
                />
            }
            description={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/description`}
                    placeholder="Description"
                    defaultValue={item.description}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0"
                />
            }
            priceSelector={
                <PriceSelectorEditor
                    categoryId={categoryId}
                    itemIndex={itemIndex}
                    sizes={item.sizes}
                    prices={item.price}
                />
            }
        >
            <EllipsisMenu className="absolute top-0 right-0">
                {!item.image && (
                    <li>
                        <UploadButton
                            itemIndex={itemIndex}
                            categoryId={categoryId}
                        />
                    </li>
                )}
                <li>
                    <DeleteButton
                        aria-label="Delete item"
                        className="btn-square"
                        fetchUrl={`/api/category/${categoryId}/items/${itemIndex}`}
                    />
                </li>
                {position !== 'alone' && (
                    <>
                        {position !== 'first' && (
                            <li>
                                <MoveButton
                                    direction="up"
                                    categoryId={categoryId}
                                    itemIndex={itemIndex}
                                />
                            </li>
                        )}
                        {position !== 'last' && (
                            <li>
                                <MoveButton
                                    direction="down"
                                    categoryId={categoryId}
                                    itemIndex={itemIndex}
                                />
                            </li>
                        )}
                    </>
                )}
            </EllipsisMenu>
        </Item>
    );
}
