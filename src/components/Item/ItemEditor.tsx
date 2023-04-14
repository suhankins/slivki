import { EditableText } from '@/components/EditableText';
import { Item } from './Item';
import { EditableImage } from '@/components/Image/EditableImage';
import { ItemClass } from '@/models/Item';
import { PriceSelectorEditor } from '@/components/PriceSelector/PriceSelectorEditor';
import { DeleteButton } from '@/components/DeleteButton';
import { UploadButton } from '@/components/Image/UploadButton';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

export function ItemEditor({
    item,
    categoryId,
    itemIndex,
}: {
    item: ItemClass;
    categoryId: string;
    itemIndex: number;
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
            <div className="dropdown-end dropdown absolute top-0 right-0">
                <label tabIndex={0} className="btn-ghost btn w-min">
                    <EllipsisVerticalIcon className="absolute h-6 w-6" />
                </label>
                <ul className="dropdown-content menu rounded-box gap-1 bg-base-100 p-2 shadow">
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
                </ul>
            </div>
        </Item>
    );
}
