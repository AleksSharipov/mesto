export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatar, id) {
    this._profileName = nameSelector;
    this._profileDescription = descriptionSelector;
    this._profileAvatar = avatar;

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
    if (name) {
      this._profileName.textContent = name;
    } else {
      console.log('Данные NAME с сервера не получены...')
    }
    if (profession) {
      this._profileDescription.textContent = profession;
    } else {
      console.log('Данные PROFESSION с сервера не получены...')
    }
    if (avatar) {
      this._profileAvatar.src = avatar
    } else {
      console.log('Данные AVATAR с сервера не получены...')
    }
    if (id) {
      this._id = id
    } else {
      console.log('Данные ID с сервера не получены...')
    }

  }
}

