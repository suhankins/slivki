import { EditableText } from '@/components/EditableText';
import { Item } from './Item';
import { EditableImage } from '@/components/Image/EditableImage';
import { ItemClass } from '@/models/Item';
import { PriceSelectorEditor } from '@/components/PriceSelector/PriceSelectorEditor';

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
                    picture={item.image}
                />
            }
            title={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}/name`}
                    placeholder="Title"
                    defaultValue={item.name}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0 text-2xl"
                />
            }
            description={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}/description`}
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
        />
    );
}
