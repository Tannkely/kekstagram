'use strict'

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const  checkMaxStringValue = function (str, max)  {
  return str.length <= max;
};

const comment = 'В этом комментарии должно быть около 140 символов, а  на самом деле должно быть больше, чтобы проверить работоспособность функции... 140 символов оказывается довольно большой текст и нужно что-то придумывать'
const secondComment = 'В этом комментарии меньше 140 символов ';
checkMaxStringValue(comment, 140);
checkMaxStringValue(secondComment, 140);
getRandomInt(0, 1); 
