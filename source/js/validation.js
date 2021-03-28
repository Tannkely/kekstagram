import { isEscEvent } from './util.js';

const QUANTITY_SYMBOLS = 20;
const QUANTITY_HASHTAG = 5;

const uploadImgModal = document.querySelector('.img-upload__overlay');
const textHashtag = uploadImgModal.querySelector('.text__hashtags');
const textDescription = uploadImgModal.querySelector('.text__description');

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

  let isValid = true;

  hashTags.forEach((index) => {
    const tag = index;

    if (!validateHashTag(index)) {
      textHashtag.setCustomValidity(
        'Хэштег может состоять только из букв и чисел',
      );
      isValid = false;
    }

    if (tag.length > QUANTITY_SYMBOLS) {
      textHashtag.setCustomValidity('Максимальная длина Хэштега - 20 символов, включая символ "#"');
      isValid = false;
    }

    if (!tag.startsWith('#')) {
      textHashtag.setCustomValidity('Хэшnег должен начинаться с символа "#"');
      isValid = false;
    }
  });

  if (hashTags.length !== new Set(hashTags).size) {
    textHashtag.setCustomValidity('Хэшnеги не могут быть использованы дважды');
    isValid = false;
  }

  if (hashTags.length > QUANTITY_HASHTAG) {
    textHashtag.setCustomValidity('Нельзя указать больше пяти Хэшnегов 5');
    isValid = false;
  }

  isValid && textHashtag.setCustomValidity('');
  return isValid;
};

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
    if (isEscEvent(evt)) {
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
    if (evt.target === messageType.querySelector('div')) {
      closePopup();
      return;
    }
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
