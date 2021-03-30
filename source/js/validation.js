import {MAX_HASHTAGS_QUANTITY, HASHTAG_REGEXP} from './constants.js';

const photosHashtag = document.querySelector('.text__hashtags');

const setHashtagsError = (message) => {
  photosHashtag.setCustomValidity(message);
  photosHashtag.style.borderColor = 'red';
  photosHashtag.reportValidity();
  return;
};

const handleValidationEvent = () => {
  const hashtagList = photosHashtag.value.toLowerCase().split(' ');
  if (hashtagList.length > MAX_HASHTAGS_QUANTITY) {
    return setHashtagsError('Максимальное количество хэштегов 5.');
  }

  for (let i = 0; i < hashtagList.length; i++) {
    if (!HASHTAG_REGEXP.test(hashtagList[i])) {
      return setHashtagsError(' Хэштеги разделяются пробелом. Строка после решётки должна состоять из букв и чисел, длина от 1 до 20 символов.');
    }
  }
  photosHashtag.setCustomValidity('');
  photosHashtag.style.borderColor = '';
};

export {handleValidationEvent};
