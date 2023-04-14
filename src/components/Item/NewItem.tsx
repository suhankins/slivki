import { newItem } from '@/utils/client/new/newItem';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export function NewItem({ categoryId }: { categoryId: string }) {
    const [loading, setLoading] = useState(false);
    const { mutate } = useSWRConfig();
    const handleNewItemClick = async () => {
        try {
            setLoading(true);
            await newItem(categoryId);
            await mutate('/api/category');
            setLoading(false);
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