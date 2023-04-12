import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '@/utils/server/getBodyAndCategory';

/**
 * Update category (for changing name and index)
 */
export async function PATCH(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;
    try {
        category.name = body.name ?? category.name;
        category.index = body.index ?? category.index;
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully updated', { status: 200 });
}
