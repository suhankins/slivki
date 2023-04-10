import { getFileName } from '@/utils/server/getFileName';
import { handleUploadQuery } from '@/utils/server/handleUploadQuery';
import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const HandledUploadQuery = await handleUploadQuery(request);
    if (HandledUploadQuery instanceof NextResponse) return HandledUploadQuery;
    const { itemIndex, filename, model } = HandledUploadQuery;
    if (filename === undefined)
        return new NextResponse('No filename provided', { status: 400 });

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(filename);

    if (!(await file.exists()))
        return new NextResponse('File does not exist', { status: 400 });

    if (!model.items)
        return new NextResponse('No items found', { status: 400 });

    const item = model.items[itemIndex];
    if (item.image !== undefined) {
        const parts = item.image.split('/');
        const filename =
            parts[parts.length - 1] === ''
                ? parts[parts.length - 2]
                : parts[parts.length - 1];
        bucket.file(filename).delete();
    }

    item.image = file.publicUrl();
    model.save();

    return new NextResponse('File confirmed', { status: 200 });
}
