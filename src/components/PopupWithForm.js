import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback;
    this._popupSelector = document.querySelector(popupSelector);
    this._btn = this._popupSelector.querySelector('.popup__form-btn');
  }

  _getInputValues() {
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (e) => {
      e.preventDefault();

      this._submitCallback(this._getInputValues());

    })
    super.setEventListeners()
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset();
    super.close();
  }
}
