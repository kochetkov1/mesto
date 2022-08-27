export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._anyPopup = document.querySelector(this._popupSelector);
    this._openClass = 'popup_opened';
    this._closeButton = this._anyPopup.querySelector('.popup__close-button');
  }

  open() {
    this._anyPopup.classList.add(this._openClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._anyPopup.classList.remove(this._openClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.code === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Закрытие по клику на оверлей
    this._anyPopup.addEventListener('mousedown', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
    // Обработчик клика кнопки закрытия попапа
    this._closeButton.addEventListener("click", this.close.bind(this));
  }

}