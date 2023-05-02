import { ItemClass } from '@/models/Item';
import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '@/utils/server/getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { findCategory } from '@/utils/server/findCategory';

/*
 * TODO: Refactor this hell.
 */

type pathParams = {
    params: {
        id: string;
        itemIndex: number;
        field: string;
        arrayIndex: number;
    };
};

export async function PUT(
    request: NextRequest,
    { params: { id, itemIndex, field, arrayIndex } }: pathParams
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

    switch (key) {
        case 'price':
            if (!(arrayIndex in item.price))
                return new NextResponse('Invalid array index', {
                    status: 400,
                });
            item.price[arrayIndex] = body.value;
            break;
        default:
            return new NextResponse('Invalid field', { status: 400 });
    }

    try {
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse(`Field ${key} successfully updated`, {
        status: 200,
    });
}

export async function DELETE(
    _request: NextRequest,
    { params: { id, itemIndex, field, arrayIndex } }: pathParams
) {
    const key = field as keyof ItemClass;
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });
    if (!(itemIndex in category.items))
        return new NextResponse('Invalid item index', { status: 400 });
    const item = category.items[itemIndex];

    switch (key) {
        case 'price':
            if (!(arrayIndex in item.price))
                return new NextResponse('Invalid array index', {
                    status: 400,
                });
            item.price.splice(arrayIndex, 1);
            break;
        default:
            return new NextResponse('Invalid field', { status: 400 });
    }

    try {
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse(
        `Item ${arrayIndex} in field ${key} successfully deleted`,
        {
            status: 200,
        }
    );
}
