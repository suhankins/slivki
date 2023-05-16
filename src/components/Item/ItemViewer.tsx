import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { ImageViewer } from '@/components/Item/Image/ImageViewer';
import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString, mapToObject } from '@/lib/i18n-config';

export function ItemViewer({
    item,
    itemIndex,
    category,
    lang,
}: {
    item: ItemClass;
    itemIndex: number;
    category: SimpleCategory;
    lang: Locale;
}) {
    return (
        <Item
            image={
                item.image && (
                    <ImageViewer
                        src={item.image}
                        alt={getLocalizedString(item.name, lang)}
                    />
                )
            }
            title={
                <h3 className="card-title text-2xl">
                    {getLocalizedString(item.name, lang)}
                </h3>
            }
            description={
                <p>{getLocalizedString(item.description, lang, false)}</p>
            }
            priceSelector={
                <PriceSelectorViewer
                    name={mapToObject(item.name)}
                    categoryId={category._id}
                    itemIndex={itemIndex}
                    sizes={category.sizes}
                    prices={item.price}
                />
            }
        />
    );
}
