import { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (_req: VercelRequest, res: VercelResponse) => {

    res.status(200);
    res.send({ message: 'API is working!' });
};

export default handler;