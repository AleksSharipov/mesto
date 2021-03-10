import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this.name = name;
    // this.link = link;

    this._popupCardImage = document.querySelector('.popup__img');
    this._captionImage = document.querySelector('.popup__name');
  }

  open(link, name) {
    this._popupCardImage.src = link;
    this._captionImage.textContent = name;
    super.open()
  }
}
