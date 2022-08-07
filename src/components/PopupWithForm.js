import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._nameInputCard = this._anyPopup.querySelector('[name="popup__input_name_card"]');
    this._urlInputCard = this._anyPopup.querySelector('[name="popup__input_url_card"]');

    this._handleFormSubmit = handleFormSubmit;

    this._formElement = this._anyPopup.querySelector('.popup__form');
    this._inputList = this._anyPopup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (
      this._formValues[input.name] = input.value
    ));
    return this._formValues;

  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._formElement.reset();
  }

}