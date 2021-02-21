const popup = document.querySelector('.popup-show-card');
const popupImg = document.querySelector('.popup__img');
const popupName = document.querySelector('.popup__name');
const popupCloseBtn = document.querySelector('.popup__close');


export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }

  _setEventListener() {
    this._element.querySelector('.element__trash').addEventListener('click', (e) => {
      e.target.closest('.element__list').remove();
    })

    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      e.target.classList.toggle('element__like_active');
    })

    this._element.querySelector('.element__images').addEventListener('click', (e) => {
      this._handleOpenPopup()

      document.addEventListener('keydown', (e) => {
        const activePopup = document.querySelector('.popup_opened');
        if (e.key === 'Escape' && activePopup) {
          this._handleClosePopup(activePopup);
        }
      })
    })

    popupCloseBtn.addEventListener('click', () => {
      this._handleClosePopup();

      document.removeEventListener('keydown', (e) => {
        const activePopup = document.querySelector('.popup_opened');
        if (e.key === 'Escape' && activePopup) {
          this._handleClosePopup(activePopup);
        }
      })
    })

  }

  _handleOpenPopup() {
    popupImg.src = this._link;
    popupName.textContent = this._name;
    popup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupImg.src = '';
    popup.classList.remove('popup_opened');
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__images').src = this._link;
    this._element.querySelector('.element__images').alt = this._name
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListener();

    return this._element;
  }
}


