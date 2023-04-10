import { CategoryClass } from '@/models/Category';
import { findCategory } from '@/utils/server/findCategory';
import { getRequestJSONBody } from '@/utils/server/getRequestJSONBody';
import { DocumentType } from '@typegoose/typegoose';
import { NextRequest, NextResponse } from 'next/server';

export async function getBodyAndCategory(
    request: NextRequest,
    id: string
): Promise<[any, DocumentType<CategoryClass>] | NextResponse> {
    const body = await getRequestJSONBody(request);
    if (body instanceof NextResponse) return body;
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    return [body, category];
}
