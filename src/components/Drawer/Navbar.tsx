'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';

export function Navbar({
    children,
    parentId,
}: {
    children?: React.ReactNode;
    parentId?: string;
}) {
    const scrollPosition = useScrollPosition(parentId);
    return (
        <nav
            className={`navbar sticky top-0 left-0 z-40 ${
                scrollPosition < (window.visualViewport?.height ?? 0)
                    ? 'text-white backdrop-blur'
                    : 'bg-base-300'
            }`}
        >
            {children}
        </nav>
    );
}
