import "./index.css";
import {
  validationConfig,
  avatar,
  nameInput,
  jobInput,
  buttonEditProfile,
  addCardButton,
  avatarButton,
  formElement,
  formCard,
  formAvatar
} from '../utils/constants.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import { PopupWithSubmitDelete } from "../components/PopupWithSubmitDelete.js";

// Экземпляр класса Card
const cardList = new Section((item) => {
  cardList.addItem(createCard(item), false);
}, '.photo-grid');

// Экземпляр класса UserInfo
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__photo'
});

// Экземпляр класса Api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "6b344dfe-98cc-405b-b96d-fa3acd60d0b1",
    "Content-Type": "application/json",
  },
});

// Обновление информации профиля
const popupWithFormProfile = new PopupWithForm('#popup-profile', {
  handleFormSubmit: (inputData, showLoading, handleCloseForm) => {
    showLoading(true);
    api
      .setUserProfile(inputData)
      .then((data) => {
        userInfo.setUserInfo(data);
        handleCloseForm();
      })
      .catch((err) => {
        console.log("Ошибка при обновлении информации профиля:", err);
      })
      .finally(() => {
        showLoading(false);
      });
  },
});

// Действия с попапом информации профиля
popupWithFormProfile.setEventListeners();
buttonEditProfile.addEventListener("click", () => {
  api
    .getUserProfile()
    .then(userData => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
    })
    .catch((err) => {
      console.log("Ошибка при получении информации профиля:", err);
    })
  formForProfile.resetButtonAndErrorStatus();
  popupWithFormProfile.open();
});

// Действия с попапом увеличенной картинки
const popupWithImage = new PopupWithImage('#popup-pic');
popupWithImage.setEventListeners();
const openPopupWithImage = (cardData) => {
  popupWithImage.open(cardData);
};

// Действия с попапом удаления карточки
const popupDeleteCard = new PopupWithSubmitDelete('#popup-delete-card');
popupDeleteCard.setEventListeners();

// Функция создания карточек
const createCard = (data) => {
  const newCard = new Card(data, '#card',
    {
      handleCardClick: openPopupWithImage,
      handleDeleteClick: (card, cardId) => {
        popupDeleteCard.open(() => {
          api
            .deleteCard(cardId)
            .then(() => card.deleteCard())
            .catch((err) => console.log("Ошибка при удалении карточки:", err));
        });
      },

      switchLike: (cardData, isLiked, likeCallback) => {
        if (isLiked) {
          api
            .deleteLike(cardData._id)
            .then((data) => {
              likeCallback(data.likes);
            })
            .catch((err) => {
              console.log("Ошибка при снятии лайка:", err);
            });
        } else {
          api
            .addLike(cardData._id)
            .then((data) => {
              likeCallback(data.likes);
            })
            .catch((err) => {
              console.log("Ошибка при постановке лайка:", err);
            });
        }
      },
    },
    userInfo.id
  );

  return newCard.createCard();
};

// Начальные карточки и данные профиля с сервера
Promise.all([
  api.getUserProfile(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log("Ошибка при обновлении списка карточек и данных профиля:", err);
  });

// Новая карточка
const popupWithFormCard = new PopupWithForm('#popup-card',
  {
    handleFormSubmit: (inputData, showLoading, handleCloseForm) => {
      showLoading(true);
      api
        .addCard(inputData)
        .then((data) => {
          cardList.addItem(createCard(data), true);
        })
        .catch((err) => {
          console.log("Ошибка при загрузки карточки:", err);
        })
        .finally(() => {
          showLoading(false);
          handleCloseForm();
        });
    },
  }
);

// Действия с попапом добавления карточки
popupWithFormCard.setEventListeners();
addCardButton.addEventListener("click", () => {
  formForCard.resetButtonAndErrorStatus();
  popupWithFormCard.open();
});

// Обновление аватара
const popupWithFormAvatar = new PopupWithForm('#popup-avatar',
  {
    handleFormSubmit: (inputData, showLoading, handleCloseForm) => {
      showLoading(true);
      api
        .updateAvatar(inputData.link)
        .then(() => {
          avatar.src = inputData.link;
        })
        .catch((err) => {
          console.log("Ошибка при обновлении аватара:", err);
        })
        .finally(() => {
          showLoading(false);
          handleCloseForm();
        });
    },
  }
);

// Действия с попапом обновления аватара
popupWithFormAvatar.setEventListeners();
avatarButton.addEventListener("click", () => {
  formForAvatar.resetButtonAndErrorStatus();
  popupWithFormAvatar.open();
});

// Валидация форм
const formForProfile = new FormValidator(validationConfig, formElement);
formForProfile.enableValidation();

const formForCard = new FormValidator(validationConfig, formCard);
formForCard.enableValidation();

const formForAvatar = new FormValidator(validationConfig, formAvatar);
formForAvatar.enableValidation();