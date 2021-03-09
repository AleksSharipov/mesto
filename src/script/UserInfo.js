export default class UserInfo {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  getUserInfo() {
    this.name;
    this.description;
    // this.name = obj["user-name"];
    // this.description = obj["description"];
  }

  /*Add */
  setUserInfo(name, descr) {
    this.getUserInfo();
    // this.name = obj["user-name"];
    // this.description = obj["description"];
    name.textContent = this.name;
    descr.textContent = this.description;
  }
}

