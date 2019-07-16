import FormField, { RadioField } from './form_field';
import { removeDotFromClassname } from './helpers';

class Form {
  constructor({fields, submitBtn, errorClass, dirtyClass}){
    this.fieldOptions = fields;
    this.errorClass = removeDotFromClassname(errorClass) || 'error';
    this.dirtyClass = removeDotFromClassname(dirtyClass) || 'dirty';
    this.fields = this.createFields();
    this.submitBtn = document.querySelector(submitBtn.selector);
    this.submitBtn.addEventListener('click', this.submitHandler);
    this.onSubmit = submitBtn.onSubmit || (() => console.warn('Form config: No "submitHandler" callback option passed in your Submit button options.'));
    this.disabledClass = removeDotFromClassname(submitBtn.disabledClass) || 'disabled';
    this.valid = false;
  }

  get fieldValues() {
    let fv = {};
    for (const field of this.fields) {
      fv = {
        ...fv,
        [field.name]: field.value
      };
    }
    return fv;
  }

  createFields = () => this.fieldOptions.map(f => {
    const fOptions = {
      ...f.options,
      errorClass: this.errorClass, 
      dirtyClass: this.dirtyClass
    }

    if(f.options.type === 'radio') {
      return new RadioField(f.selector, fOptions, this.fieldChangeHandler)
    } else {
      return new FormField(f.selector, fOptions, this.fieldChangeHandler)
    }
  });

  validate = () => this.valid = this.fields.every(f => f.isValid);

  forceFieldValidation = () => this.fields.forEach(f => f.validate(true));
  
  updateClasses = () => {
    if(this.valid){
      this.submitBtn.classList.remove(this.disabledClass);
    } else {
      this.submitBtn.classList.add(this.disabledClass);
    }
  }

  fieldChangeHandler = () => {
    this.validate();
    this.updateClasses();
  }

  submitHandler = (e) => {
    e.preventDefault();
    if(!this.valid) return;
    this.onSubmit(this.fieldValues);
  }

  resetState = () => {
    this.valid = false;
    this.fields.forEach(el => el.resetState());
  }
}

export default Form;