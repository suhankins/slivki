import { useEffect, useState } from 'react';

export function useScrollPosition(elementId?: string) {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        const handleScroll = (event: Event) => {
            if (event.type !== 'scroll') return;
            const target = event.target;
            if (!target) return;
            if (!(target instanceof HTMLElement)) return;
            setScrollPosition(target.scrollTop);
        };

        const element = elementId ? document.getElementById(elementId) : window;
        if (!element) throw new Error('Element not found');

        element.addEventListener('scroll', handleScroll, { passive: true });

        return () => element.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
}
