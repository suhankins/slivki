import { CategoryModel } from '@/models/Category';
import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

// I'm honestly surprised API routes can even be static
export const revalidate = 0;

/**
 * Route for getting list of all categories
 */
export async function GET() {
    const categories = await CategoryModel.find().populate('items');
    const response = new NextResponse(
        JSON.stringify(categories.map((category) => category.toJSON()))
    );
    response.headers.set('Content-Type', 'application/json');
    return response;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const category = await CategoryModel.create(body);

        // Moving everything up by 1
        await CategoryModel.updateMany(
            { _id: { $ne: category._id } },
            { $inc: { index: 1 } }
        ).exec();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully created', { status: 201 });
}
