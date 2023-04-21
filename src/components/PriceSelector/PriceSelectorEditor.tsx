'use client';

import { useMemo, useState } from 'react';
import { EditableText } from '../EditableText';
import { PlusIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';
import { DeleteButton } from '../buttons/DeleteButton';

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
        <div className="col-span-2 flex w-full flex-wrap items-center justify-center gap-4 self-end xs:flex-nowrap xs:justify-end sm:col-span-1 sm:flex-row">
            <div className="flex">
                {sizes?.map((size, index) => (
                    <button
                        disabled={loading}
                        type="button"
                        className={`btn ${
                            (sizes.length === 1 && 'rounded-full') ||
                            (index === 0 && 'rounded-l-full') ||
                            (index === sizes.length - 1 && 'rounded-r-full') ||
                            'rounded-none'
                        } ${
                            (selectedSize === index &&
                                'btn-primary btn-active') ||
                            'btn-secondary'
                        }`}
                        onClick={() => setSelectedSize(index)}
                        key={index}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <p className="flex w-16 flex-nowrap items-center py-4 text-center text-3xl font-bold">
                <EditableText
                    disabled={loading}
                    setLoading={setLoading}
                    defaultValue={(prices[selectedSize] ?? '').toString()}
                    type="number"
                    className="input-ghost input w-10 rounded px-0 py-1 text-right text-3xl font-bold focus:text-center"
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/price/${selectedSize}`}
                />
                <span>&#8382; {/* Georgian lari symbol */}</span>
            </p>
        </div>
    );
}
