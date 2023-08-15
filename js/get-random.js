const getRandomFloat = function (fromValue, toValue, precision) {
  if(!(typeof fromValue === 'number' &&
    typeof fromValue === 'number' &&
    typeof precision === 'number')) {
    return NaN;
  }
  if(precision < 0) {
    precision = 0;
  }
  if(precision > 20) {
    precision = 20;
  }
  if(fromValue < 0) {
    fromValue = 0;
  }
  if(toValue < 0) {
    toValue = 0;
  }
  if(fromValue > toValue) {
    const fromValueCurrent = fromValue;
    fromValue = toValue;
    toValue = fromValueCurrent;
  }
  const randomValue = fromValue + Math.random() * (toValue - fromValue);
  return parseFloat(randomValue.toFixed(precision));
};

const getRandomInteger = function (fromValue, toValue) {
  if(!(typeof fromValue === 'number' &&
    typeof fromValue === 'number')) {
    return NaN;
  }
  if(fromValue < 0) {
    fromValue = 0;
  }
  if(toValue < 0) {
    toValue = 0;
  }
  if(fromValue > toValue) {
    const fromValueCurrent = fromValue;
    fromValue = toValue;
    toValue = fromValueCurrent;
  }
  const randomValue = fromValue + Math.random() * (toValue - fromValue);
  return Math.round(randomValue);
};
export {getRandomFloat, getRandomInteger};
