import { NextRequest, NextResponse } from 'next/server';
import { allowedImageTypes } from '../lib/allowedImageTypes';
import { mongoose } from '@typegoose/typegoose';
import { CategoryClass, CategoryModel } from '@/models/Category';

export interface HandledUploadQuery {
    filetype: string;
    id: mongoose.Types.ObjectId;
    itemIndex: number;
    model: mongoose.Document & CategoryClass;
}

/**
 * Handles the query parameters for the upload and confirmUpload routes
 * @returns
 * If the query parameters are invalid, returns a NextResponse with the error message.
 * Otherwise, returns an object with the filetype, id, itemIndex, and model.
 */
export async function handleUploadQuery(
    request: NextRequest
): Promise<NextResponse | HandledUploadQuery> {
    const query = request.nextUrl.searchParams;

    const filetype = query.get('filetype');
    if (filetype === null || !allowedImageTypes.includes(filetype))
        return new NextResponse('No filetype provided', { status: 400 });

    let id: null | string | mongoose.Types.ObjectId = query.get('id');
    if (id === null || id.length === 0)
        return new NextResponse('No category id provided', { status: 400 });
    try {
        id = new mongoose.Types.ObjectId(id);
    } catch (e) {
        return new NextResponse('Bad category id provided', { status: 400 });
    }

    const model = await CategoryModel.findById(id);
    if (model === null || model === undefined)
        return new NextResponse('Category does not exist', { status: 400 });

    let itemIndex: string | null | number = query.get('itemIndex');
    if (itemIndex === null || itemIndex.length === 0)
        return new NextResponse('No itemIndex provided', { status: 400 });

    itemIndex = parseInt(itemIndex);
    if (
        isNaN(itemIndex) ||
        model.items === undefined ||
        itemIndex < 0 ||
        itemIndex > model.items.length
    )
        return new NextResponse('Bad itemIndex provided', { status: 400 });

    return { filetype: filetype, id: id, itemIndex: itemIndex, model: model };
}
