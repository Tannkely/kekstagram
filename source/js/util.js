const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return Error('Arguments must be positive ("min" number can equal 0)');
  }
  if (min >= max) {
    return Error('The "max" number must be greater than "min" number');
  }

  return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

const getArrayWithUniqueNumbers = (quantity) => {
  const numbers = [];

  while (numbers.length < quantity) {
    const currentRandomInteger = getRandomInteger(1, quantity);
    if (!numbers.includes(currentRandomInteger)) {
      numbers.push(currentRandomInteger);
    }
  }

  return numbers;
};

export { showAlert, isEscEvent, getArrayWithUniqueNumbers };
