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
const popupPic = document.querySelector('#popup-pic');
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

// Функция открытия попапа
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  if (anyPopup.querySelector('.popup__form')) {
    anyPopup.querySelector('.popup__form').reset();
  };
}

// Обработчик клика кнопки Редактировать профиль
editProfileButton.addEventListener('click', function () {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupProfile);
});

// Обработчик клика кнопки Добавить
addCardButton.addEventListener('click', function () {
  openPopup(popupCard);
});

// Обработчик клика кнопки закрытия попапа профиля
popupCloseButton.addEventListener('click', function () {
  closePopup(document.querySelector('.popup_opened'));
});

// Обработчик клика кнопки закрытия попапа карточек
popupCardCloseButton.addEventListener('click', function () {
  closePopup(document.querySelector('.popup_opened'));
});

// Обработчик клика кнопки закрытия попапа увеличения картинок
popupPicCloseButton.addEventListener('click', function () {
  closePopup(document.querySelector('.popup_opened'));
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


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

// Проверка всех полей на валидность
const hasInvalidInput = (inputList) => {
  // Проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Отключение и включение кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}; 

// Устанавливаем обработчики на инпуты
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

// Добавление обработчиков всем формам
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(); 

 // Устанавливаем обработчики на попапы
const setEventListenersPopup = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  // Обойдём все элементы полученной коллекции
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', function (e) {
      if (e.target === e.currentTarget) {
        closePopup(document.querySelector(`#${e.target.id}`));
      }
    });

  });
}; 

setEventListenersPopup();