import { findCategory } from '@/lib/findCategory';
import { handleDbError } from '@/lib/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const result = await findCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;
    // Validating schema
    try {
        await category.addItem(body);
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Item successfully created', { status: 201 });
}
