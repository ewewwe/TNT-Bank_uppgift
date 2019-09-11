let { $, sleep } = require('./funcs');

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
      await ares.startTests();
      await ares.startModule({
        moduleName: 'transfer between accounts',
        totalTests: 1
      });

      await helpers.loadPage('http' + '://localhost:3000');
    });
  
    this.Given(/^I press on login and enter my login information$/, async function () {
      await driver.findElement(By.css("button[type='button']")).click();
      await sleep(2000);
      await driver.findElement(By.css("input[type='text']")).sendKeys("Sara");
      await driver.findElement(By.css("input[type='password']")).sendKeys("85hh64");
      await driver.findElement(By.css("button[type='submit']")).click();
    });
  
    this.When(/^I transfer 100kr to another account$/,  async function () {
      let transferButton = await $('body > main > div > aside > nav > ul > li:nth-child(5) > button > a');
      await transferButton.click();
      await sleep(1500);
      let typeButton = await $('#accountTypes > label:nth-child(3) > input[type=radio]');
      await typeButton.click();
      await sleep(500);
      let accountInput = await $('#toAccountNumber');
      await accountInput.sendKeys("6671-898121");
      await sleep(500);
      let amountInput = await $('#sum');
      await amountInput.sendKeys("100");
      await sleep(500);
      let messageInput = await $('#label');
      await messageInput.sendKeys("Test 100");
      await sleep(500);
      let submitButton = await $('body > main > div > article > form > button');
      await submitButton.click();
      await sleep(500);
      driver.switchTo().alert().accept();
      await sleep(500);
      //let startEnter = await $('body > main > div > aside > nav > ul > li:nth-child(1) > button');
      //await startEnter.sendKeys(Keys.Return);
      await sleep(1000);
      let logoutButton = await $('body > main > div > aside > nav > ul > li:nth-child(7) > button > a');
      await logoutButton.click();
      let loginButton = await $('body > main > div > aside > nav > ul > li:nth-child(2) > button > a');
      await loginButton.click();
    });

      this.Then(/^the recipient account should recieve 100kr$/,  async function () {
      await driver.findElement(By.css("button[type='button']")).click();
      await driver.findElement(By.css("input[type='text']")).sendKeys("Anna");
      await driver.findElement(By.css("input[type='password']")).sendKeys("ANNA123");
      await driver.findElement(By.css("button[type='submit']")).click();
      await sleep (1000);
      
      let myAccountsButton = await $('body > main > div > aside > nav > ul > li:nth-child(4) > button > a');
      await myAccountsButton.click();
      await sleep(500);
      
      let balance = false;
      let accountBalanceCheck = await $('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(3) > td.text-right');
      let text = await accountBalanceCheck.getText();
      if(text === 100);
      balance = true;
      
      await ares.testResult({
        moduleName: 'transfer between accounts',
        title: 'transfer between accounts',
        passed: (balance === true),
        errorMessage: 'Pengarna finns inte på mottagarens konto',
        testBrowser: 'Chrome'
      });

      await ares.endModule({
        moduleName: 'transfer between accounts',
      });

      await ares.endTests();

      await sleep(1000);
      let logoutButton1 = await $('body > main > div > aside > nav > ul > li:nth-child(7) > button > a');
      await logoutButton1.click();
      
    });
  }
  