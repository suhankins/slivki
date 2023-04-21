import 'server-only';
import { CategoryClass, CategoryModel } from '@/models/Category';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import { NextResponse } from 'next/server';

/**
 * Finds a category while handling errors
 * @param id id of the category
 */
export async function findCategory(
    id: string
): Promise<DocumentType<CategoryClass> | NextResponse> {
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
    return category;
}
