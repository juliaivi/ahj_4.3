import checkLuhn from './checkmetodLuhn';
import dataCardsOne from './datacardsOne';
import dataCardsTwo from './datacardsTwo';
import checksType from './checkType';

export default class CardValidation {
  constructor(container) {
    this.container = container;
    this.elementTypeCart = null;
    this.validity = false;
    this.typeCart = null;
    this.initialDigits = null;

    // this.container = document.querySelector('.container');
    this.form = this.container.querySelector('.validate-form');

    this.cards = this.container.querySelectorAll('.card');
    this.input = this.form.querySelector('.input-card-number');
    this.button = this.form.querySelector('.validate-button');
    this.result = this.container.querySelector('.result');
  }

  init() {
    this.elementTypeCart = null;
    this.form.addEventListener('submit', (event) => this.onSubmit(event));
    this.button.addEventListener('click', (event) => this.onSubmit(event));
    this.input.addEventListener('input', (event) => this.onInput(event));
  }

  onSubmit(e) {
    e.preventDefault();
    if (e.key === 'Enter' || e.type === 'click') {
      if (this.input.value === '') {
        this.result.textContent = 'Номер не введен. Введите пожалуйста номер.';
      } else {
        this.number = this.input.value.trim();
        if (typeof Number(this.number) !== 'number') {
          this.result.textContent = 'Неправельный тип данных!';
        }
        if (this.elementTypeCart !== null) {
          this.validityCheck(this.number);
        }
      }
    }
  }

  onInput(e) {
    e.preventDefault();
    this.typeCart = null;
    this.elementTypeCart = null;
    if (this.input.classList.contains('valid')) {
      this.input.classList.remove('valid');
    }
    if (this.input.classList.contains('notValid')) {
      this.input.classList.remove('notValid');
    }
    if (e.inputType === 'deleteContentBackward') {
      if (this.input.value === '' || this.input.value.length < 2) {
        this.removeStylesElements();
        this.result.textContent = 'Введите пожалуйста номер!';
      } else {
        this.result.textContent = 'Такой тип карты найден! Проверте его на валидность!';
      }
    }

    if (e.inputType === 'insertFromPaste') {
      this.removeStylesElements();
      this.selectioObjectn(this.input.value);
    }

    if (this.input.value.length >= 2) {
      this.selectioObjectn(this.input.value);
    }
  }

  selectioObjectn(el) {
    this.number = el.trim();
    if (typeof Number(this.number) !== 'number') {
      this.result.textContent = 'Неправельный тип данных!';
    }

    this.initialDigits = Number(this.number.substring(0, 1));

    if (this.initialDigits === 2 || this.initialDigits === 4) {
      this.elementTypeCart = this.cardTypeCheck(dataCardsOne, this.initialDigits);
    } else {
      this.initialDigits = Number(this.number.substring(0, 2));
      this.elementTypeCart = this.cardTypeCheck(dataCardsTwo, this.initialDigits);
    }
  }

  cardTypeCheck(el, num) {
    const elementTypeCart = checksType(el, num);
    if (elementTypeCart) {
      this.typeCart = elementTypeCart.type;
      this.result.textContent = 'Такой тип карты найден! Проверте его на валидность!';
      this.addStylesElements();
    }

    if (elementTypeCart === null || elementTypeCart === undefined) {
      this.result.textContent = 'Такой тип карты не найден!';
    }
  }

  validityCheck(num) {
    const stringLength = String(num).length;
    if (stringLength === 14 || stringLength === 15 || stringLength === 16) {
      this.validity = checkLuhn(num);
      if (this.validity) {
        this.result.textContent = 'Карта валидна';
        this.input.classList.add('valid');
        return;
      }
    }

    this.result.textContent = 'Карта не валидна!';
    this.input.classList.add('notValid');
  }

  addStylesElements() {
    if (this.typeCart !== null) {
      this.cards.forEach((el) => {
        if (!el.classList.contains(this.typeCart)) {
          el.classList.add('notActive');
        } else {
          el.classList.add('active');
        }
      });
    }
  }

  removeStylesElements() {
    if (this.typeCart === null) {
      this.cards.forEach((el) => {
        el.classList.remove('active');
        el.classList.remove('notActive');
      });
    }
  }
}
