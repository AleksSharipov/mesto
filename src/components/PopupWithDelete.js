import Popup from './Popup.js'

export default class PopupWithDelele extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    // this._popup = super.returnPopup()
    this.submitCallback = submitCallback;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitCallback(this._delElement);
    })

    super.setEventListeners();
  }

  open(data) {
    super.open()
    // console.log(data)
    this._delElement = data;

  }

  close() {
    super.close();
  }
}


