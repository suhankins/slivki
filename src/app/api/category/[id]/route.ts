import { findCategory } from '@/lib/findCategory';
import { handleDbError } from '@/lib/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Update category (for changing name and index)
 */
export async function PUT(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const result = await findCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;
    try {
        category.name_en = body.name_en ?? category.name_en;
        category.index = body.index ?? category.index;
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully updated', { status: 200 });
}