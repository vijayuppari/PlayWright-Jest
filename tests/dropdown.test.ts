import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("Dropdown Handles",() => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page

    beforeAll(async()=>{

         browser =await chromium.launch({
            headless: false
        });
       context= await browser.newContext();
       page = await context.newPage();
      await page.goto("https://letcode.in/dropdowns");
      await page.waitForLoadState();
    });
    
   xtest("Handle Dropdowns",async() => {

     const fruitsdropdown=  await page.$("//select[@id='fruits']");
    await fruitsdropdown?.selectOption("2");
    const fruit =await page.$("//div[@class='notification is-success']");
    if(fruit){
      expect(await fruit.textContent()).toContain("Orange");
    }
   }); 

   xtest("Handle Multi Dropdowns",async() => {

   const heros=   await page.$("//select[@id='superheros']");
   heros?.selectOption([
    {label: "Aquaman"}, {value: "bt"},{index:7}
   ])
  }); 

  xtest("Count of the Select drop down", async()=>{

    const lang = await page.$$("//select[@id='lang']");
    console.log("Total number of options in the drop down " + lang.length);
  
  });

  test("Capture the text from dropdown", async()=>{

    const selectcuntry =await page.selectOption("//select[@id='country']","India");
    
    const country =  await page.$eval<string,HTMLSelectElement>("//select[@id='country']",ele=>ele.value);
    console.log("Captured text from drop down " + country);
    expect(country).toBe("India");
  
  });

   afterAll(async() => {
    await page.close();
    await context.close();
    await browser.close();
   });

});
