import { ItemClass } from '@/models/Item';
import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '../../../getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';

export async function PUT(
    request: NextRequest,
    {
        params: { id, itemIndex, field, arrayIndex },
    }: {
        params: {
            id: string;
            itemIndex: number;
            field: string;
            arrayIndex: number;
        };
    }
) {
    const key = field as keyof ItemClass;
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });
    if (!(itemIndex in category.items))
        return new NextResponse('Invalid item index', { status: 400 });
    const item = category.items[itemIndex];

    try {
        switch (key) {
            case 'price':
                if (!(arrayIndex in item.price))
                    return new NextResponse('Invalid array index', {
                        status: 400,
                    });
                item.price[arrayIndex] = body.value;
                break;
            case 'sizes':
                if (item.sizes === undefined || item.sizes.length === 0)
                    return new NextResponse('No sizes in item', {
                        status: 400,
                    });
                if (typeof body.value !== 'string')
                    return new NextResponse('Invalid value', { status: 400 });
                if (!(arrayIndex in item.sizes))
                    return new NextResponse('Invalid array index', {
                        status: 400,
                    });
                item.sizes[arrayIndex] = body.value;
                break;
            default:
                return new NextResponse('Invalid field', { status: 400 });
        }

        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse('Update successful', { status: 200 });
}
