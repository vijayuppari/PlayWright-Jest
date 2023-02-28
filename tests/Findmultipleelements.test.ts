import { chromium, Browser,BrowserContext,Page } from 'playwright';

describe('Get all the dynamic Elements Text', () => {

    let browser:Browser;
    let context:BrowserContext;
    let page: Page;

    beforeAll(async () => {
        browser =await chromium.launch({
            headless:false
        });
      context=  await browser.newContext();
      page =await context.newPage();
      await page.goto("https://letcode.in/elements");
      await page.waitForLoadState();

    });

    test('Click on Seach button',async ()=>{
        const gitrepotextbox= await page.$("//input[@name='username']");
        gitrepotextbox?.screenshot({path:'gitrepotextbox.png'});
       await  gitrepotextbox?.fill("ortonikc");
       const searchbutton =await page.$("//*[@id='search']");
       await searchbutton?.click();
    });

    test('Elements Printing ', async() => {
        const gitrepotextbox= await page.$("//input[@name='username']");
        await  gitrepotextbox?.fill("ortonikc");
        const searchbutton =await page.$("//*[@id='search']");
        await searchbutton?.click();
        await page.waitForSelector("app-gitrepos ol li",{timeout:5000});
        const repos =await page.$$("app-gitrepos ol li");
        console.log("Total Number of Repos are: " + repos.length);

         // Print the git repo urls using map

        //  for await (const repo of repos){
        //      console.log("name of the Repo is: " + await  repo.innerText());
        //  }

        // Print the git repo urls using map

            const allurls =await Promise.all(repos.map(async(repo,i)=>{
                 return  await repo.innerText();
             }));
             console.log(allurls);
             await page.screenshot({path:Date.now()+'screenshot.png',fullPage:true})
    });

    afterEach(async()=>{
        await page.screenshot({path:Date.now()+'screensht.png'});
    });

    afterAll(async () => {

        await browser.close()
        await page.close();
        await context.close();
    });
    
});