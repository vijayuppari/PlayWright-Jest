import { Page } from "playwright";

export class Header{

    private page:Page;

     public constructor(page:Page){
        this.page=page;
    }

    public get signinButton(){
       return  this.page.$("//a[normalize-space()='Log in']");
    }

    public get signOutButton(){
        return  this.page.$("//a[normalize-space()='Sign out']");
     }

     public async clickloginbutton(){
        const signin= await this.signinButton;
        await signin?.click();
     }

     public async clicklogoutbutton(){
        const signout= await this.signOutButton;
        await signout?.click();
     }



}