'use client';

import { scrollElementIntoView } from '@/utils/client/scrollElementIntoView';
import { HTMLAttributes, useEffect, useState } from 'react';

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
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(() => setElement(id ? document.getElementById(id) : null), [id]);
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
