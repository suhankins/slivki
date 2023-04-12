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
        await CategoryModel.create(body);
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully created', { status: 201 });
}
