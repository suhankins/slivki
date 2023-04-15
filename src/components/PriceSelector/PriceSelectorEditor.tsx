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

    const addNewSize = useMemo(
        () => async () => {
            setLoading(true);
            const result = await fetch(
                `/api/category/${categoryId}/items/${itemIndex}/sizes`,
                {
                    method: 'POST',
                    body: JSON.stringify({ value: 'size' }),
                }
            );
            if (result.status === 200) {
                await mutate('/api/category');
            } else {
                // TODO: Add error toasts
                console.error(await result.text());
            }
            setLoading(false);
        },
        []
    );

    return (
        <div className="col-span-2 flex w-full flex-wrap items-center justify-center gap-4 self-end xs:flex-nowrap xs:justify-end sm:col-span-1 sm:flex-row">
            <div className="flex">
                {sizes?.map((size, index) => (
                    <div className="group relative" key={index}>
                        <button
                            disabled={loading}
                            type="button"
                            className={`btn ${
                                (sizes.length === 1 && 'rounded-full') ||
                                (index === 0 && 'rounded-l-full') ||
                                (index === sizes.length - 1 &&
                                    'rounded-r-full') ||
                                'rounded-none'
                            } ${
                                (selectedSize === index &&
                                    'btn-primary btn-active') ||
                                'btn-secondary'
                            }`}
                            onClick={() => setSelectedSize(index)}
                        >
                            {size}
                        </button>
                        <div className="absolute -top-14 -left-8 flex">
                            <EditableText
                                aria-label="Edit size"
                                disabled={loading}
                                setLoading={setLoading}
                                defaultValue={size.trim()}
                                fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/sizes/${index}`}
                                className="input-bordered input invisible w-24 text-center group-hover:visible group-focus:visible group-active:visible"
                            />
                            <DeleteButton
                                setLoading={setLoading}
                                aria-label="Delete size"
                                fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/sizes/${index}`}
                                className="invisible group-hover:visible group-focus:visible group-active:visible"
                            />
                        </div>
                    </div>
                ))}
                {(sizes === undefined || sizes?.length < 3) && (
                    <button
                        onClick={addNewSize}
                        disabled={loading}
                        type="button"
                        className="btn-accent btn-square btn"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                )}
            </div>
            <p className="flex w-16 flex-nowrap items-center py-4 text-center text-3xl font-bold">
                <EditableText
                    disabled={loading}
                    setLoading={setLoading}
                    defaultValue={prices[selectedSize].toString()}
                    type="number"
                    className="input-ghost input w-10 rounded px-0 py-1 text-right text-3xl font-bold focus:text-center"
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/price/${selectedSize}`}
                />
                <span>&#8382; {/* Georgian lari symbol */}</span>
            </p>
        </div>
    );
}
