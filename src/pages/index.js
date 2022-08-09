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
const nameInput = document.querySelector('[name="popup__input_name_profile"]');
const jobInput = document.querySelector('[name="popup__input_description_profile"]');
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
  items: initialCards, renderer: renderCard
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
const userData = user.getUserInfo();

// Обработчик клика кнопки Редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  formForProfile.resetButtonAndErrorStatus();

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

  userData.name = data.popup__input_name_profile;
  userData.description = data.popup__input_description_profile;

  user.setUserInfo(userData);

  popupWithFormProfile.close();
}

// Действия с полями попапа карточки
function handleCardFormSubmit(data) {
  const dataForm = [
    {
      name: data.name,
      link: data.link
    }
  ];
  
// Экземпляр класса для формы
const anyNewCard = new Section({
  items: dataForm, renderer: renderCard
}, '.photo-grid');

  anyNewCard.renderItems();

  popupWithFormCard.close();
}

// Валидация форм
const formForProfile = new FormValidator(validationConfig, formElement);
formForProfile.enableValidation();

const formForCard = new FormValidator(validationConfig, formCard);
formForCard.enableValidation();