import {isEscEvent} from './util.js';
import {isEscCloseEnable} from './validation.js';
import {sendDataOnServer} from './data.js';
import {clearUploadText} from './validation.js';
import {initFilter} from './filter-posts.js';

const modalMessageVariations = {
  'success' : document.querySelector('#success').content.querySelector('.success') ,
  'error' : document.querySelector('#error').content.querySelector('.error') ,
} ;

const showModalMessage = (messageType = 'success') => {

  const closeMessageModal = (messageType) => {
    document.removeEventListener('keydown', onModalMessageEscKeydown, true);
    document.removeEventListener('click', onOutOfMessageClick, true);
    document.removeEventListener('keydown', onCloseButtonClick, true);
    if (modalMessageVariations[messageType].parentNode) {
      document.querySelector('main').removeChild(modalMessageVariations[messageType]);
    }
  }

  const onCloseButtonClick = () => {
    closeMessageModal(messageType);
  }

  const onOutOfMessageClick = (evt) => {
    if ((!evt.target.classList.contains('success__inner'))
      &&
      (!evt.target.classList.contains('error__inner'))
      &&
      !modalMessageVariations[messageType].querySelector('.'+messageType+'__inner').contains(evt.target)) {
      closeMessageModal(messageType);
    }
  }

  const onModalMessageEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessageModal(messageType);
    }
  };

  document.querySelector('main').appendChild(modalMessageVariations[messageType]);
  document.querySelector('.'+messageType+'__button').addEventListener('click', onCloseButtonClick, true);
  document.addEventListener('keydown',  onModalMessageEscKeydown, true);
  document.addEventListener('click', onOutOfMessageClick, true);
}

const onUploadModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    if (isEscCloseEnable()) { closeUploadModal(); }
  }
};

const onSubmitButtonClick =(evt) => {
  evt.preventDefault();
  sendDataOnServer(
    () => {
      closeUploadModal();
      showModalMessage();
    },
    () => {
      closeUploadModal();
      showModalMessage('error');
    },
    new FormData(evt.target),
  );
}

const onUploadModalCloseButtonClick = () => {
  closeUploadModal();
}

const closeUploadModal = () => {
  clearUploadText();
  document.querySelector('#upload-file').value = '';
  document.querySelector('.img-upload__form').removeEventListener('submit', onSubmitButtonClick, true);
  document.querySelector('#upload-cancel').removeEventListener('click', onUploadModalCloseButtonClick, true);
  document.removeEventListener('keydown', onUploadModalEscKeydown, true);
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

const showUploadImage = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onUploadModalEscKeydown, true);
  document.querySelector('.img-upload__form').addEventListener('submit', onSubmitButtonClick, true);
  document.querySelector('#upload-cancel').addEventListener('click', onUploadModalCloseButtonClick, true);
  initFilter();
}

export {closeUploadModal, showUploadImage};
