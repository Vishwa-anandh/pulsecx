import puppeteer from 'puppeteer';

(async () => {
  const artifactDir = 'C:\\\\Users\\\\vishw\\\\.gemini\\\\antigravity-ide\\\\brain\\\\c4fb94b6-1c0a-4216-8861-99169cbc0041';
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to login...');
  await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle0' });
  
  console.log('Logging in...');
  await page.type('input[type="email"]', 'mark.bennet@pulsecx.com');
  await page.type('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  // Wait a bit for the react router navigation to happen
  await new Promise(r => setTimeout(r, 2000));
  console.log('Logged in successfully.');

  const pages = [
    { route: '/administration/teams', name: 'team_management.png' },
    { route: '/administration/integrations', name: 'integrations.png' },
    { route: '/administration/agents', name: 'agents.png' },
    { route: '/administration/audit', name: 'audit_log.png' }
  ];

  for (const p of pages) {
    console.log(`Navigating to ${p.route}...`);
    await page.evaluate((r) => window.navigateRoute(r), p.route);
    
    // Give it a delay for the page to render completely
    await new Promise(r => setTimeout(r, 2000));
    
    await page.screenshot({ path: `${artifactDir}\\\\${p.name}` });
    console.log(`Saved ${p.name}`);
  }

  await browser.close();
  console.log('Done.');
})();
