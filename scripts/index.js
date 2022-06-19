// Кнопки для попапа профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('[name="popup__close-button-profile"]');
// Кнопки для попапа карточек
const addCardButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = document.querySelector('[name="popup__close-button-card"]');
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
const popupPic = document.querySelector('.popup-pic');
const popupPicImage = document.querySelector('.popup-pic__image');
const popupPicTitle = document.querySelector('.popup-pic__title');
// Кнопки для попапа увеличения картинок
const popupPicCloseButton = popupPic.querySelector('[name="popup__close-button-image"]');
// Находим секцию, в которую будем вставлять карточки
const photoGrid = document.querySelector('.photo-grid');
// Находим шаблон с его содержимым
const photoGridCard = document.querySelector('#card').content;

// Создание новой карточки
function createCard(picName, picUrl) {
  const newCard = photoGridCard.querySelector('.photo-grid__item').cloneNode(true);
  newCard.querySelector('.photo-grid__image').src = picUrl;
  newCard.querySelector('.photo-grid__title').textContent = picName;
  newCard.querySelector('.photo-grid__image').alt = picName;

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

// Функция открытия попапа
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  if (anyPopup === popupProfile) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (anyPopup === popupCard) {
    nameInputCard.value = "";
    urlInputCard.value = "";
  };
}

// Функция закрытия попапа
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  if (anyPopup === popupProfile) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  } else if (anyPopup === popupCard) {
    nameInputCard.value = "";
    urlInputCard.value = "";
  };
}

// Обработчик клика кнопки Редактировать профиль
editProfileButton.addEventListener('click', function () {
  openPopup(popupProfile);
});

// Обработчик клика кнопки Добавить
addCardButton.addEventListener('click', function () {
  openPopup(popupCard);
});

// Обработчик клика кнопки закрытия попапа профиля
popupCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

// Обработчик клика кнопки закрытия попапа карточек
popupCardCloseButton.addEventListener('click', function () {
  closePopup(popupCard);
});

// Обработчик клика кнопки закрытия попапа увеличения картинок
popupPicCloseButton.addEventListener('click', function () {
  closePopup(popupPic);
});

// Закрытие кликом в пустоту для профиля
popupProfile.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup(popupProfile);
  }
});

// Закрытие кликом в пустоту для карточек
popupCard.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup(popupCard);
  }
});

// Закрытие кликом в пустоту для картинок
popupPic.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup(popupPic);
  }
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