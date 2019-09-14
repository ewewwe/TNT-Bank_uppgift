module.exports = function(){
    this.Given(/^Go to my accounts$/,  async function () {
        await driver.findElement(By.xpath("//a[@href='#my-accounts']")).click();
        });
}