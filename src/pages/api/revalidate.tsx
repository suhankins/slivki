import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Revalidates main page. Must be in pages api folder.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await res.revalidate('/');
        return res.send('Revalidated');
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}
