'use client';

import { useState } from 'react';
import { PriceSelector } from './PriceSelector';
import { EditableText } from '../EditableText';

export interface PriceSelectorEdtiorProps {
    categoryId: string;
    itemIndex: number;
    sizes?: string[];
    prices: number[];
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
        <PriceSelector>
            <div className="btn-group">
                {sizes?.map((size, index) => (
                    <button
                        disabled={loading}
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
            <p className="w-16 py-4 text-center text-3xl font-bold">
                <EditableText
                    disabled={loading}
                    setLoading={setLoading}
                    defaultValue={prices[selectedSize].toString()}
                    type="number"
                    className="input-ghost input inline-block w-10 rounded px-0 py-1 text-center text-3xl font-bold"
                    fetchUrl={`/api/category/${categoryId}/${itemIndex}/price/${selectedSize}`}
                />
                <span className="inline">&#8382;</span>
            </p>
        </PriceSelector>
    );
}
