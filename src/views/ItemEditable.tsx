'use client';

import { EditableText } from '@/components/EditableText';
import { SimpleItem } from '@/models/Item';
import { useState } from 'react';

export function ItemEditable({
    item,
    categoryId,
    itemIndex,
}: {
    item: SimpleItem;
    categoryId: string;
    itemIndex: number;
}) {
    const [selectedSize, setSelectedSize] = useState<number>(0);

    return (
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 rounded-lg bg-base-200 p-4">
            {item.picture && (
                <div
                    role="img"
                    aria-label={`Picture of ${item.name_en}`}
                    className="aspect-square h-full w-full rounded-lg bg-base-300 bg-cover bg-center bg-no-repeat sm:row-span-2"
                    style={{
                        backgroundImage: `url('${item.picture}')`,
                    }}
                />
            )}
            <div>
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}`}
                    valueName="name_en"
                    defaultValue={item.name_en}
                    className="input-ghost input pl-0 text-2xl"
                />
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}`}
                    valueName="description_en"
                    defaultValue={item.description_en}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded bg-transparent pl-0 pr-0"
                />
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
