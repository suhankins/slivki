import { googleStorage } from '@/lib/googleStorage';
import { handleUploadQuery } from '@/utils/server/handleUploadQuery';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const HandledUploadQuery = await handleUploadQuery(request);
    if (HandledUploadQuery instanceof NextResponse) return HandledUploadQuery;
    const { itemIndex, filename, model } = HandledUploadQuery;
    if (filename === undefined)
        return new NextResponse('No filename provided', { status: 400 });

    const file = googleStorage.file(filename);

    if (!(await file.exists()))
        return new NextResponse('File does not exist', { status: 400 });

    if (!model.items)
        return new NextResponse('No items found', { status: 400 });

    const item = model.items[itemIndex];
    if (item.image !== undefined && item.image !== '' && item.image !== null) {
        const parts = item.image.split('/');
        const filename =
            parts[parts.length - 1] === ''
                ? parts[parts.length - 2]
                : parts[parts.length - 1];
        googleStorage.file(filename).delete();
    }

    item.image = file.publicUrl();
    model.save();

    return new NextResponse('File confirmed', { status: 200 });
}
