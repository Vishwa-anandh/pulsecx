import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, 'screenshots');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('Going to login page...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  
  console.log('Logging in...');
  await page.type('input[type="email"]', 'mark.bennet@pulsecx.com');
  await page.type('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  await page.waitForFunction(() => {
    return !document.querySelector('input[type="email"]');
  }, { timeout: 10000 });
  
  await new Promise(r => setTimeout(r, 2000));
  console.log('Logged in successfully.');

  // 1. AI Chat Bot
  console.log('Opening AI Chatbot...');
  await page.evaluate(() => {
    if (window.setIsChatOpenGlobal) window.setIsChatOpenGlobal(true);
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, '18_ai_chatbot.png') });
  console.log('Captured AI Chatbot');

  // Close chatbot
  await page.evaluate(() => {
    if (window.setIsChatOpenGlobal) window.setIsChatOpenGlobal(false);
  });
  await new Promise(r => setTimeout(r, 1000));

  // 2. Create Journey Flow
  console.log('Going to Create Journey...');
  await page.evaluate(() => window.navigateRoute('/journeys/create'));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, '19_create_journey.png') });
  console.log('Captured Create Journey');

  // Open Template Modal
  console.log('Opening Template Modal...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Start from Template'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '20_create_journey_template_modal.png') });
  console.log('Captured Template Modal');

  // Go to Journey Builder
  console.log('Going to Journey Builder...');
  await page.evaluate(() => window.navigateRoute('/journeys/builder'));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(screenshotsDir, '21_journey_builder.png') });
  console.log('Captured Journey Builder');

  // 3. Setup Wizard Flow
  console.log('Triggering Setup Wizard...');
  await page.evaluate(() => window.navigateRoute('/')); // Go back to dashboard first
  await new Promise(r => setTimeout(r, 1000));
  
  // Trigger new user state
  await page.evaluate(() => {
    if (window.setCurrentUserGlobal) {
      window.setCurrentUserGlobal({ 
        name: 'New User', 
        email: 'new@pulsecx.com', 
        isDemo: true, 
        isNewUser: true 
      });
    }
  });
  await new Promise(r => setTimeout(r, 1500)); // Wait for wizard to mount

  const numSteps = 11;
  for (let i = 1; i <= numSteps; i++) {
    console.log(`Capturing Setup Wizard Step ${i}...`);
    await page.evaluate((step) => {
      if (window.setCurrentStepGlobal) window.setCurrentStepGlobal(step);
    }, i);
    await new Promise(r => setTimeout(r, 1500)); // Wait for animations
    await page.screenshot({ path: path.join(screenshotsDir, `22_setup_wizard_step_${i}.png`) });
    console.log(`Captured Setup Wizard Step ${i}`);
  }

  console.log('Done!');
  await browser.close();
})();
