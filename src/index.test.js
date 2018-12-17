import puppeteer from 'puppeteer';
describe('index', () => {
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--windows-size=1920,1080']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:1234/');
    await page.setRequestInterception(true);
    //Puppeteer dosnt intercept the first request
    //I'm currently trying to resolve the issue
    //Once it's resolved i will continue with testing the app
    await page.on('request', request => {
      request.respond({
        content: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(testData)
      });
    });
  });
  afterAll(() => {
    
    browser.close();
  });
  it('should have title "SpaceX Launches"', async () => {
    const title = await page.title();
    expect(title).toMatch('SpaceX Launches');
  });
  describe('searching for stock data', () => {
    let card
    beforeAll(async () => {
    card =  await page.waitForSelector('.card');
    
    });
    it('card should exist', async () => {
      expect(card).toBeTruthy()
    });
   
  });
});
