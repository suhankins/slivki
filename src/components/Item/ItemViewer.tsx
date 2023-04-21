import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { ImageView } from '@/components/Image/ImageView';

export function ItemViewer({ item }: { item: ItemClass }) {
    return (
        <Item
            image={item.image && <ImageView src={item.image} alt={item.name} />}
            title={<h3 className="text-2xl">{item.name}</h3>}
            description={<p>{item.description}</p>}
            priceSelector={
                <PriceSelectorViewer sizes={item.sizes} prices={item.price} />
            }
        />
    );
}
