import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', 'mark.bennet@pulsecx.com');
  await page.type('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => !document.querySelector('input[type="email"]'), { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => { window.navigateRoute('/administration'); });
  await new Promise(r => setTimeout(r, 1000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Page Text:', text);
  
  await browser.close();
})();
