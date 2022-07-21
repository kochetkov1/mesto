import { popupPic, popupPicImage, popupPicTitle, openPopup } from './index.js';

export class Card {
  //data - инишал кардс
  //селектор - '#card'
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._newCard = this._getTemplate();
    this._newCardImage = this._newCard.querySelector('.photo-grid__image');
  }

  // Создает разметку из шаблона
  _getTemplate() {
    const photoGridCard = document.querySelector(this._cardSelector).content;
    const newCard = photoGridCard.querySelector('.photo-grid__item').cloneNode(true);

    return newCard;
  }

  createCard() {
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this._newCard.querySelector('.photo-grid__title').textContent = this._name;
    this._likeButton = this._newCard.querySelector('.photo-grid__like');

    this._setEventListenersPopup();

    return this._newCard;
  }

  _deleteCard() {
    this._newCard.remove();
  }

  _setLike() {
    this._likeButton.classList.toggle('photo-grid__like_active');
  }

  _openPic(link, name) {
    document.querySelector('.popup-pic__image').src = link;
    document.querySelector('.popup-pic__title').alt = name;
    document.querySelector('.popup-pic__title').textContent = name;
    openPopup(popupPic);
  }
  
  // Слушатели карточки
  _setEventListenersPopup() {
    // Вешаем обработчик на лайк
    
    this._likeButton.addEventListener('click', () => {
      this._setLike();
    });

    // Вешаем обработчик на удаление
    this._newCard.querySelector('.photo-grid__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    // Вешаем обработчик на открывание картинки
    this._newCard.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._openPic(this._link, this._name);
    });

  }

}