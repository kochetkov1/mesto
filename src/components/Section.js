export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem() {
    // Добавление карточек из массива
    this._items.forEach(item => {
      // Добавляем в DOM
      // document.querySelector(this._containerSelector).append(this.renderer(item));
      document.querySelector(this._containerSelector).prepend(this.renderer(item));
    });
  }

}