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
// Кнопки для попапа увеличения картинок
const popupPicCloseButton = popupPic.querySelector('[name="popup__close-button-image"]');

const initialCards = [
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1604231787570-99263ec7b715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDk0NDU3Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
  },
  {
    name: 'Краснодар',
    link: 'https://images.unsplash.com/photo-1591731601603-9a1472d54a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDk0NTI5OQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
  },
  {
    name: 'Волгоград',
    link: 'https://images.unsplash.com/photo-1588424157150-fb13a23a2101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDk0NTM4NA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1590784776259-682d0042347f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDk0NTQ3NA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
  },
  {
    name: 'Калининград',
    link: 'https://images.unsplash.com/photo-1653467118407-f97431830209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDk0NTY0OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
  },
  {
    name: 'Самара',
    link: 'https://images.unsplash.com/photo-1633159556193-e95066818721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDk0NTc0OQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
  }
];
// Добавление карточек из массива
initialCards.forEach(function (item) {
  // Находим секцию, в которую будем вставлять карточки
  const photoGrid = document.querySelector('.photo-grid');
  // Находим шаблон с его содержимым
  const photoGridCard = document.querySelector('#card').content;
  // Копируем карточку
  const cardElement = photoGridCard.cloneNode(true);
  // Ищем картинку и задаем её адрес
  cardElement.querySelector('.photo-grid__image').src = item.link;
  // Ищем заголовок и задаем его
  cardElement.querySelector('.photo-grid__title').textContent = item.name;
  // Вешаем обработчик на лайк
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });
  // Вешаем обработчик на удаление
  const deleteButtonCard = cardElement.querySelector('.photo-grid__delete');
  deleteButtonCard.addEventListener('click', function () {
    const cardItem = deleteButtonCard.closest('.photo-grid__item');
    cardItem.remove();
  });
  // Вешаем обработчик на открывание картинки
  cardElement.querySelector('.photo-grid__image').addEventListener('click', function () {
    const popupPicImage = document.querySelector('.popup-pic__image');
    const popupPicTitle = document.querySelector('.popup-pic__title');
    popupPicImage.src = item.link;
    popupPicTitle.textContent = item.name;
    openPopupPic();
  });
  // Вставляем карточку
  photoGrid.append(cardElement);
});

// Функция открытия попапа профиля
function openPopup() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция открытия попапа карточек
function openPopupCard() {
  popupCard.classList.add('popup_opened');
  nameInputCard.value = "";
  urlInputCard.value = "";
}

// Функция открытия попапа увеличения картинок
function openPopupPic() {
  popupPic.classList.add('popup-pic_opened');
}

// Функция закрытия попапа профиля
function closePopup() {
  popupProfile.classList.remove('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция закрытия попапа карточек
function closePopupCard() {
  popupCard.classList.remove('popup_opened');
  nameInputCard.value = "";
  urlInputCard.value = "";
}

// Функция закрытия попапа увеличения картинок
function closePopupPic() {
  popupPic.classList.remove('popup-pic_opened');
}

// Обработчик клика кнопки Редактировать профиль
editProfileButton.addEventListener('click', function () {
  openPopup();
});

// Обработчик клика кнопки Добавить
addCardButton.addEventListener('click', function () {
  openPopupCard();
});

// Обработчик клика кнопки закрытия попапа профиля
popupProfile.addEventListener('click', function () {
  closePopup();
});

// Обработчик клика кнопки закрытия попапа карточек
popupCardCloseButton.addEventListener('click', function () {
  closePopupCard();
});

// Обработчик клика кнопки закрытия попапа увеличения картинок
popupPic.addEventListener('click', function () {
  closePopupPic();
});

// Закрытие кликом в пустоту для профиля
popupProfile.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});

// Закрытие кликом в пустоту для карточек
popupCard.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopupCard();
  }
});

// Закрытие кликом в пустоту для картинок
popupPic.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopupPic();
  }
});

// Действия с полями попапа профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// Действия с полями попапа карточек 
function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  // Находим секцию, в которую будем вставлять карточку
  const photoGrid = document.querySelector('.photo-grid');
  // Находим шаблон с его содержимым
  const photoGridCard = document.querySelector('#card').content;
  // Копируем карточку
  const cardElement = photoGridCard.cloneNode(true);
  // Ищем картинку и задаем её адрес
  cardElement.querySelector('.photo-grid__image').src = urlInputCard.value;
  // Ищем заголовок и задаем его
  cardElement.querySelector('.photo-grid__title').textContent = nameInputCard.value;
  // Вешаем обработчик на лайк
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });
  // Вешаем обработчик на удаление
  const deleteButtonCard = cardElement.querySelector('.photo-grid__delete');
  deleteButtonCard.addEventListener('click', function () {
    const cardItem = deleteButtonCard.closest('.photo-grid__item');
    cardItem.remove();
  });
  // Вставляем карточку
  photoGrid.prepend(cardElement);

  closePopupCard();
}

formCard.addEventListener('submit', formSubmitHandlerCard);