import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Revalidates main page. Must be in pages api folder.
 */
export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    if (process.env.NODE_ENV === 'development')
        return res
            .status(200)
            .send(
                "Can't revalidate in development mode\nhttps://github.com/vercel/next.js/issues/43132"
            );
    try {
        await res.revalidate('/en/');
        await res.revalidate('/ru/');
    } catch (e) {
        if (e instanceof Error)
            return res
                .status(500)
                .send(`Error during revalidation: ${e.message}`);
        return res.status(500).send('Unknown error during revalidation');
    }

    return res.send('Revalidated');
}
