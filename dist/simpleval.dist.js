!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SimpleVal=t():e.SimpleVal=t()}(window,function(){return function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,r){return t&&a(e.prototype,t),r&&a(e,r),e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t);var l=function(){function e(t){var r=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=a.validators,l=void 0===o?{}:o,u=a.required,c=void 0!==u&&u,d=a.touched,f=void 0!==d&&d,h=a.ignoreDefaults,v=void 0!==h&&h,y=a.validateAutomatically,p=void 0===y||y,m=a.errorClass,b=a.dirtyClass,g=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;n(this,e),s(this,"onChangeHandler",function(e){r.value=e.target.value.trim(),r.touched||(r.touched=!0),r.validateAutomatically&&r.validate(),r.updateClasses(),r.cb&&r.cb()}),s(this,"updateClasses",function(){r.touched?r.el.classList.add(r.dirtyClass):r.el.classList.remove(r.dirtyClass),r.valid?r.el.classList.remove(r.errorClass):r.el.classList.add(r.errorClass)}),s(this,"validateEmail",function(e){return/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e)}),s(this,"validateLength",function(e,t){return"min"===e?r.value.length>=t:"max"===e?r.value.length<=t:void 0}),s(this,"validateNumericality",function(){return/^[^\D]\d{0,9}((\.|,)\d{1,})?$/.test(r.value)}),s(this,"validatePattern",function(e){return e.test(r.value)}),s(this,"defaultValidations",function(){var e=!0;switch(r.type){case"email":return e=r.validateEmail(r.value);default:return e}}),s(this,"customValidations",function(e){var t=e;for(var i in r.validators){var n=r.validators[i];switch(i){case"minLength":t=r.validateLength("min",n);break;case"maxLength":t=r.validateLength("max",n);break;case"numerical":t=r.validateNumericality();break;case"regex":t=r.validatePattern(n);default:console.warn("Validator ".concat(i," unavailable."))}if(!t)return t}return t}),s(this,"validate",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!r.error){var t=!0;r.ignoreDefaults||(t=r.defaultValidations()),r.type.includes("select")||"checkbox"===r.type||(t=r.customValidations(t)),(r.required&&!r.touched||r.required&&r.touched&&""===r.value||"checkbox"===r.type&&!r.el.checked)&&(t=!1),r.valid=t,e&&r.updateClasses()}}),s(this,"resetState",function(){r.el.value="",r.value="",r.valid=!0,r.touched=!1,r.updateClasses()}),this.error=null;try{if("string"!=typeof t)throw"Error: form field selector should be string - '".concat(i(t),"' passed.");if(""===t.trim())throw"Error: empty form field selector passed.";if(this.el=document.querySelector(t),!this.el)throw"Error: element '".concat(t,"' does not exist.");this.name=this.el.getAttribute("name"),this.el.addEventListener("input",this.onChangeHandler),this.el.addEventListener("change",this.onChangeHandler),this.type=this.el.type,this.value=this.el.value,this.valid=!0,this.validators=l,this.required=c,this.touched=f,this.ignoreDefaults=v,this.validateAutomatically=p,this.errorClass=m,this.dirtyClass=b,this.cb=g}catch(e){this.error=e,console.error(this.error)}}return o(e,[{key:"isValid",get:function(){return this.touched&&this.valid||!this.touched&&!this.required}}]),e}(),u=function(){function e(t){var r=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=a.required,l=void 0!==o&&o,u=a.touched,c=void 0!==u&&u,d=a.validateAutomatically,f=void 0===d||d,h=a.errorClass,v=a.dirtyClass,y=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;n(this,e),s(this,"onChangeHandler",function(e){r.value=r.checked,r.touched||(r.touched=!0),r.validateAutomatically&&r.validate(),r.updateClasses(),r.cb&&r.cb()}),s(this,"updateClasses",function(){r.el.forEach(function(e){return e.classList.remove(r.dirtyClass)});var e=document.querySelector('input[name="'.concat(r.name,'"]:checked'));e&&e.classList.add(r.dirtyClass),r.valid?r.el.forEach(function(e){return e.classList.remove(r.errorClass)}):r.el.forEach(function(e){return e.classList.add(r.errorClass)})}),s(this,"validate",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];r.valid=!(!r.checked&&r.required),e&&r.updateClasses()}),this.error=null;try{if("string"!=typeof t)throw"Error: form field selector should be string - ".concat(i(t)," passed.");if(""===t.trim())throw"Error: empty form field selector passed.";if(this.el=document.getElementsByName(t),this.el.length<1)throw"Error: passed '".concat(t,"' is not correct radio field name.");this.name=this.el[0].getAttribute("name");var p=!0,m=!1,b=void 0;try{for(var g,C=this.el[Symbol.iterator]();!(p=(g=C.next()).done);p=!0){g.value.addEventListener("change",this.onChangeHandler)}}catch(e){m=!0,b=e}finally{try{p||null==C.return||C.return()}finally{if(m)throw b}}this.type="radio",this.value=this.checked,this.valid=!0,this.required=l,this.touched=c,this.validateAutomatically=f,this.errorClass=h,this.dirtyClass=v,this.cb=y}catch(e){this.error=e,console.error(this.error)}}return o(e,[{key:"checked",get:function(){var e=document.querySelector('input[name="'.concat(this.name,'"]:checked'));return e?e.value:null}},{key:"isValid",get:function(){return this.touched&&this.checked||!this.required}}]),e}(),c=l,d=function(e){if(!e)return null;for(var t=e;"."===t.charAt(0);)t=t.substr(1);return t};function f(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(r,!0).forEach(function(t){y(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function v(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var p=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=r.fields,n=r.submitBtn,a=void 0===n?null:n,o=r.errorClass,s=r.dirtyClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),y(this,"validateFieldsConfig",function(e){return!(!e||e.length<1)}),y(this,"createFields",function(){return t.fieldOptions.map(function(e){var r=h({},e.options,{errorClass:t.errorClass,dirtyClass:t.dirtyClass});return e.options&&"radio"===e.options.type?new u(e.selector,r,t.fieldChangeHandler):new c(e.selector,r,t.fieldChangeHandler)})}),y(this,"validate",function(){return t.valid=t.fields.every(function(e){return e.isValid})}),y(this,"forceFieldValidation",function(){return t.fields.forEach(function(e){return e.validate(!0)})}),y(this,"updateClasses",function(){t.submitBtn&&(t.valid?t.submitBtn.classList.remove(t.disabledClass):t.submitBtn.classList.add(t.disabledClass))}),y(this,"fieldChangeHandler",function(){t.validate(),t.updateClasses()}),y(this,"submitHandler",function(e){e.preventDefault(),t.valid&&t.onSubmit(t.fieldValues)}),y(this,"resetState",function(){t.valid=!1,t.fields.forEach(function(e){return e.resetState()})}),this.error=null;try{if(!this.validateFieldsConfig(i))throw"Error: no fields passed to form constructor.";this.fieldOptions=i,this.errorClass=d(o)||"error",this.dirtyClass=d(s)||"dirty",this.fields=this.createFields(),a&&(this.submitBtn=document.querySelector(a.selector),this.submitBtn.addEventListener("click",this.submitHandler),this.onSubmit=a.onSubmit||function(){return console.warn('Form config: No "submitHandler" callback option passed in your Submit button options.')},this.disabledClass=d(a.disabledClass)||"disabled"),this.valid=!1}catch(e){this.error=e,console.error(this.error)}}var t,r,i;return t=e,(r=[{key:"fieldValues",get:function(){var e={},t=!0,r=!1,i=void 0;try{for(var n,a=this.fields[Symbol.iterator]();!(t=(n=a.next()).done);t=!0){var o=n.value;e=h({},e,y({},o.name,o.value))}}catch(e){r=!0,i=e}finally{try{t||null==a.return||a.return()}finally{if(r)throw i}}return e}}])&&v(t.prototype,r),i&&v(t,i),e}();t.default=p}]).default});
//# sourceMappingURL=simpleval.dist.js.map