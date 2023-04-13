'use client';

import { HTMLAttributes, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';

export function DeleteButton({
    fetchUrl,
    className,
    ...props
}: {
    fetchUrl: string;
    className?: string;
    props?: HTMLAttributes<HTMLButtonElement>;
}) {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        const result = await fetch(fetchUrl, { method: 'DELETE' });
        // TODO: Add toasts for errors
        if (result.status !== 200) console.error(result.text());
        await mutate('/api/category');
        setLoading(false);
    };

    return (
        <button
            className={`btn-error btn-square btn ${
                loading && 'loading'
            } ${className}`}
            onClick={handleDelete}
            disabled={loading}
            {...props}
        >
            <TrashIcon className="h-6 w-6" />
        </button>
    );
}
