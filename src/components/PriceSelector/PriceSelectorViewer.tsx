'use client';

import { useState } from 'react';
import { PriceSelector } from './PriceSelector';

export interface PriceSelectorViewerProps {
    sizes?: string[];
    prices: (number | null)[];
}

export function PriceSelectorViewer({
    sizes,
    prices,
}: PriceSelectorViewerProps) {
    const [selectedSize, setSelectedSize] = useState(
        prices.findIndex((value) => value !== null)
    );

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
                                    className="radio-primary radio radio-lg"
                                    checked={selectedSize === index}
                                    disabled={prices[index] === null}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            }
            price={
                <p className="w-16 py-4 text-center text-3xl font-bold">
                    {prices[selectedSize]}&#8382;
                </p>
            }
        />
    );
}
