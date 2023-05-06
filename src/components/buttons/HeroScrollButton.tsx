'use client';

import { isBrowser } from '@/utils/client/isBrowser';
import { scrollElementIntoView } from '@/utils/client/scrollElementIntoView';
import { HTMLAttributes, useMemo } from 'react';

export function HeroScrollButton({
    children,
    className,
    id,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
    props?: HTMLAttributes<HTMLButtonElement>;
}) {
    const element = useMemo(() => {
        if (!isBrowser() || !id) return null;
        return document.getElementById(id);
    }, [id]);
    return (
        <button
            type="button"
            className={`btn-ghost btn-square btn text-white ${className}`}
            onClick={() => id && scrollElementIntoView(element)}
            {...props}
        >
            {children}
        </button>
    );
}
