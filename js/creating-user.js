import { randomInteger } from './util.js';


const creatingUser = function (id, manyComments, randomManyDescriptions) {
  let user = {
    id: id,
    url: `photos/${id}.jpg`,
    description: randomManyDescriptions,
    likes: randomInteger(15, 200),
    comment: manyComments,
  }

  return user;
}

//Массив с описаниями к постам

let description = [
  'Круто отдохнули',
  'Невидомый закат',
  'Полнолуние',
  'Кто гулять?',
  'Паррррриж',
  'Ловлю ритм',
  'Подарите машину, которая не ломается',
  'Какое кино посмотреть',
  'На охоте',
  'Купил айфон',
];

const getRandomDescription = function () {
  const descriptionUser = randomInteger(0, description.length - 1);
  const randomDescription = description[descriptionUser];
  return randomDescription;
}

export { creatingUser, getRandomDescription };
