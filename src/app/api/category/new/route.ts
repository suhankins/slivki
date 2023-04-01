import { handleDbError } from '@/lib/handleDbError';
import { CategoryModel } from '@/models/Category';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        await CategoryModel.create(body);
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse('Category successfully created', { status: 201 });
}
