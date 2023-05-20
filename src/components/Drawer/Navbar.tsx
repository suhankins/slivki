'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useEffect, useState } from 'react';

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
    const [isBelowThreshold, setIsBelowThreshold] = useState(false);
    useEffect(() => {
        if (!changeOnScroll) return;
        setIsBelowThreshold(
            scrollPosition >= (window.visualViewport?.height ?? 1080) - 128
        );
    }, [changeOnScroll, scrollPosition]);
    return (
        <nav
            className={`navbar sticky top-0 left-0 z-40 ${
                isBelowThreshold
                    ? 'bg-base-300/100 text-neutral'
                    : 'bg-base-300/0 text-white'
            }`}
        >
            {children}
        </nav>
    );
}
