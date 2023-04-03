import { CategoryClass, CategoryModel } from '@/models/Category';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Finds a category while handling errors
 * @param request NextRequest
 * @param id id of the category
 * @returns [body, category] or NextResponse
 */
export async function findCategory(
    request: NextRequest,
    id: string
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
    let categoryId;
    try {
        categoryId = new mongoose.Types.ObjectId(id);
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
