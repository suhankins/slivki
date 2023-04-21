import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { ImageView } from '@/components/Image/ImageView';
import { SimpleCategory } from '@/models/Category';

export function ItemViewer({
    item,
    category,
}: {
    item: ItemClass;
    category: SimpleCategory;
}) {
    return (
        <Item
            image={item.image && <ImageView src={item.image} alt={item.name} />}
            title={<h3 className="text-2xl">{item.name}</h3>}
            description={<p>{item.description}</p>}
            priceSelector={
                <PriceSelectorViewer
                    sizes={category.sizes}
                    prices={item.price}
                />
            }
        />
    );
}
