'use client';

import {
    Dispatch,
    HTMLAttributes,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';

export function DeleteButton({
    fetchUrl,
    className,
    setLoading: setOutsideLoading,
    ...props
}: {
    fetchUrl: string;
    className?: string;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    props?: HTMLAttributes<HTMLButtonElement>;
}) {
    const [loading, setLoading] = useState(false);
    const handleDelete = useMemo(
        () => async () => {
            setLoading(true);
            const result = await fetch(fetchUrl, { method: 'DELETE' });
            // TODO: Add toasts for errors
            if (result.status !== 200) console.error(await result.text());
            else await mutate('/api/category');
            setLoading(false);
        },
        []
    );

    useEffect(() => setOutsideLoading?.(loading), [loading]);

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
