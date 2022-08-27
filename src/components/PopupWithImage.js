import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicImage = document.querySelector(popupSelector).querySelector('.popup-pic__image');
    this._popupPicTitle = document.querySelector(popupSelector).querySelector('.popup-pic__title');
  }

  open({ name, url }) {
    this._popupPicImage.src = url;
    this._popupPicImage.alt = name;
    this._popupPicTitle.textContent = name;

    super.open();
  }

}