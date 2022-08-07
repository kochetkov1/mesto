export class UserInfo {
  constructor( userSelectors ) {
    this._name = document.querySelector(userSelectors.name).textContent;
    this._description = document.querySelector(userSelectors.description).textContent;
    this._nameInput = document.querySelector('[name="popup__input-name-profile"]');
    this._jobInput = document.querySelector('[name="popup__input-description-profile"]');
  }

  getUserInfo() {
    const userData = 
      {
        name: this._name,
        description: this._description
      };
    return userData;
    
  }

  setUserInfo(evt) {
    evt.preventDefault();

    this._name.textContent = this._nameInput.value;
    this._description.textContent = this._jobInput.value;
  }

}