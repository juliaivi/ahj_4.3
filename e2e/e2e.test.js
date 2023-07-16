import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => { // закрытие и завершение тестов
    await browser.close();
    server.kill();
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
  });

  test('Form should render on page start', async () => {
    await page.goto(baseUrl); // перейти на нужный Url
    await page.waitForSelector('.validate-form');// дождатся отображение формы
  });

  test('Form input should add .active class if in is valid', async () => {
    await page.goto(baseUrl); // перейти на нужный Url
    await page.waitForSelector('.validate-form');// дождатся отображение формы

    const form = await page.$('.validate-form'); // получить елемент
    const input = await form.$('.input-card-number');
    const submit = await form.$('.validate-button');

    await input.type('3589310972149252'); // нужно ввести значение
    await submit.click(); // кликнуть по кнопке

    await page.waitForSelector('.validate-form .input-card-number.valid'); // проверка приобретения активного класса
  });

  test("Form input should add class .notValid if it's false", async () => {
    await page.goto(baseUrl); // перейти на нужный Url
    await page.waitForSelector('.validate-form');// дождатся отображение формы

    const form = await page.$('.validate-form'); // получить елемент
    const input = await form.$('.input-card-number');
    const submit = await form.$('.validate-button');

    await input.type('3589310972149258'); // нужно ввести значение
    await submit.click(); // кликнуть по кнопке

    await page.waitForSelector('.validate-form .input-card-number.notValid'); // проверка приобретения активного класса
  });
});
