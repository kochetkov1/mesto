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
    this._setEventListenersPopup();

    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;

    this._newCard.querySelector('.photo-grid__title').textContent = this._name;

    return this._newCard;
  }

  // Слушатели карточки
  _setEventListenersPopup() {
    // Вешаем обработчик на лайк
    this._newCard.querySelector('.photo-grid__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-grid__like_active');
    });

    // Вешаем обработчик на удаление
    this._newCard.querySelector('.photo-grid__delete').addEventListener('click', () => {
      this._newCard.remove();
    });

    // Вешаем обработчик на открывание картинки
    this._newCard.querySelector('.photo-grid__image').addEventListener('click', () => {
      popupPicImage.src = this._link;
      popupPicImage.alt = this._name;
      popupPicTitle.textContent = this._name;
      openPopup(popupPic);
    })

  }

}

// // Добавление карточек из массива
// initialCards.forEach(function (item) {
//   const card = new Card(item, '#card');
//   const newCard = card.createCard();

//   // Добавляем в DOM
//   document.querySelector('.photo-grid').append(newCard);
// });

// export { Card };