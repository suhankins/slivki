import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';
import { findCategory } from '@/utils/server/findCategory';
import { CategoryModel } from '@/models/Category';

export async function DELETE(
    _request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;

    try {
        const index = category.index;
        await category.delete();

        // Moving everything down by 1
        await CategoryModel.updateMany(
            { index: { $gt: index } },
            { $inc: { index: -1 } }
        ).exec();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully deleted.', { status: 200 });
}
