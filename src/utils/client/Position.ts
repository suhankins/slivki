export type Position = 'first' | 'last' | 'middle' | 'alone';

export function getPosition(index: number, length: number): Position {
    if (length === 1) {
        return 'alone';
    }
    if (index === 0) {
        return 'first';
    }
    if (index === length - 1) {
        return 'last';
    }
    return 'middle';
}
