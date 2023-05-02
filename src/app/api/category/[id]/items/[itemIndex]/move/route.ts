import { findCategory } from '@/utils/server/findCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest,
    {
        params: { id, itemIndex },
    }: {
        params: {
            id: string;
            itemIndex: string;
        };
    }
) {
    const direction = request.nextUrl.searchParams.get('direction');
    if (direction !== 'up' && direction !== 'down')
        return new NextResponse('Invalid direction', { status: 400 });
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });
    const itemIndexNum = parseInt(itemIndex);
    if (isNaN(itemIndexNum))
        return new NextResponse('Invalid item index', { status: 400 });
    const item = category.items[itemIndexNum];
    if (item === undefined)
        return new NextResponse('Invalid item index', { status: 400 });
    if (direction === 'up' && itemIndexNum === 0)
        return new NextResponse('Item is already at the top', { status: 400 });
    if (direction === 'down' && itemIndexNum === category.items.length - 1)
        return new NextResponse('Item is already at the bottom', {
            status: 400,
        });

    const change = direction === 'up' ? -1 : 1;
    try {
        let otherItem = category.items.splice(itemIndexNum, 1)[0];
        category.items.splice(itemIndexNum + change, 0, otherItem);
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse('Item successfully moved', { status: 200 });
}
