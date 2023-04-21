import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '@/utils/server/getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { ItemClass } from '@/models/Item';
import { findCategory } from '@/utils/server/findCategory';
import { googleStorage } from '@/lib/googleStorage';

type pathParams = { params: { id: string; itemIndex: number; field: string } };

/**
 * Meant for deleting fields of items (e.g. image)
 */
export async function DELETE(
    _request: NextRequest,
    { params: { id, itemIndex, field } }: pathParams
) {
    // Currently, this function is only meant for deleting images
    if (field !== 'image')
        return new NextResponse('Invalid field', { status: 400 });

    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });
    const item = category.items[itemIndex];
    if (item === undefined)
        return new NextResponse('Invalid item index', { status: 400 });

    const image = item.image;
    if (image === undefined)
        return new NextResponse('No image to delete', { status: 400 });
    const parts = image.split('/');
    const filename =
        parts[parts.length - 1] === ''
            ? parts[parts.length - 2]
            : parts[parts.length - 1];

    try {
        item.image = undefined;
        await category.save();
        googleStorage.file(filename).delete();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse(`${field} successfully updated`, { status: 200 });
}

/**
 * Meant for updating fields of items (e.g. name, description)
 */
export async function PATCH(
    request: NextRequest,
    { params: { id, itemIndex, field } }: pathParams
) {
    if (!ItemClass.fields.includes(field))
        return new NextResponse('Invalid field', { status: 400 });
    const key = field as keyof ItemClass;
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;

    if (body.value === undefined)
        return new NextResponse('No value provided', { status: 400 });

    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });

    const item = category.items[itemIndex];
    if (item === undefined)
        return new NextResponse('Invalid item index', { status: 400 });

    try {
        item[key] = body.value ?? item[key];
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse(`Field ${key} successfully updated`, {
        status: 200,
    });
}
