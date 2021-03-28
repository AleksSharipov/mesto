export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatar, id) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatar)

    this._id = id;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
      _id: this._id
    }
  }

  /*Add */
  setUserInfo(name, profession, avatar, id) {
    if (name, profession, avatar, id) {
      this._profileName.textContent = name;
      this._profileDescription.textContent = profession;
      this._profileAvatar.src = avatar
      this._id = id
    } else {
      console.log('Данные с сервера не получены...')
    }

  }
}

