import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '@/utils/server/getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { findCategory } from '@/utils/server/findCategory';
import { SimpleCategory } from '@/models/Category';

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

export async function PATCH(
    request: NextRequest,
    { params: { id, field, arrayIndex } }: pathParams
) {
    const key = field as keyof SimpleCategory;
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;

    switch (key) {
        case 'sizes':
            if (category.sizes === undefined || category.sizes.length === 0)
                return new NextResponse('No sizes in category', {
                    status: 400,
                });
            if (typeof body.value !== 'string')
                return new NextResponse('Invalid value', { status: 400 });
            if (!(arrayIndex in category.sizes))
                return new NextResponse('Invalid array index', {
                    status: 400,
                });
            category.sizes[arrayIndex] = body.value;
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
    { params: { id, field, arrayIndex } }: pathParams
) {
    const key = field as keyof SimpleCategory;
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;

    switch (key) {
        case 'sizes':
            if (category.sizes === undefined || category.sizes.length === 0)
                return new NextResponse('No sizes in category', {
                    status: 400,
                });
            if (!(arrayIndex in category.sizes))
                return new NextResponse('Invalid array index', {
                    status: 400,
                });
            category.sizes.splice(arrayIndex, 1);
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
        `category ${arrayIndex} in field ${key} successfully deleted`,
        {
            status: 200,
        }
    );
}
