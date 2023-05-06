import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Revalidates main page.
 */
export function GET() {
    try {
        revalidatePath('/en/');
        revalidatePath('/ru/');
    } catch (e) {
        if (e instanceof Error)
            return new NextResponse(`Error during revalidation: ${e.message}`, {
                status: 500,
            });
        return new NextResponse(`Unknown error during revalidation`, {
            status: 500,
        });
    }

    return new NextResponse('Revalidated', { status: 200 });
}
