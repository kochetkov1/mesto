const sochiImage = new URL('../images/place-sochi.jpg', import.meta.url);
const krasnodarImage = new URL('../images/place-krasnodar.jpg', import.meta.url);
const volgogradImage = new URL('../images/place-volgograd.jpg', import.meta.url);
const saintpeterburgImage = new URL('../images/place-saintpeterburg.jpg', import.meta.url);
const kaliningradImage = new URL('../images/place-kaliningrad.jpg', import.meta.url);
const samaraImage = new URL('../images/place-samara.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Волгоград',
    link: volgogradImage
  },
  {
    name: 'Сочи',
    link: sochiImage
  },
  {
    name: 'Краснодар',
    link: krasnodarImage
  },
  {
    name: 'Самара',
    link: samaraImage
  },
  {
    name: 'Санкт-Петербург',
    link: saintpeterburgImage
  },
  {
    name: 'Калининград',
    link: kaliningradImage
  },
  
];