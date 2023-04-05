import { SimpleItem } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';

export function ItemViewer({ item }: { item: SimpleItem }) {
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
            title={<h2 className="text-2xl">{item.name_en}</h2>}
            description={<p>{item.description_en}</p>}
            priceSelector={
                <PriceSelectorViewer sizes={item.sizes} prices={item.price} />
            }
        />
    );
}
