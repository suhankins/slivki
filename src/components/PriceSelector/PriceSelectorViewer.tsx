'use client';

import { useState } from 'react';
import { PriceSelector } from './PriceSelector';
import { AddToCartButton } from '../buttons/AddToCartButton';
import { LocalizedStringObject } from '@/lib/i18n-config';

export interface PriceSelectorViewerProps {
    name: LocalizedStringObject;
    categoryId: string;
    itemIndex: number;
    sizes?: string[];
    prices: (number | null)[];
}

export function PriceSelectorViewer({
    name,
    categoryId,
    itemIndex,
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
                <>
                    <p className="w-16 py-4 text-center text-3xl font-bold">
                        {prices[selectedSize]}&#8382;
                    </p>
                    {process.env.NEXT_PUBLIC_DEV && (
                        <AddToCartButton
                            cartItem={{
                                name,
                                price: prices[selectedSize] ?? 0,
                                selectedSize,
                                sizeString: sizes?.[selectedSize],
                                categoryId,
                                itemIndex,
                            }}
                        />
                    )}
                </>
            }
        />
    );
}
