const puppeteer = require('puppeteer');

const URL = 'https://hiwijaya.com';

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1680, height: 1050});
    await page.goto(URL, {waitUntil: 'networkidle0'});
    // await page.screenshot({path: 'screenshot.png'});

    console.log('crawling...');
    const posts = await page.evaluate(() => {
        try {
            let data = [];

            const allSelector = document.querySelectorAll('div.blog-item');
            for (let element of allSelector) {
                const post = {
                    title: element.querySelector('div.blog-title h3').innerHTML,
                    date: element.querySelector('div.blog-date h5').textContent.trim(),
                    desc: element.querySelector('div.blog-desc').innerHTML.trim()
                }
                data.push(post);
            }

            return data;
        } catch(error) {
            console.log(error.toString());
        }
    });

    
    await browser.close();

    for (var i = 0; i < posts.length; i++) {
        console.log(posts[i]);
    }

})();
