import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("Handle Windows Handling",() => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page

    beforeAll(async()=>{

         browser =await chromium.launch({
            headless: false
        });
       context= await browser.newContext();
       page = await context.newPage();
      await page.goto("https://letcode.in/windows");
    });
    
   test("Handle Single window Handle",async() => {
    const windowbutton=  await page.$("//button[@id='home']");

        const [handle] = await Promise.all([
            context.waitForEvent("page"),
            await windowbutton?.click()
        ]);
        expect(handle.url()).toContain("test");
        await page.bringToFront();
        await page.click("//img[@alt='letcode']");
   }); 

   test("Handle Multi window handles",async() => {
    const multiwindow=  await page.$("//button[@id='multi']");

        const [multihandle] = await Promise.all([
            context.waitForEvent("page"),
            await multiwindow?.click()
        ])
        await multihandle.waitForLoadState();
       const totalpages= multihandle.context().pages();
       console.log("Total pages opened " + totalpages.length);
       totalpages.forEach(page =>{
        console.log("Page url is " + page.url());
        
       })
    
       totalpages[1].on("dialog",(dialog)=>{
        console.log("Dialog message is " + dialog.message());
        dialog.accept()
       })
       await totalpages[1].bringToFront();
   await totalpages[1].click("//button[@id='accept']");
  })

   afterAll(async() => {
    await page.close();
    await context.close();
    await browser.close();
   });

});