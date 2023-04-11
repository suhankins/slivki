import { findCategory } from '@/utils/server/findCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    _request: NextRequest,
    { params: { id, itemIndex } }: { params: { id: string; itemIndex: number } }
) {
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });
    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= category.items.length)
        return new NextResponse('Invalid item index', { status: 400 });

    try {
        category.items.splice(itemIndex, 1);
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse('Item successfully deleted', { status: 200 });
}
