'use client';

import { useState } from 'react';
import { EditableText } from '../EditableText';
import { PriceSelector } from './PriceSelector';

export interface PriceSelectorEdtiorProps {
    categoryId: string;
    itemIndex: number;
    sizes?: string[];
    prices: (number | null)[];
}

export function PriceSelectorEditor({
    categoryId,
    itemIndex,
    sizes,
    prices,
}: PriceSelectorEdtiorProps) {
    const [selectedSize, setSelectedSize] = useState(0);
    const [loading, setLoading] = useState(false);

    return (
        <PriceSelector
            sizeSelector={
                <div className="flex w-full justify-evenly">
                    {sizes?.map((size, index) => (
                        <div className="form-control" key={index}>
                            <label className="label cursor-pointer flex-col">
                                <p>{size}</p>
                                <input
                                    onChange={() => setSelectedSize(index)}
                                    type="radio"
                                    className={`radio-primary radio radio-lg ${
                                        prices[index] === null && 'radio-error'
                                    }`}
                                    checked={selectedSize === index}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            }
            price={
                <p className="flex w-16 flex-nowrap items-center py-4 text-center text-3xl font-bold">
                    <EditableText
                        nullable={true}
                        disabled={loading}
                        setLoading={setLoading}
                        defaultValue={
                            prices[selectedSize]
                                ? prices[selectedSize]?.toString()
                                : ''
                        }
                        type="number"
                        className="input-ghost input w-10 rounded px-0 py-1 text-right text-3xl font-bold focus:text-center"
                        fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/price/${selectedSize}`}
                    />
                    <span>&#8382; {/* Georgian lari symbol */}</span>
                </p>
            }
        />
    );
}
