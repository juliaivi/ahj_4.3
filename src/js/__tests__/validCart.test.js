/**
* @jest-environment jsdom
*/

import CardValidation from '../cardValidation';

document.body.innerHTML = '<div class="container"></div>';

const container = document.querySelector('.container');
const block = `
                <h3>Chek your credit card number</h3>
                <ul class="cards">
                    <li>
                        <span class="card visa" title="Visa"></span>
                    </li>
                    <li>
                        <span class="card jcb" title="JCB"></span>
                    </li>
                    <li>
                        <span class="card discover" title="discover"></span>
                    </li>
                    <li>
                        <span class="card americanExpress" title="American-Express"></span>
                    </li>
                    <li>
                        <span class="card mastercard" title="Mastercard"></span>
                    </li>
                    <li>
                        <span class="card mir" title="MIR"></span>
                    </li>
                    <li>
                        <span class="card diners" title="diners"></span>
                    </li>
                </ul>
                <form class="validate-form">
                    <input class="input-card-number" type="text" placeholder="Введите номер карты" required>
                    <button class="validate-button">Click</button>
                </form>
                <p class="result" data-id="result"></p>
  `;

container.insertAdjacentHTML('beforeend', block);

test('Form input should add .active class if in is valid', () => {
  const cardValidation = new CardValidation(container);
  cardValidation.init();
  cardValidation.input.value = '3589310972149252';
  cardValidation.validityCheck(cardValidation.input.value);
  cardValidation.button.click();
  expect(cardValidation.input.classList.contains('valid')).toEqual(true);
  expect(cardValidation.input.classList.contains('valid')).toBeTruthy();
});

test("Form input should add class .notValid if it's false", () => {
  const cardValidation = new CardValidation(container);
  cardValidation.init();
  cardValidation.input.value = '3589310972149257';
  cardValidation.validityCheck(cardValidation.input.value);
  cardValidation.button.click();

  // console.log(cardValidation.input.classList.contains('notValid'));

  expect(cardValidation.input.classList.contains('notValid')).toEqual(true);
  expect(cardValidation.input.classList.contains('notValid')).toBeTruthy();
});

test("Form input should add class .notValid if it's false", () => {
  const cardValidation = new CardValidation(container);
  cardValidation.init();
  cardValidation.input.value = '';
  cardValidation.button.click();
  const expected = 'Номер не введен. Введите пожалуйста номер.';
  expect(cardValidation.result.textContent).toEqual(expected);
});

test("Form input should add class .notValid if it's false", () => {
  const cardValidation = new CardValidation(container);
  cardValidation.init();
  cardValidation.input.value = '3589310972149252';
  cardValidation.validityCheck(cardValidation.input.value);
  cardValidation.button.click();

  const expected = 'Карта валидна';
  expect(cardValidation.result.textContent).toEqual(expected);
});

test("Form input should add class .notValid if it's false", () => {
  const cardValidation = new CardValidation(container);
  cardValidation.init();
  cardValidation.input.value = '3589310972149257';
  cardValidation.validityCheck(cardValidation.input.value);
  cardValidation.button.click();

  const expected = 'Карта не валидна!';
  expect(cardValidation.result.textContent).toEqual(expected);
});
