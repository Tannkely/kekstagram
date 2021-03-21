import { randomInteger, getRandUniqNumbers } from './util.js';
import { creatingUser, getRandomDescription } from './creating-user.js';
import { getRandomName, creatingComment } from './creating-comment.js';

//Функция для создания массива c пользователя и массивов комментариев
const getManyUsers = function () {
  const users = [];
  for (let i = 0; i < 25; i++) {
    const comments = [];
    const countComments = randomInteger(3, 15);
    const randomManyDescriptions = getRandomDescription();
    for (let g = 0; g < countComments; g++) {
      const commentsId = getRandUniqNumbers();
      const randomManyNames = getRandomName();
      comments.push(creatingComment(randomManyNames, commentsId));
    }
    users.push(creatingUser(i + 1, comments, randomManyDescriptions));
  }
  window.console.log(users);
  return users;
}
const people = getManyUsers();

export { people };
