export function scrollElementIntoView(element: HTMLElement | null) {
    element?.scrollIntoView({
        behavior: 'smooth',
    });
}
