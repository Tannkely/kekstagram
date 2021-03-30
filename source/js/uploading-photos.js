const SCALE_LIMITS = {
  min: 25,
  max: 100,
  step: 25,
};
const DOWNLOADABLE_FORMATS  = ['jpg', 'jpeg', 'png'];
const DEFAULT_EFFECT_LEVEL = 100;
const MAX_EFFECTS_VALUES = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  VALUES_HEAT: [1, 2],
};

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const uploadPhotos = document.querySelector('#upload-file');
const photosUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const counterValue = document.querySelector('.scale__control--value');
const effectsItemDefault = document.querySelector('.effects__item:first-child');
const effectsItem = document.querySelectorAll('.effects__item');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imageUploadPreviewEffect = document.querySelectorAll('.effects__preview');
const uploadForm = document.querySelector('.img-upload__form');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

import {errorUploadHandler} from './validation-img.js';
import {upload} from './server.js';
import {
  showSuccessMessage,
  showErrorMessage
} from './success.js';
let scale = parseInt(scaleControlValue.value, 10);
const escPress = function (evt) {
  if (evt.key === 'Escape' && hashTagsField !== document.activeElement && textDescription !== document.activeElement) {
    imgUploadEffectLevel.classList.add('hidden');
    evt.preventDefault();
    closeModal();
  }
};
const openModal = function () {
  imageUploadPreview.className.match('effects__preview--none')
  imageUploadPreview.className = 'effects__preview--none';
  imageUploadPreview.style = ''
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = DOWNLOADABLE_FORMATS.some((it) => {
    return fileName.endsWith(it);
  });
  if (!matches) {
    errorUploadHandler('Недопустимый формат');
    closeModal();
  } else {
    photosUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', escPress);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const image = reader.result;
      imageUploadPreview.src = image;
      for (let i = 0; i < imageUploadPreviewEffect.length; i++) {
        imageUploadPreviewEffect[i].style.backgroundImage = 'url(' + image + ')';
      }
    });
    reader.readAsDataURL(file);
  }
};
const closeModal = function () {
  photosUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', escPress);
  document.removeEventListener('keydown', openModal);
  uploadPhotos.value = '';
  imageUploadPreview.className = 'effects__preview--none';
  imageUploadPreview.style = ''
  imgUploadEffectLevel.classList.add('hidden');
  hashTagsField.value = '';
  textDescription.value = '';
  scale = 100;
};
const onMinusScaleClick = function () {
  if (scale <= SCALE_LIMITS.max && scale > SCALE_LIMITS.min) {
    scale -= SCALE_LIMITS.step;
  }
  changeImageScale(scale);
};
const onPlusScaleClick = function () {
  if (scale >= SCALE_LIMITS.min && scale < SCALE_LIMITS.max) {
    scale += SCALE_LIMITS.step;
  }
  changeImageScale(scale);
};
const changeImageScale = function (number) {
  imageUploadPreview.style.transform = 'scale(' + (number / 100) + ')';
  scaleControlValue.value = number + '%';
};
window.noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: DEFAULT_EFFECT_LEVEL,
  step: 1,
  connect: 'lower',
});
const setNewEffectDepth = function (levelValue) {
  const value = levelValue / DEFAULT_EFFECT_LEVEL;
  if (imageUploadPreview.className.match('effects__preview--')) {
    switch (imageUploadPreview.className) {
      case 'effects__preview--chrome':
        imageUploadPreview.style.filter = 'grayscale(' + (MAX_EFFECTS_VALUES.chrome * value) + ')';
        break;
      case 'effects__preview--sepia':
        imageUploadPreview.style.filter = 'sepia(' + (MAX_EFFECTS_VALUES.sepia * value) + ')';
        break;
      case 'effects__preview--marvin':
        imageUploadPreview.style.filter = 'invert(' + levelValue + '%)';
        break;
      case 'effects__preview--phobos':
        imageUploadPreview.style.filter = 'blur(' + (MAX_EFFECTS_VALUES.phobos * value) + 'px)';
        break;
      case 'effects__preview--heat':
        imageUploadPreview.style.filter = 'brightness(' + (MAX_EFFECTS_VALUES.VALUES_HEAT[1] * value + MAX_EFFECTS_VALUES.VALUES_HEAT[0]) + ')';
        break;
      default:
        imageUploadPreview.style.filter = '';
    }
  }
};
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  setNewEffectDepth(effectLevelValue.value);
});
const changeFilterHandler = function (evt) {
  if (evt.target.matches('input[type="radio"]')) {
    imageUploadPreview.className = '';
    setDefaultDepth();
    imageUploadPreview.className = 'effects__preview--' + evt.target.value;
    imageUploadPreview.style.transform = 'scale(1.00)';
    counterValue.value = DEFAULT_EFFECT_LEVEL + '%';
    sliderElement.noUiSlider.updateOptions({ start: DEFAULT_EFFECT_LEVEL });
    changeImageScale(scale);
  }
};
const setDefaultDepth = function () {
  effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  imageUploadPreview.style.filter = '';
};
effectsItem.forEach((item) => {
  item.addEventListener('click', () => {
    imgUploadEffectLevel.classList.remove('hidden');
  });
});
effectsItemDefault.addEventListener('click', () => {
  imgUploadEffectLevel.classList.add('hidden');
});
scaleControlSmaller.addEventListener('click', onMinusScaleClick);
scaleControlBigger.addEventListener('click', onPlusScaleClick);
effects.addEventListener('click', changeFilterHandler);
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  upload(
    showSuccessMessage,
    showErrorMessage,
    evt,
  );
});
uploadPhotos.addEventListener('change', function () {
  openModal();
});
uploadCancel.addEventListener('click', function () {
  closeModal();
});
export {
  closeModal,
  hashTagsField,
  textDescription
};
