import { getFileName } from '@/lib/getFileName';
import { handleUploadQuery } from '@/lib/handleUploadQuery';
import {
    GenerateSignedPostPolicyV4Options,
    Storage,
} from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const HandledUploadQuery = await handleUploadQuery(request);
    if (HandledUploadQuery instanceof NextResponse) return HandledUploadQuery;
    const { id, itemIndex, filetype } = HandledUploadQuery;

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(getFileName(id.toString(), itemIndex, filetype));
    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + 60 * 1000, // 1 minute
        conditions: [
            ['content-length-range', 0, 2_000_000], // 2 MB limit
        ],
        fields: {
            'x-goog-meta-test': 'data',
        },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    return NextResponse.json(response, { status: 200 });
}
