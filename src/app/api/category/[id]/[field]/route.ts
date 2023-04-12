import { CategoryClass } from '@/models/Category';
import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '../getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';

export async function PATCH(
    request: NextRequest,
    { params: { id, field } }: { params: { id: string; field: string } }
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
        category[key] = body.value ?? category[key];
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse(`Field ${key} successfully updated`, {
        status: 200,
    });
}
