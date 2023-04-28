'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { mutate } from 'swr';
import { EditableText } from '../EditableText';
import { DeleteButton } from '../buttons/DeleteButton';

export function SizeEditor({
    sizes,
    categoryId,
    className,
}: {
    sizes: string[];
    categoryId: string;
    className?: string;
}) {
    const [loading, setLoading] = useState(false);
    const addNewSize = useMemo(
        () => async () => {
            setLoading(true);
            const result = await fetch(`/api/category/${categoryId}/sizes`, {
                method: 'POST',
                body: JSON.stringify({ value: 'size' }),
            });
            if (result.status === 200) {
                await mutate('/api/category');
                await fetch('/api/revalidate');
            } else {
                // TODO: Add error toasts
                console.error(await result.text());
            }
            setLoading(false);
        },
        []
    );
    return (
        <div className={`flex gap-4 ${className}`}>
            <div className="flex">
                {sizes?.map((size, index) => (
                    <div key={index} className="group relative">
                        <EditableText
                            disabled={loading}
                            fetchUrl={`/api/category/${categoryId}/sizes/${index}`}
                            type="text"
                            defaultValue={size}
                            className={`input-bordered input w-16 text-center ${
                                (sizes.length === 1 && 'rounded-full') ||
                                (index === 0 && 'rounded-l-full') ||
                                (index === sizes.length - 1 &&
                                    'rounded-r-full') ||
                                'rounded-none'
                            }`}
                        />
                        <div className="invisible absolute -top-14 group-hover:visible">
                            <DeleteButton
                                fetchUrl={`/api/category/${categoryId}/sizes/${index}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
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
    );
}
