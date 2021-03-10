export default class Section {
  constructor({ data, rendered }, containerSelector) {
    this._initialArray = data;
    this._rendered = rendered;
    this._container = document.querySelector(containerSelector);
  }

  renderItem() {
    this._initialArray.forEach((item) => {
      this._rendered(item);
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
