import FormField, { RadioField } from './form_field';

class Form {
  constructor({fields, submitBtn}){
    this.fieldOptions = fields;
    this.fields = this.createFields();
    this.submitBtn = document.querySelector(submitBtn.selector);
    this.submitBtn.addEventListener('click', this.submitHandler);
    this.onSubmit = submitBtn.onSubmit || (() => console.warn('Form config: No "submitHandler" callback option passed in your Submit button options.'));
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
    if(f.options.type === 'radio') {
      return new RadioField(f.selector, f.options, this.fieldChangeHandler)
    } else {
      return new FormField(f.selector, f.options, this.fieldChangeHandler)
    }
  });

  validate = () => this.valid = this.fields.every(f => f.isValid);
  
  updateClasses = () => {
    if(this.valid){
      this.submitBtn.classList.remove(`disabled`);
    } else {
      this.submitBtn.classList.add(`disabled`);
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