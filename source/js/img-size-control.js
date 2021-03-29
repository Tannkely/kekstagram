const MAX_IMG_SIZE = 100;
const MIN_IMG_SIZE = 25;
const START_IMG_SIZE = 100;
const STEP_IMG_SIZE = 25;

const setImageSize = (size) => {
  document.querySelector('.scale__control--value').value = size + '%';
  document.querySelector('.img-upload__preview > img').style.transform = 'scale('+size / 100+')';
}

const decreaseSize = () => {
  parseInt(document.querySelector('.scale__control--value').value.slice(0,-1))
  setImageSize( parseInt(document.querySelector('.scale__control--value').value.slice(0,-1)) < MIN_IMG_SIZE+1 ?
    MIN_IMG_SIZE : parseInt(document.querySelector('.scale__control--value').value.slice(0,-1)) - STEP_IMG_SIZE);
}

const increaseSize = () => {
  setImageSize(parseInt(document.querySelector('.scale__control--value').value.slice(0,-1)) > MAX_IMG_SIZE-1 ?
    MAX_IMG_SIZE : parseInt(document.querySelector('.scale__control--value').value.slice(0,-1)) + STEP_IMG_SIZE);
}

const initSizeButtons = (startSize = START_IMG_SIZE) => {
  removeSizeButtonListener();
  document.querySelector('.scale__control--bigger').addEventListener('click',increaseSize, true );
  document.querySelector('.scale__control--smaller').addEventListener('click', decreaseSize, true );
  setImageSize(startSize);
}

const removeSizeButtonListener = () => {
  document.querySelector('.scale__control--smaller').removeEventListener('click', decreaseSize, true);
  document.querySelector('.scale__control--bigger').removeEventListener('click', increaseSize, true);
}

export {setImageSize, initSizeButtons, removeSizeButtonListener};
