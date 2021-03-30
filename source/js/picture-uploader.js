import {sendServerData} from './server.js';
import {isEscEvent, closeOnEscKeydown, increaseScale, decreaseScale} from './util.js';
import {handleValidationEvent} from './validation.js';
import {FILE_TYPES, SCALE_DEFAULT_VALUE, BASIC_NO_UI_OPTIONS, CHROME_NO_UI_OPTIONS, SEPIA_NO_UI_OPTIONS, MARVIN_NO_UI_OPTIONS, PHOBOS_NO_UI_OPTIONS, HEAT_NO_UI_OPTIONS} from './constants.js';

const photosEditorPopup = document.querySelector('.img-upload__overlay');
const photosInput = document.querySelector('#upload-file');
const commentAndHashtagField = document.querySelector('.img-upload__text');
const photosUploadForm = document.querySelector('.img-upload__form');
const closePhotosEditorButton = photosEditorPopup.querySelector('#upload-cancel');
const zoomInButton = photosEditorPopup.querySelector('.scale__control--bigger');
const zoomOutButton = photosEditorPopup.querySelector('.scale__control--smaller');
const photosPreviewDisplay = photosEditorPopup.querySelector('.img-upload__preview');
const previewImg = photosPreviewDisplay.querySelector('img');
const effectsButtons = photosEditorPopup.querySelectorAll('.effects__radio');
const effectsPreviewImages = photosEditorPopup.querySelectorAll('.effects__preview');
const originalEffectButton = photosEditorPopup.querySelector('.effects__radio');
const effectsLevelSlider = photosEditorPopup.querySelector('.effect-level__slider');
const effectsLevelField = photosEditorPopup.querySelector('.img-upload__effect-level');
const effectsLevelValue = photosEditorPopup.querySelector('.effect-level__value');
const photosHashtagsField = commentAndHashtagField.querySelector('.text__hashtags');
const photosCommentsTextarea = commentAndHashtagField.querySelector('.text__description');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const failMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const messagePlacement = document.querySelector('main');

const handleStopPropagation = (event) => {
  if (isEscEvent(event)) {
    event.stopPropagation();
  }
};

const closePhotosEditorPopup = () => {
  photosEditorPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  effectsLevelSlider.noUiSlider.destroy();
  previewImg.className = '';
  previewImg.src = '';
  previewImg.style.filter = '';
  previewImg.style.transform = '';
  photosInput.value = '';
  photosCommentsTextarea.value = '';
  originalEffectButton.checked = true;
  photosHashtagsField.value = '';
  photosHashtagsField.style.borderColor = '';
  photosHashtagsField.setCustomValidity('');
  effectsPreviewImages.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  closePhotosEditorButton.removeEventListener('click', closePhotosEditorPopup);
  document.removeEventListener('keydown', closeBigPhotosPopupOnEsc);
  zoomInButton.removeEventListener('click', increaseScale);
  zoomOutButton.removeEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.removeEventListener('change', handleChangeEffects);
  });
  commentAndHashtagField.removeEventListener('keydown', handleStopPropagation);
  photosHashtagsField.removeEventListener('input', handleValidationEvent);
  photosUploadForm.removeEventListener('submit', handleSubmitEvent);
};

const closeBigPhotosPopupOnEsc = closeOnEscKeydown(closePhotosEditorPopup);

const openPhotosEditorPopup = () => {
  document.body.classList.add('modal-open');
  photosEditorPopup.classList.remove('hidden');
  photosEditorPopup.querySelector('.scale__control--value').value = SCALE_DEFAULT_VALUE;
  effectsLevelField.classList.add('hidden');

  window.noUiSlider.create(effectsLevelSlider, BASIC_NO_UI_OPTIONS);

  readChosenFile();

  closePhotosEditorButton.addEventListener('click', closePhotosEditorPopup);
  document.addEventListener('keydown', closeBigPhotosPopupOnEsc);
  zoomInButton.addEventListener('click', increaseScale);
  zoomOutButton.addEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.addEventListener('change', handleChangeEffects);
  });
  commentAndHashtagField.addEventListener('keydown', handleStopPropagation);
  photosHashtagsField.addEventListener('input', handleValidationEvent);
  photosUploadForm.addEventListener('submit', handleSubmitEvent);
};

const calculateEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${value})`
    case 'sepia':
      return `sepia(${value})`
    case 'marvin':
      return `invert(${value}%)`
    case 'phobos':
      return `blur(${value}px)`
    case 'heat':
      return `brightness(${value})`
    case 'none':
      return 'none'
  }
};

const setupSliderSettings = (effect) => {
  switch (effect) {
    case 'chrome':
      effectsLevelSlider.noUiSlider.updateOptions(CHROME_NO_UI_OPTIONS);
      break
    case 'sepia':
      effectsLevelSlider.noUiSlider.updateOptions(SEPIA_NO_UI_OPTIONS);
      break
    case 'marvin':
      effectsLevelSlider.noUiSlider.updateOptions(MARVIN_NO_UI_OPTIONS);
      break
    case 'phobos':
      effectsLevelSlider.noUiSlider.updateOptions(PHOBOS_NO_UI_OPTIONS);
      break
    case 'heat':
      effectsLevelSlider.noUiSlider.updateOptions(HEAT_NO_UI_OPTIONS);
      break
    case 'none':
      break
  }
};

const handleChangeEffects = (event) => {
  const currentScaleEffect = event.target.value;
  setupSliderSettings(currentScaleEffect);

  if (currentScaleEffect === 'none') {
    effectsLevelField.classList.add('hidden');
    previewImg.style.filter = 'none';
  }
  else {
    effectsLevelField.classList.remove('hidden');

    effectsLevelSlider.noUiSlider.on('update', (values, handle, unencoded) => {
      effectsLevelValue.setAttribute('value', values[handle]);
      previewImg.style.filter = calculateEffect(currentScaleEffect, unencoded[handle]);
    });
  }
  previewImg.className = `effects__preview--${currentScaleEffect}`;
};

const handleSubmitEvent = (event) => {
  event.preventDefault();

  sendServerData(
    new FormData(event.target),
  ).then(
    showMessage('success'),
  ).catch(
    showMessage('error'),
  );
};

const showMessage = (type) => () => {
  const template = type === 'success' ? successMessageTemplate : failMessageTemplate;
  const openedMessage = template.cloneNode(true);
  const closeButton = openedMessage.querySelector(`.${type}__button`);

  messagePlacement.appendChild(openedMessage);

  const handleClose = () => {
    messagePlacement.removeChild(openedMessage);

    document.removeEventListener('keydown', closeMessageOnEsc);
    messagePlacement.removeEventListener('click', handleClose);
  };
  const handleCloseClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  const closeMessageOnEsc = closeOnEscKeydown(handleClose);

  closePhotosEditorPopup();

  closeButton.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', closeMessageOnEsc);
  openedMessage.addEventListener('click', handleCloseClick);
};

const initPictureUploader = () => {
  photosInput.addEventListener('change', openPhotosEditorPopup);
};

const readChosenFile = () => {
  const photosFile = photosInput.files[0];
  const fileName = photosFile.name.toLowerCase();

  const fileMatch = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (fileMatch) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImg.src = reader.result;
      effectsPreviewImages.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(photosFile);
  }
};

export {initPictureUploader};
