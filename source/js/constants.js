const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const MAX_HASHTAGS_QUANTITY = 5;
const RANDOM_PHOTOS_QUANTITY = 10;
const FILTER_DELAY = 500;
const COMMENTS_QUANTITY_STEP = 5;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const SCALE_DEFAULT_VALUE = '100%';
const SERVER_SEND_URL = 'https://22.javascript.pages.academy/kekstagram';
const SERVER_GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_REGEXP = new RegExp(/^#([а-яА-Я\w]{1,20})$/);
const BASIC_NO_UI_OPTIONS = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};
const CHROME_NO_UI_OPTIONS = {
  range: {
    'min': 0,
    'max': 1,
  },
  step: 0.1,
  start: 1,
};
const SEPIA_NO_UI_OPTIONS = {
  range: {
    'min': 0,
    'max': 1,
  },
  step: 0.1,
  start: 1,
};
const MARVIN_NO_UI_OPTIONS = {
  range: {
    'min': 0,
    'max': 100,
  },
  step: 1,
  start: 100,
};
const PHOBOS_NO_UI_OPTIONS = {
  range: {
    'min': 0,
    'max': 3,
  },
  step: 0.1,
  start: 3,
};
const HEAT_NO_UI_OPTIONS = {
  range: {
    'min': 1,
    'max': 3,
  },
  step: 0.1,
  start: 3,
};

export {HEAT_NO_UI_OPTIONS, PHOBOS_NO_UI_OPTIONS, MARVIN_NO_UI_OPTIONS, CHROME_NO_UI_OPTIONS, SEPIA_NO_UI_OPTIONS, BASIC_NO_UI_OPTIONS, SCALE_DEFAULT_VALUE, AVATAR_HEIGHT, AVATAR_WIDTH, HASHTAG_REGEXP, FILE_TYPES, COMMENTS_QUANTITY_STEP, FILTER_DELAY, RANDOM_PHOTOS_QUANTITY, SERVER_SEND_URL, SERVER_GET_URL, MAX_HASHTAGS_QUANTITY, SCALE_STEP, SCALE_MAX, SCALE_MIN};
