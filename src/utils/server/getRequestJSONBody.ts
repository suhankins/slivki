import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

export async function getRequestJSONBody(
    request: NextRequest
): Promise<any | NextResponse> {
    // Safety precautions in case of invalid JSON
    let body;
    try {
        body = await request.json();
    } catch (e) {
        if (e instanceof SyntaxError)
            return new NextResponse('Invalid JSON', {
                status: 400,
            });
        else return new NextResponse('Unknown error', { status: 500 });
    }
    return body;
}
