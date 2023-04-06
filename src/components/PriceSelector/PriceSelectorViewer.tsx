'use client';

import { useState } from 'react';

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
        <div className="col-span-2 flex w-full flex-wrap items-center justify-center gap-4 self-end sm:col-span-1 sm:flex-row">
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
            <div className="py-4 text-3xl font-bold">
                <p className="w-16">{prices[selectedSize]}&#8382;</p>
            </div>
        </div>
    );
}
