import {
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
} from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { mutate } from 'swr';

export function MoveButton({
    className,
    itemIndex,
    categoryId,
    direction,
}: {
    className?: string;
    itemIndex?: number;
    categoryId: string;
    direction: 'up' | 'down';
}) {
    const [loading, setLoading] = useState(false);

    const fetchUrl = useMemo(
        () =>
            itemIndex === undefined
                ? `/api/category/${categoryId}/move?direction=${direction}`
                : `/api/category/${categoryId}/items/${itemIndex}/move?direction=${direction}`,
        []
    );
    const handleClick = async () => {
        setLoading(true);
        const result = await fetch(fetchUrl, {
            method: 'PATCH',
        });
        if (result.status === 200) {
            await mutate('/api/category');
        } else {
            // TODO: Add toasts for errors
            console.error(await result.text());
        }
        setLoading(false);
    };
    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`btn-primary btn-square btn relative ${className} ${
                loading && 'loading'
            }`}
        >
            {direction === 'up' ? (
                <ArrowSmallUpIcon className="absolute h-6 w-6" />
            ) : (
                <ArrowSmallDownIcon className="absolute h-6 w-6" />
            )}
        </button>
    );
}
