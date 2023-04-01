import { ItemClass } from '@/models/Item';
import { useState } from 'react';

export function Item({ item }: { item: ItemClass }) {
    const [selectedSize, setSelectedSize] = useState<number>(0);

    return (
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 rounded-lg bg-base-200 p-4">
            <div
                role="img"
                aria-label={`Picture of ${item.name_en}`}
                className="aspect-square h-full w-full rounded-lg bg-base-300 bg-cover bg-center bg-no-repeat sm:row-span-2"
                style={{
                    backgroundImage: `url(${
                        item.picture ?? '/placeholder.svg'
                    })`,
                }}
            />
            <div>
                <h2 className="text-2xl">{item.name_en}</h2>
                <p>{item.description_en}</p>
            </div>
            <div className="col-span-2 flex w-full items-center self-end sm:col-span-1">
                <div className="btn-group w-full">
                    {item.sizes?.map((size, index) => (
                        <button
                            type="button"
                            className={`btn-secondary btn ${
                                selectedSize === index && 'btn-active'
                            }`}
                            key={index}
                            onClick={() => setSelectedSize(index)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <div className="p-4 text-right text-3xl font-bold">
                    {item.price[selectedSize]}&#8382;
                </div>
            </div>
        </div>
    );
}
