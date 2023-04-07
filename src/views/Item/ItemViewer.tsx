import { SimpleItem } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { Image } from '@/components/Image/Image';

export function ItemViewer({ item }: { item: SimpleItem }) {
    return (
        <Item
            picture={
                item.picture && (
                    <Image picture={item.picture} ariaLabel={item.name_en} />
                )
            }
            title={<h2 className="text-2xl">{item.name_en}</h2>}
            description={<p>{item.description_en}</p>}
            priceSelector={
                <PriceSelectorViewer sizes={item.sizes} prices={item.price} />
            }
        />
    );
}
