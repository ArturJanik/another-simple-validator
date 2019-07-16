# simple-validator

Simple JS form validator is style-agnostic form field validator. Styling of inputs responding to their validity state is up to you, library provides only js logic for validation. 
By default it will add `.dirty` class to inputs which were manipulated by user, and `.error` class to mark invalid ones, but you can change these classes in library config.

## Basic config

First we create form fields with unique `name` and `id` attributes for each field (except for radio buttons where we use one name for whole group of buttons).

```html
<select id="form__subject" name="subject">
  <option disabled selected value>Select subject</option>
  <option value="subject-1">Subject #1</option>
  <option value="subject-2">Subject #2</option>
  <option value="subject-3">Subject #3</option>
</select>

<input type="text" id="form__name" name="name" />

<input type="email" id="form__email" name="email" />

<input type="radio" id="radio1" name="radiogroup" value="radio1" />
<label for="radio1">Mail</label>
<input type="radio" id="radio2" name="radiogroup" value="radio2" />
<label for="radio2">Mail</label>
<input type="radio" id="radio3" name="radiogroup" value="radio3" />
<label for="radio3">Mail</label>
```

We also have to add a button that will handle form submision. By default I have added `.disabled` class to the btn, which will be toggled during validations.

```html
<button type="submit" class="form__btn disabled">Submit</button>
```

Next, we setup our form by passing options object to new Form constructor.

```javascript
import Form from './scripts/form';

const formConfig = {
  fields: [
    {
      selector: '#form__subject',
      options: {
        required: true
      }
    },
    {
      selector: '#form__name'
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
    }
  ],
  submitBtn: {
    selector: '.form__btn',
    onSubmit: sendForm,
    disabledClass: '.disabled'
  }
}

const form = new Form(formConfig);
```

And that's basically all, we should have our form validations up and ready.

### Supported field types

- inputs: text, email
- select-one
- textarea
- radio
- checkbox

## Form config object

Here you can see form config object with all currently available options and their default values:

```javascript
const formConfig = {
  fields: [
    {
      selector: '#fieldId',             // any selector that can be used with document.querySelector function in JS
      options: {
        validators = {},
        required = false,
        touched = false,                // we can pass 'touched' state on form creation if for example we prepopulate form with value
        ignoreDefaults = false,         // this will ignore default validators, currently applied only to email inputs
        validateAutomatically = true    // we can turn off automatic validation if we want to validate only by force
      }
    },
    {
      // radio buttons and checkboxes do not accept any validators except for 'required' option
      selector: 'radiogroup',
      options: {
        type: 'radio',                  // for radio buttons it is required to pass 'type' option
        required: true
      }
    }
  ],
  submitBtn: {
    selector: '.btnClass',
    onSubmit: (values) => console.log('Callback function called on successfull form submit. Returns object will {field: value} pairs'),
    disabledClass: '.disabled'          // class to add when button should be disabled (form invalid)
  },
  errorClass: '.err',                   // class to add on error
  dirtyClass: '.drr'                    // class to add to touched inputs
}
```

## Available validators

```javascript
{
  minLength: 6,
  maxLength: 10,
  numericality: true,
  regex: /^[^\D]\d{0,9}((\.|,)\d{1,})?$/
}
```