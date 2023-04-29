'use client';

import { useState } from 'react';
import { PriceSelector } from './PriceSelector';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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
                <>
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
                </>
            }
            price={
                <div className="flex items-center gap-2">
                    <p className="w-16 py-4 text-center text-3xl font-bold">
                        {prices[selectedSize]}&#8382;
                    </p>
                    {!process.env.PRODUCTION && (
                        <button className="btn-success btn-square btn">
                            <ShoppingCartIcon className="absolute h-6 w-6" />
                        </button>
                    )}
                </div>
            }
        />
    );
}
