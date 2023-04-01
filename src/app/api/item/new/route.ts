import { findCategory } from '@/lib/findCategory';
import { handleDbError } from '@/lib/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const result = await findCategory(request);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;
    // Validating schema
    try {
        category.items?.push(body);
        await category.save();
    } catch (e) {
        // Realistaclly, when user is creating a new item using the form,
        // this should be the only type of error that can occur.
        return handleDbError(e);
    }
    return new NextResponse('Item successfully created', { status: 201 });
}
