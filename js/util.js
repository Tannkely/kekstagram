// Функция проверки макс меньше либо равен мин
const isMaxLessThanMin = (min, max) => (max <= min);

// Функция проверки мин и макс меньше нуля
const isMinMaxLessThanZero = (min, max) => (min < 0) || (max < 0);

// Функция вывода рандоного числа в заданном промежутке
const randomInteger = function (min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  if (isMinMaxLessThanZero(min, max) || isMaxLessThanMin(min, max)) {
    window.console.log('invalid value');
  } else {
    return Math.floor(rand);
  }
}

//Функция для проверки максимальной длины строки. получаем либо true либо false
const countingSymbols = function (text, maxValue) {
  return text.length <= maxValue;
}
window.console.log(countingSymbols('Привет JS', 9));

//Случайное уникальное число
const uniqNumbers = [];
const getRandUniqNumbers = function () {
  let isUniq = false;
  while (isUniq == false) {
    const rand = randomInteger(1, 1000);
    if (!uniqNumbers.includes(rand)) {
      uniqNumbers.push(rand);
      isUniq = true;
    }
  }
  return uniqNumbers[uniqNumbers.length - 1];
}

export { randomInteger, getRandUniqNumbers };
