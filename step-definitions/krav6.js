module.exports = function(){

    this.Given(/^att jag besöker banksidan$/, async function () {
      await helpers.loadPage('http' + '://localhost:3000');
    });
  
    this.Given(/^loggar in med testkontot$/, async function () {
      await driver.findElement(By.css("button[type='button']")).click();
      await driver.findElement(By.css("input[type='text']")).sendKeys("Krav6");
      await driver.findElement(By.css("input[type='password']")).sendKeys("KRAV6");
      await driver.findElement(By.css("button[type='submit']")).click(); 
    });
  
    this.Given(/^jag navigerar till mina konto$/,  async function () {
     await driver.findElement(By.xpath("//a[@href='#my-accounts']")).click();
     });
  
    this.Given(/^Klickar på kontot med minst elva transaktioner$/,  async function () {
     await driver.findElement(By.xpath("//a[@href='#account-details']")).click();
     });

  this.Then(/^jag klickar på Visa fler$/,  async function () {
      await driver.findElement(By.xpath("/html/body/main/div/article/section[2]/*[@id='show-button']")).click();
    });
  
    this.Then(/^ska minst elva transaktioner visas$/,  async function () {
        
      var elems = await driver.findElements(By.xpath("/html/body/main/div/article/section[1]/table/tbody/tr"));
      assert.equal(elems.length, 11, "[Passed]")
      
    });
  }