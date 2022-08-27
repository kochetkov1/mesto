export const avatar = document.querySelector('.profile__photo');
export const nameInput = document.querySelector('#name-input');
export const jobInput = document.querySelector('#description-input');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__photo-edit-button');
export const formElement = document.querySelector('[name="popup__form-profile"]');
export const formCard = document.querySelector('[name="popup__form-card"]');
export const formAvatar = document.querySelector('[name="popup__form-avatar"]');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const formValidation = {};