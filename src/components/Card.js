export class Card {
  constructor(data, cardSelector, callbacks, userId) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = callbacks.handleCardClick;
    this._handleDeleteClick = callbacks.handleDeleteClick;
    this._switchLike = callbacks.switchLike;
    this._userId = userId;
    this._isOwn = data.owner._id === userId;
    this.isLiked = this._data.likes.some(
      (like) => like._id === this._userId
    );
  }

  // Создает разметку из шаблона
  _getTemplate() {
    const photoGridCard = document.querySelector(this._cardSelector).content;
    const newCard = photoGridCard.querySelector('.photo-grid__item').cloneNode(true);

    return newCard;
  }

  createCard() {
    this._newCard = this._getTemplate();
    this._cardDeleteButton = this._newCard.querySelector('.photo-grid__delete');
    this._likeButton = this._newCard.querySelector('.photo-grid__like');
    this._likeCounter = this._newCard.querySelector('.photo-grid__like-counter');
    this._newCardImage = this._newCard.querySelector('.photo-grid__image');
    this._newCardImage.src = this._data.link;
    this._newCardImage.alt = this._data.name;
    this._newCard.querySelector('.photo-grid__title').textContent = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;

    if (this.isLiked) {
      this._likeButton.classList.add('photo-grid__like_active');
    }

    this._setEventListeners();

    return this._newCard;
    
  }

    deleteCard() {
    this._newCard.remove();
  }

  _setLike() {
    this._switchLike(this._data, this.isLiked, (updatedLikes) => {
      this._data.likes = updatedLikes;

      if (this.isLiked) {
        this._likeButton.classList.remove('photo-grid__like_active');
      } else {
        this._likeButton.classList.add('photo-grid__like_active');
      }
      this.isLiked = !this.isLiked;

      this._likeCounter.textContent = this._data.likes.length;
    });
  }

  // Слушатели карточки
  _setEventListeners() {
    // Вешаем обработчик на лайк
    this._likeButton.addEventListener('click', () => {
      this._setLike();
    });

    // Вешаем обработчик на удаление
    
    if (this._isOwn) {
      this._cardDeleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this, this._data._id);
      });
    } else {
      this._cardDeleteButton.style.display = "none";
    }

    // Вешаем обработчик на открывание картинки
    this._newCard.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._handleCardClick({
        name: this._data.name,
        url: this._data.link,
      });
    });

  }

}