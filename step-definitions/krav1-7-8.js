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

  this.Given(/^that I visit the bank site to test krav-1-7-8$/, async function () {

    await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
      
    await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)
      moduleName: 'krav-1-7-8',
      totalTests: 1
    });

    await helpers.loadPage('http' + '://localhost:3000');
    });

  this.Given(/^I Press on login and enter my login information for Bengt$/, async function () {
    await driver.findElement(By.css("button[type='button']")).click();
    await driver.findElement(By.css("input[type='text']")).sendKeys("Bengt");
    await driver.findElement(By.css("input[type='password']")).sendKeys("Lösen0rd");
    await driver.findElement(By.css("button[type='submit']")).click(); 
  });



  this.Then(/^I Should be able to add a bank account, rename it and delete it again and logout.$/, {timeout: 100 * 1000}, async function () {
    await driver.findElement(By.css("*[data-target='#addAccountModal']")).click();
    await sleep(2000);
    await driver.findElement(By.xpath("//input[@class='form-control']")).sendKeys("testKonto");
    await driver.findElement(By.xpath("/html/body/main/div/article/div[1]/div/div/div[3]/button[2]")).click();
    await sleep(2000);
    await driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[4]/td[4]/button")).click();
    await sleep(2000);
    await driver.findElement(By.xpath("//*[@id='changeName']")).sendKeys("nyttnamn");
    await driver.findElement(By.xpath("/html/body/main/div/article/div[2]/div/div/div[3]/button[2]")).click();
    await sleep(2000);
    await sleep(2000);
    await driver.findElement(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr[4]/td[3]/button")).click();
    await sleep(2000);
    let t=true;

    await ares.testResult({ // skicka resultatet till testrapporten
      moduleName: 'krav-1-7-8',
      title: 'krav-1-7-8',
      passed: (t===true), // HÄR skickar jag in mitt resultat ifrån t ex Selenium
      errorMessage: 'Den skall testas',
      testBrowser: "Chrome"
      });
  
    await ares.endModule({ // avslutar vi denna testrapport
      moduleName: 'krav-1-7-8',
      });
  
    await ares.endTests();  // avslutar hela ares
  
    //assert.equal(t, true, "[Passed]")
    
    await driver.findElement(By.xpath("/html/body/main/div/aside/nav/ul/li[7]/button/a")).click();
    });
  }
