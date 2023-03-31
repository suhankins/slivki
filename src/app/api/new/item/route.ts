import { handleDbError } from '@/lib/handleDbError';
import { CategoryModel } from '@/models/Category';
import { mongoose } from '@typegoose/typegoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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
    if (!body.categoryId)
        return new NextResponse('categoryId is not specified', {
            status: 400,
        });
    let categoryId;
    try {
        categoryId = new mongoose.Types.ObjectId(body.categoryId);
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

    // Validating schema
    try {
        category.items?.push(body);
        await category.save();
    } catch (e) {
        // Realistaclly, when user is creating a new item using the form,
        // this should be the only type of error that can occur.
        return handleDbError(e);
    }
    return new NextResponse('Item successfully created', { status: 201 });
}
