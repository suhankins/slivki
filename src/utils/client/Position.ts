export type Position = 'first' | 'last' | 'middle' | 'alone';

export function getPosition(
    index: number,
    length: number,
    reverse: boolean = false
): Position {
    if (length === 1) {
        return 'alone';
    }
    if (index === 0) {
        return reverse ? 'last' : 'first';
    }
    if (index === length - 1) {
        return reverse ? 'first' : 'last';
    }
    return 'middle';
}
