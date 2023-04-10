'use client';

import { deleteImage } from '@/utils/client/image/deleteImage';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

export function DeleteButton({
    categoryId,
    itemIndex,
}: {
    categoryId: string;
    itemIndex: number;
}) {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteImage(categoryId, itemIndex);
            setLoading(false);
        } catch (error) {
            // TODO: Add toasts for errors
            console.error(error);
        }
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
