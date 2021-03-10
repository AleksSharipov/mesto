export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileDescription.textContent
    }
  }

  /*Add */
  setUserInfo(name, profession) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = profession;
  }
}

