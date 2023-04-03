import { getFileName } from '@/lib/getFileName';
import { handleUploadQuery } from '@/lib/handleUploadQuery';
import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const HandledUploadQuery = await handleUploadQuery(request);
    if (HandledUploadQuery instanceof NextResponse) return HandledUploadQuery;
    const { id, itemIndex, filetype, model } = HandledUploadQuery;

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const fileName = getFileName(id.toString(), itemIndex, filetype);

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(fileName);

    if (!(await file.exists()))
        return new NextResponse('File does not exist', { status: 400 });

    if (model.items) model.items[itemIndex].picture = file.publicUrl();
    model.save();

    return new NextResponse('File confirmed', { status: 200 });
}
