const getRandomInt = function (min, max) {

  if (min < 0 || max < 0) {
    return
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const  checkMaxStringValue = function (str, max)  {
  return str.length <= max ? true : false;
};

checkMaxStringValue ('asdasdasd', 5);


const getRandomArrayEl = function(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
};

export {
  getRandomInt,
  checkMaxStringValue,
  getRandomArrayEl
}
