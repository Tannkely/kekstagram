import { showError, showSuccess, textHashtag, textDescription } from './validation.js';
import { isEscEvent } from './util.js';

const body = document.querySelector('body');
const uploadImgModal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadImgModalClose = document.querySelector('#upload-cancel');
const controlBigger = uploadImgModal.querySelector('.scale__control--bigger');
const controlSmaller = uploadImgModal.querySelector('.scale__control--smaller');
const controlValue = uploadImgModal.querySelector('.scale__control--value');
const uloadImagePreview = uploadImgModal.querySelector('.img-upload__preview > img');

uploadFile.addEventListener('change', () => {
  resetSettings();
  uploadImgModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEditorEscKeydown);
});

const closeModal = () => {
  uploadImgModal.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  textHashtag.value = '';
  textDescription.value = '';
  resetSettings();
  document.removeEventListener('keydown', onEditorEscKeydown);
};

uploadImgModalClose.addEventListener('click', () => {
  closeModal();
});

const onEditorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const resetSettings = () => {
  uloadImagePreview.style = 'transform: scale(1.00)';
  controlValue.value = '100%';
};

controlBigger.addEventListener('click', () => {
  let scale = parseInt(controlValue.value, 10) + Scale.STEP;

  if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  }

  controlValue.value = scale + '%';
  scale = scale / 100;
  uloadImagePreview.style.transform = 'scale(' + scale + ')';
});

controlSmaller.addEventListener('click', () => {
  let scale = parseInt(controlValue.value, 10) - Scale.STEP;

  if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  }

  controlValue.value = scale + '%';
  scale = scale / 100;
  uloadImagePreview.style.transform = 'scale(' + scale + ')';
});

const imgUploadForm = document.querySelector('.img-upload__form');
const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      closeModal();
      if (response.ok) {
        showSuccess();
      } else {
        showError();
      }
    });
  });
};
setUserFormSubmit();

export { closeModal };
