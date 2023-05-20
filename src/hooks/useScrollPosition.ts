import { useEffect, useState } from 'react';

/**
 * Returns the scroll position of the window or an element.
 * @param elementId The id of the element to get the scroll position from. If not provided, the window scroll position will be returned.
 */
export function useScrollPosition(elementId?: string) {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(
        () => setElement(elementId ? document.getElementById(elementId) : null),
        [elementId]
    );

    useEffect(() => {
        const handleScroll = (event: Event) => {
            if (event.type !== 'scroll') return;
            const target = event.target;
            if (!target) return;
            if (!(target instanceof HTMLElement)) return;
            setScrollPosition(target.scrollTop);
        };

        if (!element) return;

        element.addEventListener('scroll', handleScroll, { passive: true });

        return () => element.removeEventListener('scroll', handleScroll);
    }, [element]);

    return scrollPosition;
}
