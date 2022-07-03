// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// Для попапа в профиле
const popupProfile = document.querySelector('#popup-profile');
const formElement = document.querySelector('[name="popup__form-profile"]');
const nameInput = document.querySelector('[name="popup__input-name-profile"]');
const jobInput = document.querySelector('[name="popup__input-description-profile"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// Для попапа в карточках
const popupCard = document.querySelector('#popup-card');
const formCard = document.querySelector('[name="popup__form-card"]');
const nameInputCard = document.querySelector('[name="popup__input-name-card"]');
const urlInputCard = document.querySelector('[name="popup__input-url-card"]');
const cardName = document.querySelector('.photo-grid__title');
const cardUrl = document.querySelector('.photo-grid__image');
// Для попапа увеличения картинок
const popupPic = document.querySelector('#popup-pic');
const popupPicImage = document.querySelector('.popup-pic__image');
const popupPicTitle = document.querySelector('.popup-pic__title');
// Находим секцию, в которую будем вставлять карточки
const photoGrid = document.querySelector('.photo-grid');
// Находим шаблон с его содержимым
const photoGridCard = document.querySelector('#card').content;

// Создание новой карточки
function createCard(picName, picUrl) {
  const newCard = photoGridCard.querySelector('.photo-grid__item').cloneNode(true);
  const newCardImage = newCard.querySelector('.photo-grid__image');
  newCardImage.src = picUrl;
  newCard.querySelector('.photo-grid__title').textContent = picName;
  newCardImage.alt = picName;

  // Вешаем обработчик на лайк
  newCard.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });

  // Вешаем обработчик на удаление
  newCard.querySelector('.photo-grid__delete').addEventListener('click', function (evt) {
    evt.target.closest('.photo-grid__item').remove();
  });

  // Вешаем обработчик на открывание картинки
  newCard.querySelector('.photo-grid__image').addEventListener('click', function () {
    popupPicImage.src = picUrl;
    popupPicImage.alt = picName;
    popupPicTitle.textContent = picName;
    openPopup(popupPic);
  })
  return newCard;
}

// Добавление карточек из массива
initialCards.forEach(function (item) {
  photoGrid.append(createCard(item.name, item.link));
});

// Открытие попапа
function openPopup(anyPopup) {
  
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапа
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// Обработчик клика кнопки Редактировать профиль
editProfileButton.addEventListener('click', function () {

  popupProfile.querySelector('.popup__form').reset();

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  updateInputErrorStatus(popupProfile);

  openPopup(popupProfile);
});

// Обработчик клика кнопки Добавить карточку
addCardButton.addEventListener('click', function () {
  popupCard.querySelector('.popup__form').reset();
  updateSaveButtonStatus(popupCard);
  updateInputErrorStatus(popupCard);

  openPopup(popupCard);
});

// Действия с полями попапа профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupProfile);
}

formElement.addEventListener('submit', submitEditProfileForm);

// Действия с полями попапа карточек 
function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  photoGrid.prepend(createCard(nameInputCard.value, urlInputCard.value));

  closePopup(popupCard);
}

formCard.addEventListener('submit', formSubmitHandlerCard);

// Устанавливаем обработчики на попапы
const setEventListenersPopup = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  // Обойдём все элементы полученной коллекции
  popupList.forEach((popupElement) => {
    // Закрытие по клику на оверлей
    popupElement.addEventListener('mousedown', function (e) {
      if (e.target === e.currentTarget) {
        closePopup(document.querySelector(`#${e.target.id}`));
      }
    });
    // Обработчик клика кнопки закрытия попапа
    popupElement.querySelector('.popup__close-button').addEventListener('click', function () {
      closePopup(document.querySelector('.popup_opened'));
    });
  });
}

// Вызовем функцию
setEventListenersPopup();

// Закрытие попапа по нажатию Esc
const closePopupEsc = (e) => {
  anyPopup = document.querySelector('.popup_opened');
  if (e.code === "Escape") {
    closePopup(anyPopup);
  }
}

// Обновление статуса кнопки
const updateSaveButtonStatus = (anyPopup) => {
  const buttonElement = anyPopup.querySelector(validationConfig.submitButtonSelector);
  disableButton(buttonElement);
}

// Обновление статуса ошибки
const updateInputErrorStatus = (anyPopup) => {
  const formElement = anyPopup.querySelector(validationConfig.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}