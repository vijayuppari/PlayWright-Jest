import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("All Keyboard Operations",() => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page

    beforeAll(async()=>{

         browser =await chromium.launch({
            headless: false
        });
       context= await browser.newContext();
       page = await context.newPage();
      await page.goto("https://letcode.in/edit");
    });
    
   test("Different input box operations",async() => {
    
        await page.fill("//input[@id='fullName']","Vijay Kumar Uppari");
       const appendtext = await page.$("//input[@id='join']");
       await appendtext?.focus();
       await page.keyboard.press("End");
       await appendtext?.type("Person");
     const gettext = await page.getAttribute("//input[@id='getMe']","value");
     console.log("Text captured as  " + gettext);
     
   }); 

   afterAll(async() => {
    await page.close();
    await context.close();
    await browser.close();
   });

});