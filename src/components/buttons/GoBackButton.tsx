'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export function GoBackButton() {
    const router = useRouter();
    return (
        <button
            className="btn-ghost btn-square btn"
            onClick={() => router.back()}
        >
            <ArrowLeftIcon className="absolute h-6 w-6" />
        </button>
    );
}
