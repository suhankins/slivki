import {
    GenerateSignedPostPolicyV4Options,
    SignedPostPolicyV4Output,
    Storage,
} from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SignedPostPolicyV4Output | string | void>
) {
    const { method, query } = req;
    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }

    if (
        typeof query.id !== 'string' ||
        query.id.length === 0 ||
        typeof query.filetype !== 'string' ||
        (query.filetype !== 'png' && query.filetype !== 'jpg')
    ) {
        res.status(400).send();
        return;
    }

    const id = query.id;
    // TODO: Uncomment this when we have ItemModel
    /*const model = await ItemModel.findById(id);
    if (model === null || model === undefined) {
        res.status(400).send();
        return;
    }*/

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(`${query.id}${query.filetype}`);
    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + 1 * 60 * 1000,
        fields: { 'x-goog-meta-test': 'data' },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json(response);
}
