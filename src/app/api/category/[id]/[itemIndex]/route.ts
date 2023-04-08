import { findCategory } from '@/utils/findCategory';
import { handleDbError } from '@/utils/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Update category (for changing name and index)
 */
export async function PUT(
    request: NextRequest,
    { params: { id, itemIndex } }: { params: { id: string; itemIndex: string } }
) {
    const result = await findCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 404 });
    try {
        const index = Number(itemIndex);

        if (index < 0 || index >= category.items.length)
            return new NextResponse('Item index out of range', { status: 404 });

        const item = category.items[index];

        item.name = body.name ?? item.name;
        item.description = body.description ?? item.description;
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Item successfully updated', { status: 200 });
}
