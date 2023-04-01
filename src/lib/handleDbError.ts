import { NextResponse } from 'next/server';

/**
 * Handles errors when creating new documents in DB. Sends either error message or error object.
 * @param e error
 * @param res response object
 */
export function handleDbError(e: unknown): NextResponse {
    if (e instanceof Error && 'errors' in e) {
        let errorResponse: { [id: string]: string } = {};
        const errors = e.errors as {
            [id: string]: { properties: { message: string } };
        };
        for (const path in errors) {
            // If there are no properties, we can't really give anything useful to front-end
            if (errors[path].properties === undefined) {
                continue;
            }
            errorResponse[path] = errors[path].properties.message;
        }
        // Chances are, if we get all the way here with no keys,
        // it's not front-end, but instead someone messing with requests
        if (Object.keys(errorResponse).length > 0) {
            return new NextResponse(JSON.stringify(errorResponse), {
                status: 400,
            });
        }
    }
    console.error(e);
    return new NextResponse('', { status: 500 });
}
