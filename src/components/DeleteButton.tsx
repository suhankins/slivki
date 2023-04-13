'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';

export function DeleteButton({ fetchUrl }: { fetchUrl: string }) {
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
            className={`btn-error btn-square btn ${loading && 'loading'}`}
            aria-label="Delete image"
            onClick={handleDelete}
            disabled={loading}
        >
            <TrashIcon className="h-6 w-6" />
        </button>
    );
}
