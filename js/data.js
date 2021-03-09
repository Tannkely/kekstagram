import {getRandomInt,getRandomArrayEl} from './util.js';
import {SIMILLAR_OBJECTS_AMOUNT, COMMENTATOR_NAMES, COMMENTS, DESCPRIPTION} from './const.js'


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

const generateRandomCommentsArray = function () {
  const commentsArray = [];
  const commentsCounter = getRandomInt(1, 6);
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

const generateObjectsArray = function () {
  const objectsArray = [];
  for (let i = 0; i < SIMILLAR_OBJECTS_AMOUNT; i++) {
    const newObject = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayEl(DESCPRIPTION),
      likes: getRandomInt(15, 200),
      comments: generateRandomCommentsArray(),
    };
    objectsArray.push(newObject);
  }
  return objectsArray;
}

generateObjectsArray();

export {generateObjectsArray};
