const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadEffectsLevel = document.querySelector('.img-upload__effect-level');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview > img');
const effectLevelValue = document.querySelector('.effect-level__value');
imgUploadEffectsLevel.classList.add('visually-hidden')

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
}

let lastClass = '';

const setEffects = {
  none: () => {
    imgUploadEffectsLevel.classList.add('visually-hidden')
    return 'none';
  },
  chrome: () => {
    imgUploadEffectsLevel.classList.remove('visually-hidden')
    return `grayscale(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  sepia: () => {
    imgUploadEffectsLevel.classList.remove('visually-hidden')
    return `sepia(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  marvin: () => {
    imgUploadEffectsLevel.classList.remove('visually-hidden')
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },
  phobos: () => {
    imgUploadEffectsLevel.classList.remove('visually-hidden')
    return `blur(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    imgUploadEffectsLevel.classList.remove('visually-hidden')
    return `brightness(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01})`;
  },
}

const onEffectsGroup = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      uploadPreviewImg.classList.remove(lastClass);
    }
    effectsLevelSlider.noUiSlider.set(100);
    let currentClass = evt.target.classList[1];
    lastClass = currentClass;

    uploadPreviewImg.classList.add(currentClass);
    uploadPreviewImg.style.filter = setEffects[currentClass.replace('effects__preview--', '')]();
  }
};

imgUploadEffects.addEventListener('click', onEffectsGroup);

window.noUiSlider.create(effectsLevelSlider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  connect: 'lower',
});

effectsLevelSlider.noUiSlider.on('change', () => {
  effectLevelValue.value = effectsLevelSlider.noUiSlider.get();

  uploadPreviewImg.style.filter = setEffects[lastClass.replace('effects__preview--', '')]();
});
export { effectLevelValue, imgUploadEffectsLevel };
