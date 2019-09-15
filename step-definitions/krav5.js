const ares = require('ares-helper'); // laddar in ares helper
  ares.debug = true; // vi får debug info
  ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares
  "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njc5Mzc0MTUsImVtYWlsIjoiZGlhbmFAc2htb25kcmFrLnNlIiwiaWF0IjoxNTY3ODUxMDE1fQ.cTqGi6obIjl3uHSft4kzX4fA3DtTJeKCNqeg9lrJdEA",
  "workspaceName": "outlook_default",
  "projectKey": "5d70bb183e47305847483f78",
  "projectName": "swedenbank"
});

module.exports = function () {
  this.Given(/^that I visit the bank site to test krav-5$/, async function () {
    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
    await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
      moduleName: 'krav-5',
      totalTests: 1
    });
    await helpers.loadPage('http' + '://localhost:3000');
  });

  this.Given(/^I Press on login and enter my login information for Uffe$/, async function () {
    await driver.findElement(By.css("button[type='button']")).click();
    await driver.findElement(By.css("input[type='text']")).sendKeys("Krav5");
    await driver.findElement(By.css("input[type='password']")).sendKeys("KRAV5");
    await driver.findElement(By.css("button[type='submit']")).click();
  });

  this.Given(/^Click on desired account, in this case Lönekonto.$/, async function () {
    await driver.findElement(By.xpath("//a[@href='#my-accounts']")).click();
  });

  this.Then(/^I Should be able to view my latest transfers.$/, async function () {
    await driver.findElement(By.xpath("//a[@href='#account-details']")).click();
  });

  this.Then(/^I Should be able to view my latest ten transfers.$/, async function () {

    var elems = await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr"));

    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'krav-5',
      title: 'krav-5',
      passed: (elems.length===10), // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      errorMessage: 'Det skulle visats 10 transaktioner, det gjordes ej',
      testBrowser: "Chrome"
      });
  
    await ares.endModule({ // avslutar vi denna testrapport
      moduleName: 'krav-5',
      });
  
    await ares.endTests();  // avslutar hela ares
    assert.equal(elems.length, 10, "[Passed]")
  });
}