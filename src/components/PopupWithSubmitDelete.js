import { Popup } from './Popup.js';

export class PopupWithSubmitDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._anyPopup.querySelector('.popup__form');
  }

  open(handleSubmit) {
    super.open();

    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }

}