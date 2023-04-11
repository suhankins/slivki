import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '../../getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { ItemClass } from '@/models/Item';

export async function PUT(
    request: NextRequest,
    {
        params: { id, itemIndex, field },
    }: { params: { id: string; itemIndex: number; field: string } }
) {
    console.log('PUT /api/category/:id/:itemIndex/:field', {
        id,
        itemIndex,
        field,
    });
    if (!(field in ItemClass))
        return new NextResponse('Invalid field', { status: 400 });
    const key = field as keyof ItemClass;

    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;

    const [body, category] = result;

    if (body.value === undefined)
        return new NextResponse('No value provided', { status: 400 });

    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });

    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= category.items.length)
        return new NextResponse('Invalid item index', { status: 400 });

    try {
        const item = category.items[itemIndex];

        item[key] = body.value ?? item[key];
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Item successfully updated', { status: 200 });
}
