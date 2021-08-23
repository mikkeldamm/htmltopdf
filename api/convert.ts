import { VercelRequest, VercelResponse } from '@vercel/node';

import { getPageRendered } from './_utils/browser';

const handler = async (req: VercelRequest, res: VercelResponse) => {

	try {

        const { asBuffer } = req.query;
        const body = req.body as string;
        if (!body) {
            res.status(400);
            res.send('No body html included');
            return;
        }

		const { page, browser } = await getPageRendered({
            content: body,
        });

        const buffer = await page.pdf({
            format: "letter",
            printBackground: true,
        });

		await page.close();
        await browser.close();

        if (asBuffer === 'true') {
            res.setHeader('Content-Type', 'application/pdf');
        } else {
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Content-Length', buffer.toString().length);
            res.setHeader('Content-Type', 'application/octet-stream');
        }
        
        res.send(buffer);

	} catch (err) {

		console.log('Error converting', err);

		res.status(500);
		res.end();
	}
};

export default handler;