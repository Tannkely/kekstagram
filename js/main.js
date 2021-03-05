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

// *** module3-task1 Generate

const ARRAY_LENGTH = 25;
const MAX_COMMENTS_COUNT = 7;

const tempNames = ['Николай', 'Дмитрий', 'Анастасия', 'Артем', 'Анна', 'Эмилия', 'Виктор', 'Никита', 'Татьяна', 'Адда', 'Александр', 'Стас', 'Екатерина', 'Алеся', 'Алексей', 'Алевтина'];
const tempMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const createNewArray = (arrLength, element, shift) => {
  return new Array(arrLength).fill('').map((item, index) => element(index + shift));
};

const createComment = (index) => {
  const commentMessageLength = getRandomNumber(1, 2);

  const createCommentMessage = (length) => {
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(tempMessage[getRandomNumber(0, tempMessage.length - 1)]);
    }
    return result.join(' ');
  };

  return {
    id: index + getRandomNumber(1, 300),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createCommentMessage(commentMessageLength),
    name: tempNames[getRandomNumber(0, tempNames.length - 1)],
  };
};

const createPhotoDescr = (index) => {
  const arrayOfCommentsLength = getRandomNumber(1, MAX_COMMENTS_COUNT);
  const createArrayOfComments = createNewArray(arrayOfCommentsLength, createComment, 0);

  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: 'Еще одна фотография',
    likes: getRandomNumber(15, 200),
    comments: createArrayOfComments,
  };
};

const arrayOfPhotoDescr = createNewArray(ARRAY_LENGTH, createPhotoDescr, 1);

arrayOfPhotoDescr; // for ESLint Validation
