import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._popupPicImage = document.querySelector(popupSelector).querySelector('.popup-pic__image');
    this._popupPicTitle = document.querySelector(popupSelector).querySelector('.popup-pic__title');
  }

  open(link, name) {
    super.open();

    this._popupPicImage.src = link;
    this._popupPicImage.alt = name;
    this._popupPicTitle.textContent = name;
  }

}