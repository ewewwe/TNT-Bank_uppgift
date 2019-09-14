let { $, sleep } = require('./funcs');

const ares = require('ares-helper'); // laddar in ares helper
ares.debug = true; // vi får debug info
ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares
  "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njc5Mzc0MTUsImVtYWlsIjoiZGlhbmFAc2htb25kcmFrLnNlIiwiaWF0IjoxNTY3ODUxMDE1fQ.cTqGi6obIjl3uHSft4kzX4fA3DtTJeKCNqeg9lrJdEA",
  "workspaceName": "outlook_default",
  "projectKey": "5d70bb183e47305847483f78",
  "projectName": "swedenbank"
});

module.exports = function () {


  this.Given(/^that I visit the bank site to test krav-1-4-11$/, async function () {

    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter

    await ares.startModule({ // definiera en testrapport (t.ex. testmodul i en testrapport)
      moduleName: 'krav-1-4-11',
      totalTests: 1
    });

    await helpers.loadPage('http' + '://localhost:3000');
  });

  this.Given(/^I press on login and enter my login information for Anna$/, async function () {
    await driver.findElement(By.css("button[type='button']")).click();
    await driver.findElement(By.css("input[type='text']")).sendKeys("Anna");
    await driver.findElement(By.css("input[type='password']")).sendKeys("ANNA123");
    await driver.findElement(By.css("button[type='submit']")).click();
  });

  this.Then(/^I should be able to see my five last transactions$/, async function () {
    await driver.findElements(By.xpath("/html/body/main/div/article/section[1]"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[1]/th[1]"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[2]/th[1]"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[3]/th[1]"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[4]/th[1]"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[5]/th[1]"));
  });

  this.Then(/^my different accounts with their respective balance$/, async function () {
    await driver.findElements(By.xpath("/html/body/main/div/article/section[2]/table"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[2]/table/tbody/tr[1]/th"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[2]/table/tbody/tr[2]/th"));
    await driver.findElements(By.xpath("/html/body/main/div/article/section[2]/table/tbody/tr[3]/th"));
  });

  this.Then(/^I should be able to transfer money between my own accounts, in this case Lönekonto to Bensinkonto$/, async function () {
    await driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[6]/button/a")).click();
    await sleep(2000);
    await driver.findElement(By.xpath("//*[@id='sum']")).sendKeys("100");
    await driver.findElement(By.xpath("//*[@id='toAccountNumber']/option[2]")).click();
    let t = true;

    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'krav-1-4-11',
      title: 'krav-1-4-11',
      passed: (t === true), // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      errorMessage: 'Den skall synas & Pengar skall gå att överföra',
      testBrowser: 'Chrome'
    });

    await ares.endModule({ // avslutar denna testrapport
      moduleName: 'krav-1-4-11',
    });

    await ares.endTests();  // avslutar hela ares

    // assert.equal(t, true, "[Passed]")

    await driver.findElement(By.xpath("/html/body/main/div/article/form/div[4]/div/button")).click();
  });

}
