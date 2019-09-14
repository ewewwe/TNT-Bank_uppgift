let {$, sleep} = require('./funcs');

const ares = require('ares-helper'); // laddar in ares helper
ares.debug = true; // vi får debug info
ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares
  "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njc5Mzc0MTUsImVtYWlsIjoiZGlhbmFAc2htb25kcmFrLnNlIiwiaWF0IjoxNTY3ODUxMDE1fQ.cTqGi6obIjl3uHSft4kzX4fA3DtTJeKCNqeg9lrJdEA",
  "workspaceName": "outlook_default",
  "projectKey": "5d70bb183e47305847483f78",
  "projectName": "swedenbank"
});

module.exports = function(){

    this.Given(/^that I visit the bank site$/, async function () {
      await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
      
      await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
        moduleName: 'skicka pengar',
        totalTests: 2
      });

        await helpers.loadPage('http' + '://localhost:3000');
      });
    
    this.Given(/^I press on login$/, async function () {
        await driver.findElement(By.css("button[type='button']")).click(); 
      });
    
    this.When(/^I enter my information$/, async function () {
        await sleep(2000);
        await driver.findElement(By.css("input[type='text']")).sendKeys("Uffe");
        await driver.findElement(By.css("input[type='password']")).sendKeys("Kingen");
        await sleep(2000);
      });
    
    this.Given(/^Press the login button$/, async function () {
        await driver.findElement(By.css("button.btn:nth-child(4)")).click();
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
      });

      this.Then(/^the money should be sent$/, async function () {
      });

      this.Given(/^that I press Start$/, async function () {
        await driver.findElement(By.css("a[href='#start']")).click();
      });
      
      this.Then(/^I should be able to see my transaktion$/, async function () {
        let result = await driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th[2]")).getText();
        
        await ares.testResult({ // skicka resultatet till testrapporten
          moduleName: 'skicka pengar',
          title: 'Syns transaktionen',
          passed: (result==="Test"), // HÄR skickar jag in mitt resultat ifrån t ex Selenium
          errorMessage: 'Den skall synas'
        });

        assert.equal(result,"Test", "[Passed]")
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
        let t = null;
        
        t = await driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th[2]")).getText()

        await ares.testResult({ // skicka resultatet till testrapporten
          moduleName: 'skicka pengar',
          title: 'Syns transaktionen hos motagare',
          passed: (t === "Test 100"), // HÄR skickar jag in mitt resultat ifrån t ex Selenium
          errorMessage: 'Det skall synas',
          testBrowser: "Chrome",
          failType: "Funktion saknas"
        });  
        await ares.endModule({ // avslutar vi denna testrapport
        moduleName: 'skicka pengar',
        });
      
        await ares.endTests();  // avslutar hela ares
        
        assert.equal(t,"Test 100", "[Passed]")

      });

     

}