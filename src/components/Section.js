export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer(element) {
    return this._renderer(element);
  }
  
  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this.renderer(item);
      this.addItem(element);
    });
  }

}