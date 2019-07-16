class FormField {
  constructor(
    selector,
    {
      validators = {},
      required = false,
      touched = false,
      ignoreDefaults = false,
      validateAutomatically = true,
      errorClass,
      dirtyClass
    } = {},
    cb = null
  ){
    this.error = null;
    try {
      if(typeof selector !== 'string') throw(`Error: form field selector should be string - ${typeof selector} passed.`);
      this.el = document.querySelector(selector);
      if(!this.el) throw(`Error: element '${selector}' does not exist.`);
      this.name = this.el.getAttribute('name');
      this.el.addEventListener('keyup', this.onChangeHandler);
      this.el.addEventListener('change', this.onChangeHandler);
      this.type = this.el.type;
      this.value = this.el.value;
      this.valid = true;
      this.validators = validators;
      this.required = required;
      this.touched = touched;
      this.ignoreDefaults = ignoreDefaults;
      this.validateAutomatically = validateAutomatically;
      this.errorClass = errorClass;
      this.dirtyClass = dirtyClass;
      this.cb = cb;
    } catch (err) {this.error = err}
  }

  get isValid () { 
    return ((this.touched && this.valid) || (!this.touched && !this.required));
  }

  onChangeHandler = e => {
    this.value = e.target.value.trim();
    if(!this.touched) this.touched = true;
    if(this.validateAutomatically) this.validate();
    this.updateClasses();
    if(this.cb) this.cb();
  }

  updateClasses = () => {
    if(this.touched){
      this.el.classList.add(this.dirtyClass);
    } else {
      this.el.classList.remove(this.dirtyClass);
    }
    if(this.valid){
      this.el.classList.remove(this.errorClass);
    } else {
      this.el.classList.add(this.errorClass);
    }
  }

  validateEmail = val => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(val);
  }

  validateLength = (type, borderLength) => {
    if(type === 'min'){
      return this.value.length >= borderLength;
    }

    if(type === 'max'){
      return this.value.length <= borderLength;
    }
  }

  validateNumericality = () => {
    const pattern = /^[^\D]\d{0,9}((\.|,)\d{1,})?$/;
    return pattern.test(this.value);
  }

  validatePattern = (pattern) => {
    return pattern.test(this.value);
  }

  defaultValidations = () => {
    let valid = true;
    switch (this.type) {
      case 'email':
        valid = this.validateEmail(this.value);
        return valid;
      default:
        return valid;
    }
  }

  customValidations = (currentState) => {
    let valid = currentState;

    for (const validator in this.validators) {
      const validatorSetting = this.validators[validator];

      switch (validator) {
        case 'minLength':
          valid = this.validateLength('min', validatorSetting);
          break;
        case 'maxLength':
          valid = this.validateLength('max', validatorSetting);
          break;
        case 'numerical':
          valid = this.validateNumericality();
          break;
        case 'regex':
          valid = this.validatePattern(validatorSetting);
        default:
          console.log(`Validator ${validator} unavailable.`);
          break;
      }
      if(!valid) return valid;
    }

    return valid;
  }

  validate = (force = false) => {
    let valid = true;

    if(!this.ignoreDefaults) valid = this.defaultValidations();
    if(!this.type.includes('select')) valid = this.customValidations(valid);
    if((this.required && !this.touched) || (this.required && this.touched && this.value === '')) valid = false;

    this.valid = valid;

    if(force) {
      this.updateClasses();
    }
  }

  resetState = () => {
    this.el.value = '';
    this.value = '';
    this.valid = true;
    this.touched = false;
    this.updateClasses();
  }
}

class RadioField {
  constructor(
    selector,
    {
      required = false,
      touched = false,
      validateAutomatically = true
    } = {},
    cb = null
  ){
    this.error = null;
    try {
      if(typeof selector !== 'string') throw(`Error: form field selector should be string - ${typeof selector} passed.`);
      this.el = document.getElementsByName(selector);

      if(this.el.length < 1) throw(`Error: passed '${selector}' is not correct radio field name.`);
      this.name = this.el[0].getAttribute('name');

      for (const radioBtn of this.el) {
        radioBtn.addEventListener('change', this.onChangeHandler);
      }

      this.type = 'radio';
      this.value = this.checked;
      this.valid = true;
      this.required = required;
      this.touched = touched;
      this.validateAutomatically = validateAutomatically;
      this.cb = cb;
    } catch (err) {this.error = err}
  }

  get checked() {
    const checked = document.querySelector(`input[name="${this.name}"]:checked`);
    if(!checked) return null;
    return checked.value;
  }

  get isValid () { 
    return (this.touched && this.checked) || !this.required;
  }

  onChangeHandler = e => {
    this.value = this.checked;
    if(!this.touched) this.touched = true;
    if(this.validateAutomatically) this.validate();
    this.updateClasses();
    if(this.cb) this.cb();
  }

  updateClasses = () => {
    this.el.forEach(el => el.classList.remove('dirty'));
    const checked = document.querySelector(`input[name="${this.name}"]:checked`);
    if(checked) checked.classList.add('dirty');

    if(!this.valid) {
      this.el.forEach(el => el.classList.add('error'));
    } else {
      this.el.forEach(el => el.classList.remove('error'));
    }
  }

  validate = (force = false) => {
    this.valid = (this.checked || !this.required) ? true : false;
    if(force) this.updateClasses();
  }
}

export default FormField;
export { RadioField };