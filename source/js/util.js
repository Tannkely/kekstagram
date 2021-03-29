const ALERT_SHOW_TIME = 5000;

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    alert('Необходимо указать только положительные числа');
    return;
  }

  if (max < min) {
    let maxNew = min;
    min = max;
    max = maxNew;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  if (max === min) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createArray = (min, max) => {
  let elements = [];
  for (let i = min; i <= max; i++) {
    elements.push(i);
  }
  return elements;
}

const createMixedArrayInRange = (min, max) => {
  let elementsInRange = createArray(min, max);
  let mixedElements = [];
  while (elementsInRange.length > 0) {
    let uniqueInt = getRandomIntInclusive(0, elementsInRange.length-1);
    mixedElements.push(elementsInRange[uniqueInt]);
    elementsInRange.splice(uniqueInt, 1);
  }
  return mixedElements;
}

const clearElementInner = (element) => {
  element.innerHTML = '';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
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

export {getRandomIntInclusive, createMixedArrayInRange, isEscEvent, clearElementInner, showAlert};
