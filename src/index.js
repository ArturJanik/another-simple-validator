import './_scss/main.scss';
import SimpleVal from './scripts';

const sendForm = (fieldValues) => {
  console.log(fieldValues);
}

const formConfig = {
  fields: [
    {
      selector: '#form__subject',
      options: {
        required: true
      }
    },
    {
      selector: '#form__name',
      options: {
        required: true
      }
    },
    {
      selector: '#form__email',
      options: {
        required: true
      }
    },
    {
      selector: 'radiogroup',
      options: {
        type: 'radio',
        required: true
      }
    },
    {
      selector: '#form__checkbox',
      options: {
        required: true
      }
    },
    {
      selector: '#form__message',
      options: {
        validators: {
          minLength: 6
        },
        required: true
      }
    }
  ],
  submitBtn: {
    selector: '.form__btn',
    onSubmit: sendForm
  }
}

const form = new SimpleVal(formConfig);

document.querySelector('.validate__btn').addEventListener('click', form.forceFieldValidation);