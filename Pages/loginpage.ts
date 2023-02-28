import { Page } from "playwright";

export class LoginPage{

    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    public get eleusername(){
        return this.page.$("//input[@name='email']");
    }

    public get elepassword(){
        return this.page.$("//input[@placeholder='Enter password']");
    }

    // public get eleloginbutton(){
    //     return this.page.$("//button[normalize-space()='LOGIN']");
    // } // OR

    eleloginbutton =  async ()=> await this.page.$("//button[normalize-space()='LOGIN']");

    public async enterusername(name:string){
        const elename= await this.eleusername;
        if(elename!=null){
          await  elename.fill(name)}
          else {throw new Error("No Such Element found")}; // If we write like this then it will check null
    }

        

    public async enterpassword(password:string){
        const elepass= await this.elepassword;
       await  elepass?.fill(password);
    }

    public async clickLoginbutton(){
        const elebutton= await this.eleloginbutton();
       await elebutton?.click();
    }

    // Another way to write funtion for page object

    

    public async LogintoApp(user:string, password:string, page:Page){
         await this.enterusername(user);
          await this.enterpassword(password);
          await this.clickLoginbutton();
          await page.waitForLoadState();
    }

}