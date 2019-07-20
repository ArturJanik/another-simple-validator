import * as validators from '../utilities/validators';

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
      if(typeof selector !== 'string') throw(`Error: form field selector should be string - '${typeof selector}' passed.`);
      if(selector.trim() === '') throw(`Error: empty form field selector passed.`);
      this.el = document.querySelector(selector);
      if(!this.el) throw(`Error: element '${selector}' does not exist.`);
      this.name = this.el.getAttribute('name');
      this.el.addEventListener('input', this.onChangeHandler);
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
    } catch (err) {this.error = err; console.error(this.error)}
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

  defaultValidations = () => {
    let valid = true;
    switch (this.type) {
      case 'email':
        valid = validators.validateEmail(this.value);
        return valid;
      default:
        return valid;
    }
  }

  customValidations = (currentState) => {
    let valid = currentState;

    for (const v in this.validators) {
      const validatorSetting = this.validators[v];

      switch (v) {
        case 'minLength':
          valid = validators.validateLength('min', this.value, validatorSetting);
          break;
        case 'maxLength':
          valid = validators.validateLength('max', this.value,  validatorSetting);
          break;
        case 'numerical':
          valid = validators.validateNumericality(this.value);
          break;
        case 'regex':
          valid = validators.validatePattern(this.value, validatorSetting);
        default:
          console.warn(`Validator ${v} unavailable.`);
          break;
      }
      if(!valid) return valid;
    }

    return valid;
  }

  validate = (force = false) => {
    if(this.error) return;
    let valid = true;

    if(!this.ignoreDefaults) valid = this.defaultValidations();
    if(!this.type.includes('select') && this.type !== 'checkbox') valid = this.customValidations(valid);
    if(
      (this.required && !this.touched) 
      || (this.required && this.touched && this.value === '')
      || (this.type === 'checkbox' && !this.el.checked)
    ) valid = false;

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
      validateAutomatically = true,
      errorClass,
      dirtyClass
    } = {},
    cb = null
  ){
    this.error = null;
    try {
      if(typeof selector !== 'string') throw(`Error: form field selector should be string - ${typeof selector} passed.`);
      if(selector.trim() === '') throw(`Error: empty form field selector passed.`);
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
      this.errorClass = errorClass;
      this.dirtyClass = dirtyClass;
      this.cb = cb;
    } catch (err) {this.error = err; console.error(this.error)}
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
    this.el.forEach(el => el.classList.remove(this.dirtyClass));
    const checked = document.querySelector(`input[name="${this.name}"]:checked`);
    if(checked) checked.classList.add(this.dirtyClass);

    if(!this.valid) {
      this.el.forEach(el => el.classList.add(this.errorClass));
    } else {
      this.el.forEach(el => el.classList.remove(this.errorClass));
    }
  }

  validate = (force = false) => {
    this.valid = (this.checked || !this.required) ? true : false;
    if(force) this.updateClasses();
  }
}

export default FormField;
export { RadioField };