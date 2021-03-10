export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popClose = this._popupElement.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close(this._popupElement);
    }
  }

  _handleClickOverlay(e) {
    if (e.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (e) => {
      this._handleClickOverlay(e);
    })
    this._popClose.addEventListener('click', () => {
      this.close();
    })
  }
}
