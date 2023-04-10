/**
 * File name standard for images uploaded to the server
 */
export function getFileName(
    id: string,
    itemIndex: number,
    filetype: string
): string {
    return `${id}_${itemIndex}.${filetype}`;
}
