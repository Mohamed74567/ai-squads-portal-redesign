const puppeteer = require('puppeteer');
const fs = require('fs');

const screenshotDir = '/home/z/my-project/download/screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const pages = [
  { url: 'http://localhost:3000', name: 'dashboard', label: 'Dashboard' },
  { url: 'http://localhost:3000', name: 'bounties', label: 'Bounties', click: 'Bounties' },
  { url: 'http://localhost:3000', name: 'projects', label: 'Projects', click: 'Projects' },
  { url: 'http://localhost:3000', name: 'squad', label: 'Squad', click: 'Squad' },
  { url: 'http://localhost:3000', name: 'profile', label: 'Profile', click: 'Profile' },
];

(async () => {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    console.log(`📸 Taking ${pageInfo.label} screenshot...`);
    
    try {
      await page.goto(pageInfo.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 2000));
      
      if (pageInfo.click) {
        // Click the navigation button
        const clicked = await page.evaluate((label) => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const btn = buttons.find(b => b.textContent?.includes(label));
          if (btn) { btn.click(); return true; }
          return false;
        }, pageInfo.click);
        
        if (clicked) {
          await new Promise(r => setTimeout(r, 2000));
        }
      }
      
      await page.screenshot({ 
        path: `${screenshotDir}/${pageInfo.name}.png`,
        fullPage: true 
      });
      console.log(`   ✅ ${pageInfo.name}.png saved`);
      
    } catch (error) {
      console.log(`   ❌ Error with ${pageInfo.label}: ${error.message}`);
    }
  }
  
  // Mobile screenshot
  console.log('📱 Taking mobile screenshot...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: `${screenshotDir}/mobile.png` });
  console.log('   ✅ mobile.png saved');
  
  await browser.close();
  console.log('\n🎉 All screenshots complete!');
})();
