import { CategoryModel } from '@/models/Category';
import { findCategory } from '@/utils/server/findCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const direction = request.nextUrl.searchParams.get('direction');
    if (direction !== 'up' && direction !== 'down')
        return new NextResponse('Invalid direction specified', { status: 400 });
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    if (category.index === undefined)
        return new NextResponse(
            "Category index is undefined and I'm not sure what to do about it. Call the programmer I guess?",
            { status: 500 }
        );
    if (direction === 'down' && category.index === 0)
        return new NextResponse('Category is already at the bottom', {
            status: 400,
        });
    if (
        direction === 'up' &&
        category.index === (await CategoryModel.countDocuments()) - 1
    )
        return new NextResponse('Category is already at the top', {
            status: 400,
        });
    const change = direction === 'down' ? -1 : 1;

    try {
        await CategoryModel.findOneAndUpdate(
            { index: category.index + change },
            { index: category.index }
        ).exec();
        category.index += change;
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse('Category successfully moved', { status: 200 });
}
