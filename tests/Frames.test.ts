import { chromium, Browser,BrowserContext,Page } from "playwright";

describe('Handling Frames', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll( async() => {
        browser=  await chromium.launch({
            headless:false
        })
        context= await browser.newContext();
        page = await context.newPage();  
        await page.goto("https://letcode.in/frame");
        await page.waitForLoadState();
     });

     test('Single Frame Handling scenario',async()=>{
            const frame=  page.frame({name:"firstFr"});
           if(frame!=null){
         //const firstname=  await frame?.$("//input[@placeholder='Enter name']");
         //const lastname= await frame?.$("//input[@name='lname']");
         await frame.fill("//input[@placeholder='Enter name']","Vijay Kumar");
         await frame.fill("//input[@name='lname']", "Uppari");
       
      //await firstname?.fill("Vijay");
      //await lastname?.fill("Uppari");

      // Handling innerframes

            const Frames =frame?.childFrames();
      console.log("Total number of child frames are "+ Frames?.length);
      await Frames[1].fill("input[placeholder='Enter email']","venuuppari4b4@gmail.com");
      const parentframe =Frames[1].parentFrame();
       
      // Switch to parent window 
      await parentframe?.fill("//input[@placeholder='Enter name']","Sravani Alli");
    } else throw new Error ("No such frame exist ")

     });

     afterAll( async() => {
          await  browser.close();
           await  context.close();
           await  page.close();
     });


    
});