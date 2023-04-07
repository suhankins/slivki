import { EditableText } from '@/components/EditableText';
import { SimpleItem } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { EditableImage } from '@/components/Image/EditableImage';

export function ItemEditor({
    item,
    categoryId,
    itemIndex,
}: {
    item: SimpleItem;
    categoryId: string;
    itemIndex: number;
}) {
    return (
        <Item
            picture={<EditableImage picture={item.picture} />}
            title={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}`}
                    valueName="name_en"
                    placeholder="Title"
                    defaultValue={item.name_en}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0 text-2xl"
                />
            }
            description={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}`}
                    placeholder="Description"
                    valueName="description_en"
                    defaultValue={item.description_en}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0"
                />
            }
            priceSelector={
                <PriceSelectorViewer sizes={item.sizes} prices={item.price} />
            }
        />
    );
}
