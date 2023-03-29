import { Storage } from '@google-cloud/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<void>
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
        typeof query.type !== 'string' ||
        typeof query.filetype !== 'string' ||
        (query.filetype !== 'png' && query.filetype !== 'jpg')
    ) {
        res.status(400).send();
        return;
    }

    const id = query.id;
    // TODO: Uncomment this when we have ItemModel
    /*
    const model = await ItemModel.findById(id);
    if (model === null || model === undefined) {
        res.status(400).send();
        return;
    }
    */

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const fileName = `${query.id}${query.filetype}`;

    const bucket = storage.bucket(process.env.BUCKET_NAME as string);
    const file = bucket.file(fileName);

    if (!(await file.exists())) {
        res.status(400).send();
        return;
    }

    // TODO: Uncomment this when we have ItemModel
    /*
    model.image = file.publicUrl();
    model.save();
    */

    res.status(200).send();
}
