import { EditableText } from '@/components/EditableText';
import { SimpleItem } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';

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
            picture={
                item.picture && (
                    <div
                        role="img"
                        aria-label={`Picture of ${item.name_en}`}
                        className="aspect-square h-full w-full rounded-lg bg-base-300 bg-cover bg-center bg-no-repeat sm:row-span-2"
                        style={{
                            backgroundImage: `url('${item.picture}')`,
                        }}
                    />
                )
            }
            title={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}`}
                    valueName="name_en"
                    defaultValue={item.name_en}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0 text-2xl"
                />
            }
            description={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}`}
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
