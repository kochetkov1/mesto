export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._anyPopup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._anyPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._anyPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
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
    this._anyPopup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });
  }

}