/**
 * File name standard for images uploaded to the server.
 * Adds some random numbers to the end of the file name to avoid duplicate file names.
 */
export function getFileName(
    id: string,
    itemIndex: number,
    filetype: string
): string {
    return `${id}_${itemIndex}_${
        Math.random().toString().split('.')[1]
    }.${filetype}`;
}
