let cancelCloseModal = false;

const isEscCloseEnable = () => {
  return !cancelCloseModal;
}

const checkFirstStep = (hashTagObject, PreviousHashtagText) => {
  hashTagObject.value = hashTagObject.value.replace(/ {2,}/g,' ');
  hashTagObject.value = hashTagObject.value.replace(/#{2,}/g,'#');
  hashTagObject.value = hashTagObject.value.replace(/(\w)#/g,'$1 #');
  if (hashTagObject.value.match(/([^#\sa-zA-Zа-яА-Я0-9]+)/)) {
    hashTagObject.setCustomValidity('Недопустимый символ\n');
    hashTagObject.value = PreviousHashtagText;
  }
  if (hashTagObject.value[0] !== '#' && hashTagObject.value.length > 0) {
    hashTagObject.value = '#'+hashTagObject.value;
  }
  return hashTagObject.value;
}

const checkValidHashStartCharacter = (hashTagForVerify) => {
  return (
    hashTagForVerify.match(/#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length !==
    hashTagForVerify.match(/([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length
  ) ? 'Добавьте # в начале каждого хештега! ' : '';
}

const checkValidHashMinimumCharacter = (hashTagForVerify) => {
  return (
    hashTagForVerify.match(/#([a-zA-Zа-яА-Я0-9]{1,100})(?=(\s)|$)/g).length !==
    hashTagForVerify.match(/#([a-zA-Zа-яА-Я0-9]{0,100})(?=(\s)|$)/g).length
  ) ? 'Хеш-тег не может состоять только из одной решётки! ' : '';
}

const checkValidHashMaximumCharacter = (hashTagForVerify) => {
  return (
    (hashTagForVerify.length > 20 && hashTagForVerify.match(/#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length === 1) ||
    (hashTagForVerify.match(/#([a-zA-Zа-яА-Я0-9]{1,19})(?=(\s)|$)/g).length !==
      hashTagForVerify.match(/#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g).length)
  ) ? 'Длина хэш-тега должна быть не более 20 символов! ' : '';
}

const checkValidUniqueAndCount = (hashTagForVerify) => {
  const hashtagsFromInput = hashTagForVerify.toLowerCase().match( /#([a-zA-Zа-яА-Я0-9]+)(?=(\s)|$)/g ) ;
  const uniqueHashtags = new Set(hashtagsFromInput);
  return (
    ((hashtagsFromInput.length !== uniqueHashtags.size) ? 'Один и тот же хэштег не может быть использован дважды.' : '')+
    ((uniqueHashtags.size > 5)  ? 'Нельзя указать больше пяти хэштегов.' : '')+
    ((uniqueHashtags[1] === ' ' ) ? 'Хештег не может состоять только из одной решётки.' : '')
  ) ;
}

const checkSecondStep = (hashTagForVerify) => {
  return (
    checkValidHashStartCharacter(hashTagForVerify).toString()+
    checkValidHashMinimumCharacter(hashTagForVerify).toString()+
    checkValidHashMaximumCharacter(hashTagForVerify).toString()+
    checkValidUniqueAndCount(hashTagForVerify).toString());
}

const initFocusHandler = (formForInit) => {
  formForInit.querySelector('.text__description').addEventListener('focus', () => { cancelCloseModal = true; });
  formForInit.querySelector('.text__description').addEventListener('blur', () => { cancelCloseModal = false; });
  formForInit.querySelector('.text__hashtags').addEventListener('focus', () => { cancelCloseModal = true; });
  formForInit.querySelector('.text__hashtags').addEventListener('blur', () => { cancelCloseModal = false; });
};

const initValidator = (imgUploadForm = document.querySelector('.img-upload__form')) => {
  let PreviousInputHashtags = '';
  const imgUploadHashtags = imgUploadForm.querySelector('.text__hashtags');

  initFocusHandler(imgUploadForm);

  imgUploadForm.querySelector('.img-upload__submit').addEventListener('click', () => {
    if (!imgUploadHashtags.checkValidity()) { imgUploadHashtags.style.border = '5px solid red'; }
  });

  imgUploadHashtags.addEventListener('input', () => {
    imgUploadHashtags.style.border = 'none';
    imgUploadHashtags.setCustomValidity('');
    PreviousInputHashtags = checkFirstStep(imgUploadHashtags, PreviousInputHashtags) ;
    if (imgUploadHashtags.value.length > 2) {
      imgUploadHashtags.setCustomValidity(checkSecondStep(imgUploadHashtags.value));
    }
    imgUploadHashtags.reportValidity();
  });
}

const clearUploadText = () => {
  document.querySelector('.img-upload__form .text__hashtags').setCustomValidity('');
  document.querySelector('.img-upload__form .text__hashtags').style.border = 'none';
  document.querySelector('.img-upload__form').querySelector('.text__hashtags').value = '';
  document.querySelector('.img-upload__form').querySelector('.text__description').value = '';
}

initValidator();

export {clearUploadText, isEscCloseEnable, initValidator};
