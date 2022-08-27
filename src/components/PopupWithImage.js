import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicImage = this._anyPopup.querySelector('.popup-pic__image');
    this._popupPicTitle = this._anyPopup.querySelector('.popup-pic__title');
  }

  open({ name, url }) {
    this._popupPicImage.src = url;
    this._popupPicImage.alt = name;
    this._popupPicTitle.textContent = name;

    super.open();
  }

}