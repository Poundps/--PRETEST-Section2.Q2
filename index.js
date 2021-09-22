var arg = process.argv.slice(2)[0];


const puppeteer = require("puppeteer");

(async () => {
  let browserPromise = puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto("https://codequiz.azurewebsites.net/", {
      waitUntil: "networkidle0",
      timeout: 0,
    });
    selector = "body > input[type=button]";
    await page.waitForSelector(selector);
    await page.click(selector);

      await page.waitForSelector("table");
    var retrieveData = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("table"));
      return tds.map((td) => td.innerText);
    });

    retrieveData = retrieveData[0].split(/[\\[\]\t\r\n/\\]+/); 
    if(retrieveData.includes(arg)){
        for(var i = 0; i < retrieveData.length ; i++){
         if(retrieveData[i] == arg){
             console.log(retrieveData[i+1])
         }
        }
    }
    else{
        console.log("Cannot find your fund name please try again :)")
    }
    browser.close
    process.exit()
  } catch (error) {
    console.log(error);
  }
})();
