export class UserInfo {
  constructor( userSelectors ) {
    this._name = document.querySelector(userSelectors.name);
    this._description = document.querySelector(userSelectors.description);
  }

  getUserInfo() {
    const userData = 
      {
        name: this._name.textContent,
        description: this._description.textContent
      };
    return userData;
    
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._description.textContent = userData.description;
  }

}