export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popClose = this._popupSelector.querySelector('.popup__close')
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._handleEscClose();
<<<<<<< HEAD

    this._popupSelector.addEventListener('click', () => {
      if (this._popupSelector.classList.contains('popup_opened')) {
        this.close();
      }
      if (this._popupSelector.classList.contains('popup__close')) {
        this.close();
      }
=======
    this.setEventListeners();
    this._popClose.addEventListener('click', () => {
      this.close()
>>>>>>> 36d24c7f747941981492aa280aebdafc49419392
    })
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._popupSelector) {
        this.close(this._popupSelector);
      }
    })
  }

  setEventListeners() {
<<<<<<< HEAD
    this._popupSelector.addEventListener('click', () => {
      if (this._popupSelector.classList.contains('popup_opened')) {
        this.close();
      }
      if (this._popupSelector.classList.contains('popup__close')) {
        this.close();
      }
=======
    this._popClose.addEventListener('click', () => {
      this.close()
>>>>>>> 36d24c7f747941981492aa280aebdafc49419392
    })
  }
}
