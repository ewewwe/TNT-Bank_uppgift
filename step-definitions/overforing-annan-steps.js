module.exports = function(){

    this.Given(/^avsändaren har 1000 kr på kontot$/, async function () {
      callback(null, 'pending');
    });
  
    this.When(/^avsändaren överför 1000kr till mottagaren$/, async function () {
      callback(null, 'pending');
    });
  
    this.Then('ska mottagaren fått {int} kr',  async function (pengar) {
      // Ladda sidan på nytt
      await helpers.loadPage('http' + '://localhost:3000');

      // Logga in som mottagare
      await driver.findElement(By.css("button[type='button']")).click();
      await driver.findElement(By.css("input[type='text']")).sendKeys("Anna");
      await driver.findElement(By.css("input[type='password']")).sendKeys("ANNA123");
      await driver.findElement(By.css("button[type='submit']")).click(); 

      // Validera saldo
    
      Assert.assertTrue( await driver.findElement(By.xpath("/html/body/main/div/article/section[2]/table/tbody/tr/td[2]")).getText().contains(pengar));
    });
  }
  