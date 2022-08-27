export class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка. Запрос не выполнен: ${res.status}`);
  }

  getUserProfile() {
    this._userProfile = fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._handleServerResponse);
    return this._userProfile;
  }

  getInitialCards() {
    this._initialCards = fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._handleServerResponse);
    return this._initialCards;
  }

  setUserProfile(userInfo) {
    this._settedUserProfile = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.description
      })
    })
      .then(this._handleServerResponse);
    return this._settedUserProfile;
  }

  addCard(cardInfo) {
    this._addedCard = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link
      })
    })
      .then(this._handleServerResponse);
    return this._addedCard;
  }

  deleteCard(id) {
    this._deletedCard = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleServerResponse);
    return this._deletedCard;
  }

  addLike(id) {
    this._addedLike = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._handleServerResponse);
    return this._addedLike;
  }

  deleteLike(id) {
    this._deletedLike = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleServerResponse);
    return this._deletedLike;
  }

  updateAvatar(url) {
    this._updatedAvatar = fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(this._handleServerResponse);
    return this._updatedAvatar;
  }

}