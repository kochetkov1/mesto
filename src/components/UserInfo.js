export class UserInfo {
  constructor( userSelectors ) {
    this._name = document.querySelector(userSelectors.name);
    this._description = document.querySelector(userSelectors.about);
    this._avatar = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    const userData = 
      {
        name: this._name.textContent,
        description: this._description.textContent,
        id: this._id
      };

    return userData;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
    this.id = _id;
  }

}