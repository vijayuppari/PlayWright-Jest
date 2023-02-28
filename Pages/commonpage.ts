import { Page } from 'playwright';
export class Commonpage{
    private page:Page

    public constructor(page:Page){
            this.page = page;
    }

    toaster = async() => await this.page.waitForSelector("div[role='alertdialog']");

}