import { isEscape } from './util.js';

const uploadImgModal = document.querySelector('.img-upload__overlay');
const textHashtag = uploadImgModal.querySelector('.text__hashtags');
const textDescription = uploadImgModal.querySelector('.text__description');

//Hashtag validation
const validateHashTag = (hashtag) => {
  const regexp = /^#\w{1,19}$/;
  const searchMatches = hashtag.match(regexp);
  return searchMatches !== null;
};

const validateHashTags = (str) => {
  if (str.trim().length === 0) {
    textHashtag.setCustomValidity('');
    return true;
  }
  const hashTags = str
    .toLowerCase()
    .split(' ')
    .filter((words) => words.length !== 0);

  for (let i = 0; i < hashTags.length; i++) {
    const tag = hashTags[i];

    if (!tag.startsWith('#')) {
      textHashtag.setCustomValidity('Хэштег должен начинаться с символа #');
      return false;
    }

    if (tag.length > 20) {
      textHashtag.setCustomValidity('Максимальная длина Хэштега 20 символов, включая решётку');
      return false;
    }

    if (!validateHashTag(hashTags[i])) {
      textHashtag.setCustomValidity(
        'Хэштег может состоять только из букв и чисел',
      );
      return false;
    }
  }

  if (hashTags.length !== new Set(hashTags).size) {
    textHashtag.setCustomValidity('Хэштеги не могут быть использованы дважды');
    return false;
  }

  if (hashTags.length > 5) {
    textHashtag.setCustomValidity('Нельзя указать больше пяти Хэштегов');
    return false;
  }

  textHashtag.setCustomValidity('');
  return true;
};

//Close by esc
const onFieldForRecording = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

textHashtag.addEventListener('keydown', onFieldForRecording);
textDescription.addEventListener('keydown', onFieldForRecording);

textHashtag.addEventListener('input', () => {
  if (!validateHashTags(textHashtag.value)) {
    textHashtag.reportValidity();
  }
});

const mainBlock = document.querySelector('main');

const MessageType = {
  SUCCESS: document.querySelector('#success').content.querySelector('.success').cloneNode(true),
  ERROR: document.querySelector('#error').content.querySelector('.error').cloneNode(true),
};

const showMessage = (messageType) => {
  const buttonClosePopup = messageType.querySelector('button');

  const fillMessage = () => {
    mainBlock.appendChild(messageType);
    buttonClosePopup.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    mainBlock.addEventListener('click', onCloseClickOutside);
  };

  const onPopupEscKeydown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const closePopup = () => {
    mainBlock.removeChild(messageType);
    document.removeEventListener('keydown', onPopupEscKeydown);
    mainBlock.removeEventListener('click', onCloseClickOutside);
    buttonClosePopup.removeEventListener('click', closePopup);
  };

  const onCloseClickOutside = (evt) => {
    if (evt.target === messageType.querySelector('div')) return;
    closePopup();
  };

  fillMessage();
};

const showError = () => {
  showMessage(MessageType.ERROR);
};

const showSuccess = () => {
  showMessage(MessageType.SUCCESS);
};

export { showError, showSuccess, textHashtag, textDescription };
