import './index.css';
import { validationConfig } from '../utils/validate.js';
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// Для попапа в профиле
const formElement = document.querySelector('[name="popup__form-profile"]');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#description-input');
// Для попапа в карточках
const formCard = document.querySelector('[name="popup__form-card"]');

// Селекторы 
const userSelectors =
{
  name: '.profile__name',
  description: '.profile__description'
};

const renderCard = (item) => {
  const card = new Card(item, '#card', openPic);
  const newCard = card.createCard();
  return newCard
};

// Добавляем набор стандартных карточек

const defaultCardList = new Section({
  items: initialCards, renderer: (data) => { // метод принимает аргумент
    const renderedCard = renderCard(data); // создаем карточку
    defaultCardList.addItem(renderedCard); // вставляем карточку в разметку 
  }
}, '.photo-grid'); 

defaultCardList.renderItems();

const popupWithImage = new PopupWithImage('#popup-pic');
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWithForm('#popup-profile', submitEditProfileForm);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm('#popup-card', handleCardFormSubmit);
popupWithFormCard.setEventListeners();

// Открытие увеличенной картинки
function openPic(link, name) {
  popupWithImage.open(link, name);
}

const user = new UserInfo(userSelectors);

// Обработчик клика кнопки Редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  formForProfile.resetButtonAndErrorStatus();
  const userData = user.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.description;

  popupWithFormProfile.open();
});

// Обработчик клика кнопки Добавить карточку
addCardButton.addEventListener('click', function () {
  formForCard.resetButtonAndErrorStatus();
  popupWithFormCard.open();
});

// Действия с полями попапа профиля
function submitEditProfileForm(data) {
  user.setUserInfo(data);
  popupWithFormProfile.close();
}

// Действия с полями попапа карточки
function handleCardFormSubmit(data) {
  const newCard = renderCard(data);
  defaultCardList.addItem(newCard);
  popupWithFormCard.close();
} 

// Валидация форм
const formForProfile = new FormValidator(validationConfig, formElement);
formForProfile.enableValidation();

const formForCard = new FormValidator(validationConfig, formCard);
formForCard.enableValidation();