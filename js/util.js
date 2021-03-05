const getRandomNumber = (a = 0, b = 0) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  // * Another solution
  // const min = Math.ceil((a < b) ? a : b);
  // const max = Math.floor((a >= b) ? a : b);

  if (min < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// *** Check Max String Length

const checkMaxLength = (value = '', maxLength = 140) => value.length <= maxLength;

export { getRandomNumber, checkMaxLength };
