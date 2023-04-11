'use client';

import { useState } from 'react';
import { PriceSelector } from './PriceSelector';

export interface PriceSelectorViewerProps {
    sizes?: string[];
    prices: number[];
}

export function PriceSelectorViewer({
    sizes,
    prices,
}: PriceSelectorViewerProps) {
    const [selectedSize, setSelectedSize] = useState(0);

    return (
        <PriceSelector>
            <div className="btn-group">
                {sizes?.map((size, index) => (
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
            <p className="w-16 py-4 text-center text-3xl font-bold">
                {prices[selectedSize]}&#8382;
            </p>
        </PriceSelector>
    );
}
