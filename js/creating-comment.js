import { randomInteger } from './util.js';


//Массив с именами и функция которая выдает рандомное имя

let name = [
  'Миша',
  'Аня',
  'Даник',
  'Катя',
  'Юля',
  'Света',
  'Костя',
  'Соня',
  'Витя',
  'Женя',
  'Вася',
  'Агния',
  'Настя',
  'Юра',
  'Влад',
  'Саша',
  'Гена',
  'Ира',
  'Таня',
  'Игорь',
  'Илья',
  'Оля',
  'Вика',
  'Олег',
  'Вадим',
];

//Функция для рандомного имени из массива через индекс

const getRandomName = function () {
  const nameUser = randomInteger(0, name.length - 1);
  const randomName = name[nameUser];
  return randomName;
}

const creatingComment = function (randomManyNames, id) {
  const comment = {
    id: id,
    avatar: `img/avatar-${randomInteger(1, 6)}.svg`,
    message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    name: randomManyNames,
  }

  return comment;
}

export { getRandomName, creatingComment };
