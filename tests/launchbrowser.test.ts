import { chromium } from 'playwright'


describe('Launch the browser', () => {

    test("Launch browser",async()=>{

       const browser = await chromium.launch({
        headless:false // we can directly give this property in playwright config.ts as well
       });
       const context =await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://letcode.in/");
      browser.close();
    });
    
});
