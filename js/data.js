import {getRandomInt,getRandomArrayEl} from './util.js';

const SIMILLAR_OBJECTS_AMOUNT = 25;

const COMMENTATOR_NAMES = [
  'Николай',
  'Дмитрий',
  'Анастасия',
  'Артем',
  'Анна',
  'Эмилия',
  'Виктор',
  'Никита',
  'Татьяна',
  'Адда',
  'Александр',
  'Стас',
  'Екатерина',
  'Алеся',
  'Алексей',
  'Алевтина'];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCPRIPTION = [
  'Это лучшее, что я видел за последнее время',
  'Красота фотографии не имеет границ',
  'Сразу видно, что есть чувство стиля',
  'Эта фотография сделала мой день',
  'Тебе можно позавидовать',
];

export {SIMILLAR_OBJECTS_AMOUNT, COMMENTATOR_NAMES, COMMENTS, DESCPRIPTION};

const getAvatarPath = function () {
  return `img/avatar-${getRandomInt(1, 6)}.svg`
};

const getUniqId = function () {
  const idArray = [];
  const rand = getRandomInt(0, 10000);
  if (!idArray.includes(rand)) {
    idArray.push(rand);
  }
  return rand;
}

const getActualCommentsStrings = function () {
  const actualCommentsStrings = [];
  for(let i = 0;i < getRandomInt(1, 2); i++ ) {
    actualCommentsStrings.push(COMMENTS[getRandomInt(0, COMMENTS.length-1)])}
  const actualComments = actualCommentsStrings.join(' ');
  return actualComments;
};

const MIN_SMTH = 1;
const MAX_SMTH = 6;

const generateRandomCommentsArray = function () {
  const commentsArray = [];
  const commentsCounter = getRandomInt(MIN_SMTH, MAX_SMTH);
  for (let i = 0; i < commentsCounter; i++) {
    const newComment = {
      id: getUniqId(),
      avatar: getAvatarPath(),
      message: getActualCommentsStrings(),
      name : getRandomArrayEl(COMMENTATOR_NAMES),
    };
    commentsArray.push(newComment);
  }
  return commentsArray;
};

const MIN_INT = 15;
const MAX_INT = 200;

const generateObjectsArray = function () {
  const objectsArray = [];
  for (let i = 0; i < SIMILLAR_OBJECTS_AMOUNT; i++) {
    const newObject = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayEl(DESCPRIPTION),
      likes: getRandomInt(MIN_INT, MAX_INT),
      comments: generateRandomCommentsArray(),
    };
    objectsArray.push(newObject);
  }
  return objectsArray;
}

generateObjectsArray();

export default generateObjectsArray;
