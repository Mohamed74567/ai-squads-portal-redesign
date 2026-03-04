const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/home/z/my-project/download/screenshots';

// Create screenshots directory
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function takeScreenshots() {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport for desktop screenshots
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Wait for the page to be ready
  console.log('📱 Navigating to Dashboard...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Take Dashboard screenshot
  console.log('📸 Taking Dashboard screenshot...');
  await page.screenshot({
    path: path.join(screenshotDir, '01-dashboard.png'),
    fullPage: true
  });
  
  // Navigate to Bounties
  console.log('📱 Navigating to Bounties...');
  await page.evaluate(() => {
    const bountiesLink = document.querySelector('[class*="cursor-pointer"]') || 
                         Array.from(document.querySelectorAll('button')).find(btn => btn.textContent?.includes('Bounties'));
    if (bountiesLink) bountiesLink.click();
  });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(screenshotDir, '02-bounties.png'),
    fullPage: true
  });
  
  // Go back to dashboard and click Projects
  console.log('📱 Navigating to Projects...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const projectsBtn = buttons.find(btn => btn.textContent?.includes('Projects'));
    if (projectsBtn) projectsBtn.click();
  });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(screenshotDir, '03-projects.png'),
    fullPage: true
  });
  
  // Navigate to Squad
  console.log('📱 Navigating to Squad...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const squadBtn = buttons.find(btn => btn.textContent?.includes('Squad'));
    if (squadBtn) squadBtn.click();
  });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(screenshotDir, '04-squad.png'),
    fullPage: true
  });
  
  // Navigate to Profile
  console.log('📱 Navigating to Profile...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const profileBtn = buttons.find(btn => btn.textContent?.includes('Profile'));
    if (profileBtn) profileBtn.click();
  });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(screenshotDir, '05-profile.png'),
    fullPage: true
  });
  
  // Mobile view screenshot
  console.log('📱 Taking mobile screenshot...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(screenshotDir, '06-mobile.png'),
    fullPage: false
  });
  
  await browser.close();
  
  console.log('\n✅ Screenshots saved to /home/z/my-project/download/screenshots/');
  console.log('   - 01-dashboard.png');
  console.log('   - 02-bounties.png');
  console.log('   - 03-projects.png');
  console.log('   - 04-squad.png');
  console.log('   - 05-profile.png');
  console.log('   - 06-mobile.png');
}

takeScreenshots().catch(console.error);
