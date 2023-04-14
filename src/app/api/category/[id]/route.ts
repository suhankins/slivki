import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';
import { findCategory } from '@/utils/server/findCategory';

export async function DELETE(
    _request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;

    try {
        await category.delete();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully deleted.', { status: 200 });
}
