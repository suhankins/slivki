'use client';

import { scrollIdIntoView } from '@/utils/client/scrollIdIntoView';
import { HTMLAttributes } from 'react';

export function HeroScrollButton({
    children,
    className,
    id,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    id: string;
    props?: HTMLAttributes<HTMLButtonElement>;
}) {
    return (
        <button
            type="button"
            className={`btn-ghost btn-square btn text-white ${className}`}
            onClick={() => scrollIdIntoView(id)}
            {...props}
        >
            {children}
        </button>
    );
}
