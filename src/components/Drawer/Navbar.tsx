'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { isBrowser } from '@/utils/client/isBrowser';

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
                scrollPosition <
                ((isBrowser() && window.visualViewport?.height) || 0)
                    ? 'bg-transparent text-white'
                    : 'bg-base-300'
            }`}
        >
            {children}
        </nav>
    );
}
