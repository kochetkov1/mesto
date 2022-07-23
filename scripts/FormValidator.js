export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  // Добавление класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  // Удаление класса с ошибкой
_hideInputError(inputElement) {
  // Находим элемент ошибки
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(this._validationConfig.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(this._validationConfig.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
}

// Проверка валидности поля
_isValid(inputElement) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    this._hideInputError(inputElement);
  }
}

// Проверка всех полей на валидность
_hasInvalidInput() {
  // Проходим по этому массиву методом some
  return this._inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}

// Отключение и включение кнопки
_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
  } else {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
  }
}

// Устанавливаем обработчики на инпуты
_setEventListeners() {

  this._toggleButtonState();

  // Обойдём все элементы полученной коллекции
  this._inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });
}

// Добавление обработчиков всем формам
enableValidation() {
    this._setEventListeners();
}

// Обновление статуса кнопки и ошибки
updateValidation() {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
}

}