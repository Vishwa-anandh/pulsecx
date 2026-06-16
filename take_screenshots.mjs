import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const routes = [
  { path: '/login', name: '01_login' },
  { path: '/', name: '02_executive_dashboard' },
  { path: '/operations', name: '03_operations_dashboard' },
  { path: '/engineering', name: '04_engineering_dashboard' },
  { path: '/journeys', name: '05_journey_catalog' },
  { path: '/journeys/create', name: '06_create_journey' },
  { path: '/journeys/builder', name: '07_journey_builder' },
  { path: '/monitoring', name: '08_monitoring_dashboard' },
  { path: '/incidents', name: '09_incident_center' },
  { path: '/alerts', name: '10_alerts_hub' },
  { path: '/api', name: '11_api_dashboard' },
  { path: '/ssl-dns', name: '12_ssldns_hub' },
  { path: '/mobile', name: '13_mobile_hub' },
  { path: '/analytics', name: '14_analytics_hub' },
  { path: '/administration/users', name: '15_administration_hub' },
  { path: '/settings/profile', name: '16_settings' },
  { path: '/setup', name: '17_setup_wizard' }
];

const screenshotsDir = 'd:/pulseCX/screenshots';
if (!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Going to login page...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(screenshotsDir, '01_login.png'), fullPage: true });
  console.log('Took screenshot: 01_login');

  console.log('Logging in...');
  await page.type('input[type="email"]', 'mark.bennet@pulsecx.com');
  await page.type('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  // Wait until we are redirected to the dashboard or at least not on the login page anymore
  await page.waitForFunction(() => !document.querySelector('input[type="email"]'), { timeout: 10000 });
  await new Promise(r => setTimeout(r, 2000));
  console.log('Logged in successfully.');

  for (const route of routes) {
    if (route.path === '/login') continue; // Already did login
    
    console.log(`Navigating to ${route.name} (${route.path})...`);
    // Use React Router's navigate exposed to window
    await page.evaluate((path) => {
      if (window.navigateRoute) {
        window.navigateRoute(path);
      } else {
        window.location.href = path; // fallback
      }
    }, route.path);
    
    await new Promise(r => setTimeout(r, 1500)); // Wait for any animations/charts to render
    
    const filePath = path.join(screenshotsDir, `${route.name}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Took screenshot: ${route.name}`);
  }

  await browser.close();
  console.log('Screenshots complete. They are saved in ' + screenshotsDir);
})();
