import { CategoryModel } from '@/models/Category';
import { NextResponse } from 'next/server';

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
