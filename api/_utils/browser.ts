import chrome from 'chrome-aws-lambda';

interface PageOptions {
    content?: string;
}

export const getPageRendered = async ({ content }: PageOptions) => {

    if (!content) {
        return null;
    }

    const browser = await chrome.puppeteer.launch({
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
    });

    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.setContent(content, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(1000);

    return { page, browser };
};
