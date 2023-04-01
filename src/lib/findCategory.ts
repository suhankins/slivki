import { CategoryClass, CategoryModel } from '@/models/Category';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Finds a category while handling errors
 * @param request NextRequest
 * @param id Optional id of the category. Otherwise, it will be taken from the request body
 * @returns [body, category] or NextResponse
 */
export async function findCategory(
    request: NextRequest,
    id?: string
): Promise<[any, DocumentType<CategoryClass>] | NextResponse> {
    // Safety precautions in case of invalid JSON
    let body;
    try {
        body = await request.json();
    } catch (e) {
        if (e instanceof SyntaxError)
            return new NextResponse('Invalid JSON', {
                status: 400,
            });
        else return new NextResponse('Unknown error', { status: 500 });
    }

    // Safety precautions in case of invalid categoryId
    if (!body.categoryId && !id)
        return new NextResponse('categoryId is not specified', {
            status: 400,
        });
    let categoryId;
    try {
        if (id) categoryId = new mongoose.Types.ObjectId(id);
        else categoryId = new mongoose.Types.ObjectId(body.categoryId);
    } catch (e) {
        return new NextResponse('Invalid categoryId', {
            status: 400,
        });
    }

    // Safety precautions in case of invalid category
    const category = await CategoryModel.findById(categoryId);
    if (category === null)
        return new NextResponse('Category not found', {
            status: 404,
        });
    return [body, category];
}
