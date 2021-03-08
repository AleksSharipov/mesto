import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);
    this._text = name;
    this._link = link;
  }

  open() {
    const popupImg = document.querySelector('.popup__img');
    const popupName = document.querySelector('.popup__name');
    popupImg.src = this._link;
    popupName.textContent = this._text;
    super.open()
  }
}
