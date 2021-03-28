export default class Section {
  constructor({ data, rendered }, containerSelector) {
    this._initialArray = data;
    this._rendered = rendered;
    this._container = document.querySelector(containerSelector);
  }

  renderItem(user) {
    this._initialArray.forEach((item) => {
      this._rendered(item, user);
    })
  }

  setData(data) {
    this._initialArray = data;
  }

  appendItem(element) {
    this._container.append(element)
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
