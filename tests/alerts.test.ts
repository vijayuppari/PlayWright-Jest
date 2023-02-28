import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("Handle Alerts",() => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page

    beforeAll(async()=>{

         browser =await chromium.launch({
            headless: false
        });
       context= await browser.newContext();
       page = await context.newPage();
      await page.goto("https://letcode.in/alert");
    });
    
   test("Handle Prompt Alerts",async() => {
    
    const promptbuton=  await page.$("//button[@id='prompt']");

    page.on("dialog",(dialog)=>{
      console.log("Message of Dialog Box " + dialog.message());
      console.log("Default Message of Dialog Box " + dialog.defaultValue());    
      console.log("type of Dialog Box " + dialog.type());  
      dialog.accept("Vijay kumar uppari");
    });

    await promptbuton?.click();
     
   }); 

   afterAll(async() => {
    await page.close();
    await context.close();
    await browser.close();
   });

});