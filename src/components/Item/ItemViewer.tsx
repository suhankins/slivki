import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { ImageViewer } from '@/components/Item/Image/ImageViewer';
import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString } from '@/lib/i18n-config';

export function ItemViewer({
    item,
    category,
    lang,
}: {
    item: ItemClass;
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
                    sizes={category.sizes}
                    prices={item.price}
                />
            }
        />
    );
}
