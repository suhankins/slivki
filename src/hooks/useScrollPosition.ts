import { isBrowser } from '@/utils/client/isBrowser';
import { useEffect, useMemo, useState } from 'react';

/**
 * Returns the scroll position of the window or an element.
 * @param elementId The id of the element to get the scroll position from. If not provided, the window scroll position will be returned.
 */
export function useScrollPosition(elementId?: string) {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const element = useMemo(
        () =>
            (elementId && document.getElementById(elementId)) ||
            (isBrowser() && window) ||
            null,
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

        if (!element) throw new Error('Element not found');

        element.addEventListener('scroll', handleScroll, { passive: true });

        return () => element.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
}
