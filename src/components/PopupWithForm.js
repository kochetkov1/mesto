import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbacks) {
    super(popupSelector);
    this._formElement = this._anyPopup.querySelector('.popup__form');
    this._inputList = Array.from( this._anyPopup.querySelectorAll('.popup__input') );
    this._handleFormSubmit = callbacks.handleFormSubmit;
    this._submitButton = this._formElement.querySelector('.popup__save-button');
    this._initialSubmitText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (
      this._formValues[input.name] = input.value
    ));

    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit( this._getInputValues(),
        (isLoading) => {
          if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
          } else {
            this._submitButton.textContent = this._initialSubmitText;
          }
        },
        () => {
          this.close();
        }
      );
    });

    super.setEventListeners();
  }

  close() {
    super.close();

    this._formElement.reset();
  }

}