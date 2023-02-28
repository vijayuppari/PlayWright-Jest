import { chromium } from "playwright";

describe('Name of the group', () => {

    test("some",async()=>{

        const browser = await chromium.launch({
            headless:false
           });
           const context =await browser.newContext({
                recordVideo:{
                    dir:"./videos"
                }
           });
          const page = await context.newPage();
          await page.goto("https://letcode.in/");
          await page.click("//a[normalize-space()='Log in']");
          await page.fill("//input[@name='email']","venuuppari4b4@gmail.com");
          await page.fill("//input[@placeholder='Enter password']","Vijay@123");
          await page.click("//button[normalize-space()='LOGIN']");  
         await page.click("//a[normalize-space()='Sign out']");
         await  browser.close();
        });    
});