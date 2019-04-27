let {$, sleep} = require('./funcs');

module.exports = function(){

    this.Given(/^that I visit the bank site$/, async function () {
        await helpers.loadPage('http' + '://localhost:3000');
      });
    
    this.Given(/^I press on login$/, async function () {
        await driver.findElement(By.css("button[type='button']")).click(); 
      });
    
    this.When(/^I enter my information$/, async function () {
        await driver.findElement(By.css("input[type='text']")).sendKeys("Uffe");
        await driver.findElement(By.css("input[type='password']")).sendKeys("Kingen");
      });
    
    this.Given(/^Press the login button$/, async function () {
        await driver.findElement(By.css("button[type='submit']")).click();
      });
    
    this.Then(/^I should log into my account$/,  async function () {
      });

    this.Given(/^that I press Överföringar andra konton$/, async function () {
        await driver.findElement(By.css("a[href='#transfer']")).click();
      });
    
    this.Given(/^that I chose Annat konto$/, async function () {
        await driver.findElement(By.css("input[value='ta']")).click();
      });

    this.Given(/^that I enter account number$/, async function () {
        await driver.findElement(By.css("input[id='toAccountNumber']")).sendKeys("6981-861418");
      });
     
    this.Given(/^that I enter amount of money that are less than my max transfer amount$/, async function () {
        await driver.findElement(By.css("input[id='sum']")).sendKeys("5000");
      });

      this.Given(/^that I enter Test as a message$/, async function () {
        await driver.findElement(By.css("input[id='label']")).sendKeys("Test");
      });

      this.Given(/^I press Utför$/, async function () {
        await driver.findElement(By.css("button[type='submit']")).click();
      });

      this.Given(/^I accept the pop\-up$/, async function () {
        await driver.switchTo().alert().accept();
        //await sleep(10000);
      });

      this.Then(/^the money should be sent$/, async function () {
      });

      this.Given(/^that I press Start$/, async function () {
        await driver.findElement(By.css("a[href='#start']")).click();
      });
      
      this.Then(/^I should be able to see my transaktion$/, async function () {
        assert.equal(await driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th[2]")).getText(),"Test", "[Passed]");
      });

      this.Given(/^that I press Logga ut$/, async function () {
        await driver.findElement(By.css("a[href='#logout']")).click();
      });

      this.Given(/^that I press Logga in$/, async function () {
        await driver.findElement(By.css("button[type='button']")).click(); 
      });

      this.When(/^I enter the recipents information$/, async function () {
        await driver.findElement(By.css("input[type='text']")).sendKeys("Sara");
        await driver.findElement(By.css("input[type='password']")).sendKeys("85hh64");
      });

      this.Then(/^I should log into the recipents account$/, async function () {
      });

      this.Given(/^that I press the Start button$/, async function () {
        await driver.findElement(By.css("a[href='#start']")).click();
      });
      
      this.Then(/^I should be able to see the recipents transaktion$/, async function () {
        assert.equal(await driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th[2]")).getText(),"Test", "[Passed]");
      });
}