const validateLength = (type, val, borderLength) => {
  if(type === 'min'){
    return val.length >= borderLength;
  }

  if(type === 'max'){
    return val.length <= borderLength;
  }
}

const validatePattern = (val, pattern) => {
  return pattern.test(val);
}

const validateNumericality = (val) => validatePattern(val, /^[^\D]\d{0,9}((\.|,)\d{1,})?$/);

const validateEmail = val => validatePattern(val, /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

export {
  validateEmail,
  validateLength,
  validateNumericality,
  validatePattern,
}