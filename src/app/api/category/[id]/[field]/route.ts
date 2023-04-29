import { CategoryClass } from '@/models/Category';
import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '@/utils/server/getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';

type pathParams = { params: { id: string; field: string } };

export async function PATCH(
    request: NextRequest,
    { params: { id, field } }: pathParams
) {
    if (!CategoryClass.fields.includes(field))
        return new NextResponse('Invalid field', { status: 400 });
    const key = field as keyof CategoryClass;
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;

    if (body.value === undefined)
        return new NextResponse('No value provided', { status: 400 });

    try {
        if (typeof category[key] === 'number') body.value = +body.value;
        category[key] = body.value ?? category[key];
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse(`Field ${key} successfully updated`, {
        status: 200,
    });
}

/**
 * Meant for adding new items to arrays (e.g. sizes)
 */
export async function POST(
    request: NextRequest,
    { params: { id, field } }: pathParams
) {
    // Currently, this function is only meant for adding another category to sizes
    if (field !== 'sizes')
        return new NextResponse('Invalid field', { status: 400 });
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;

    if (body.value === undefined)
        return new NextResponse('No value provided', { status: 400 });

    if (category.sizes === undefined) category.sizes = [];
    category.sizes.push(body.value);
    category.items?.forEach((item) => item.price.push(null));

    try {
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse(`Successfully added another item to ${field}`, {
        status: 200,
    });
}
