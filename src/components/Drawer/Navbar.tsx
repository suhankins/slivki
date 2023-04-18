'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { isBrowser } from '@/utils/client/isBrowser';

export function Navbar({
    children,
    parentId,
    changeOnScroll = false,
}: {
    children?: React.ReactNode;
    parentId?: string;
    changeOnScroll?: boolean;
}) {
    const scrollPosition = useScrollPosition(parentId);
    return (
        <nav
            className={`navbar sticky top-0 left-0 z-40 ${
                changeOnScroll &&
                (!isBrowser() ||
                    scrollPosition < (window.visualViewport?.height ?? 1080))
                    ? 'bg-transparent text-white'
                    : 'bg-base-300'
            }`}
        >
            {children}
        </nav>
    );
}
