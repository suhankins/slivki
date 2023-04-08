import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { Image } from '@/components/Image/Image';

export function ItemViewer({ item }: { item: ItemClass }) {
    return (
        <Item
            picture={
                item.image && <Image picture={item.image} altText={item.name} />
            }
            title={<h3 className="text-2xl">{item.name}</h3>}
            description={<p>{item.description}</p>}
            priceSelector={
                <PriceSelectorViewer sizes={item.sizes} prices={item.price} />
            }
        />
    );
}
