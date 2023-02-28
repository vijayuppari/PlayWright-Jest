import { Commonpage } from './../../Pages/commonpage';
import { LoginPage } from './../../Pages/loginpage';
import { ENV } from './../../Utils/environment';
import { Page } from 'playwright';
import { BrowserContext } from 'playwright';
import { Browser,chromium } from 'playwright';
import { Header } from '../../Pages/headerpage';
import * as data from "../../data/logintestdata.json";
describe('Login Test case', () => {

        let browser: Browser;
        let context: BrowserContext;
        let page: Page;

        let header: Header;
        let login: LoginPage;
        let common: Commonpage;
    
    beforeEach(async () => {
        browser =await chromium.launch({
            headless: false
        });
       context= await browser.newContext();
       page = await context.newPage();
       
       header = new Header(page);
       login = new LoginPage(page);
       common = new Commonpage(page);

     
    });

    test('login with valid credentials', async () => {
          await page.goto(ENV.test);
          await page.waitForLoadState();
          await header.clickloginbutton();
          await login.LogintoApp("venuuppari4b4@gmail.com","Vijay@123",page);
        
        // Capture the Toast message

      const captoaster= await common.toaster();
      expect(await captoaster?.textContent()).toContain("Welcome");
    
      await header.clicklogoutbutton();

    });
    test('login with valid credentials using Json data', async () => {
        await page.goto(ENV.test);
        await page.waitForLoadState();
        await header.clickloginbutton();
        await login.LogintoApp(data.username,data.password,page);
      
      // Capture the Toast message

    const captoaster= await common.toaster();
    expect(await captoaster?.textContent()).toContain("Welcome");
  
    await header.clicklogoutbutton();

  });

    afterEach(async()=>{
        browser.close();
        context.close();
        page.close();
    });

});