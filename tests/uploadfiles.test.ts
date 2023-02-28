import { chromium } from "playwright";

describe('Upload Files if tag is Input', () => {

    const fileupload1= './videos/Cooler Front.jpg';
    const fileupload2= './videos/Cooler Side.jpg'

    xtest("UploadMultiple files", async()=>{

        const browser = await chromium.launch({
            headless:false
           });
         const context =  await browser.newContext();
          const page = await context.newPage();
          await page.goto("https://www.sendgb.com/en/");
          await page.setInputFiles("//input[@name='qqfile']",[fileupload1,fileupload2]);
    })

    test("UploadMultiple files if there is no Input tag", async()=>{

        const browser = await chromium.launch({
            headless:false
           });
         const context =  await browser.newContext();
          const page = await context.newPage();
          await page.goto("https://the-internet.herokuapp.com/upload");

            page.on("filechooser", async(filechooser)=>{
                await filechooser.setFiles([fileupload1,fileupload2]);
           });
        await page.click("//div[@id='drag-drop-upload']");
    })
    
});

