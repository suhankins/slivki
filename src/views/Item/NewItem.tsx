import { newItem } from '@/utils/new/newItem';
import { useState } from 'react';

export function NewItem({
    categoryId,
    mutate,
}: {
    categoryId: string;
    mutate: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const handleNewItemClick = async () => {
        try {
            setLoading(true);
            await newItem(categoryId);
            setLoading(false);
            mutate();
        } catch (e) {
            // TODO: Add toasts for errors
            console.error(e);
        }
    };
    return (
        <button
            className={`btn-success btn w-1/2 ${loading && 'loading'}`}
            disabled={loading}
            onClick={handleNewItemClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
            New item
        </button>
    );
}
