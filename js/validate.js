'use strict'
const validate = (function () {
    // const inputName = document.querySelector('.form__input_type_name');
    let errorText = document.querySelector('.form__subtext_error');
    const form = document.querySelector('.form');
    const inputPhone = document.querySelector('.form__input_type_number')
    // const inputEmail = form.querySelector('.form__input_type_email');
    // const chbox = form.querySelector('.form__checkbox-element');

    // let addError = function (place, elem, text) {
    //     place.textContent = text;
    //     elem.style.border = '1px solid red';
    // }

    // let removeError = function (place, elem, text) {
    //     place.textContent = text;
    //     elem.style.border = '1px solid #707070';
    // }

    let errorEmail = document.querySelector('.email__subtext_error');

    // form.addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     validateForm();
    // })

    // let validateForm = function () {
    //     let formInputs = form.querySelectorAll('.form__input');
    //     console.log(formInputs)
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     for (let i = 0; i < formInputs.length; i++) {
    //         const input = formInputs[i];
    //         if (input.value === "") {
    //             addError(errorText, input, "Это обязательное поле для заполнения");
    //             return false;
    //         } else {
    //             removeError(errorText, input, "");
    //         }
    //         if (input.classList.contains('form__input_type_email')) {
    //             if (reg.test(input.value) === false) {
    //                 addError(errorText, input, 'Введите корректный e-mail');
    //                 return false;
    //             }
    //             else {
    //                 removeError(errorEmail, input, "");

    //             }
    //             const req = document.querySelector('.req');
    //             if (req.checked === false) {
    //                 req.parentElement.classList.add('form__input_active')
    //                 req.classList.add('form__input_active');
    //                 errorText.textContent = "Это обязательное поле для заполнения"
    //                 return false

    //             } else {
    //                 req.parentElement.classList.remove('form__input_active')
    //                 req.classList.remove('form__input_active')
    //             }
    //         }
    //     }
    //     return true
    // }


    let getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }

    let onPhonePaste = function (e) {
        let input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        let pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    let onPhoneInput = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    let onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }

    inputPhone.addEventListener('keydown', onPhoneKeyDown);
    inputPhone.addEventListener('input', onPhoneInput, false);
    inputPhone.addEventListener('paste', onPhonePaste, false);



    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('.form');
        form.addEventListener('submit', formSend);
        function formSend(e) {
            e.preventDefault();
            let error = formValidate(form)
            if (error === 0) {
                errorText.textContent = "";
            } else {
                errorText.textContent = "Это обзательное поле";

            }
        }
    })



    let addError = function (elem) {
        elem.classList.add('error');
    }

    let removeError = function (elem) {
        // place.textContent = text;
        elem.classList.remove('error');
    }

    let addErrorCheck = function (elem) {
        elem.parentElement.classList.add('form__input_active')
        elem.classList.add('form__input_active');
    }

    let removeErrorCheck = function (elem) {
        // place.textContent = text;
        elem.parentElement.classList.remove('form__input_active')
        elem.classList.remove('form__input_active');
    }

    let formValidate = function (form) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let error = 0;
        let formReq = form.querySelectorAll('.req');
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            removeError(input);
            removeErrorCheck(input);
            if (input.classList.contains('form__input_type_email')) {
                if (reg.test(input.value) === false) {
                    addError(input)
                    errorEmail.textContent = 'Введите корректный e-mail'
                    error++
                } else {
                    errorEmail.textContent = ""
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                addErrorCheck(input)
                error++
            } else {
                if (input.value === "") {
                    addError(input)
                    error++

                }

            }

        }
        return error;
    }














    // let validateForm = function () {
    //     let formInputs = form.querySelectorAll('.form__input');
    //     for (let i = 0; i < formInputs.length; i++) {
    //         const input = formInputs[i];
    //         if (input.value === "") {
    //             errorText.textContent = "Это обязательное поле для заполнения";
    //             input.style.border = '1px solid red';

    //         } else {
    //             errorText.textContent = "";
    //             input.style.border = '1px solid #707070';
    //         }


    //     if (input.classList.contains('form__input_type_email')) {
    //         if (reg.test(input.value) === false) {
    //             errorText.textContent = 'Введите корректный e-mail';
    //             input.style.border = '1px solid red';
    //             return false
    //         }
    //     } else {
    //         errorText.textContent = "";
    //         input.style.border = '1px solid #707070';
    //     }
    // }
    // return true
    // }

    // let validateEmail = function () {
    //     let errorEmail = document.querySelector('.email__subtext_error');
    //     const inputEmail = form.querySelector('.form__input_type_email');
    //     const emailValue = inputEmail.value;
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     if (emailValue.length !==0 && reg.test(emailValue) == false) {
    //         errorEmail.textContent = 'Введите корректный e-mail';
    //         inputEmail.style.border = '1px solid red';
    //         return false;
    //     } else {
    //         errorEmail.textContent = "";
    //         inputEmail.style.border = '1px solid #707070';

    //     }
    //     return true
    // }

    // form.addEventListener('submit', formSend);

    // async function formSend(e) {
    //     e.preventDefault();
    //     let error = formValidate(form);
    //     if (error === 0) {

    //     } else {


    //     }
    // }


    // let formAddError = function (input) {
    //     input.classList.add('form__input_active')
    // }

    // let removeError = function (input) {
    //     input.classList.remove('form__input_active');
    // }

    // let formValidate = function () {
    //     let error = 0;
    //     let formInputs = form.querySelectorAll('.req');
    //     for (let i = 0; i < formInputs.length; i++) {
    //         const input = formInputs[i];
    //         removeError(input)
    //         if (input.classList.contains('form__input_type_email')) {
    //             if (emailTest(input)) {
    //                 formAddError(input);
    //                 errorText.textContent = 'Введите корректный e-mail';
    //                 error++;

    //             } else if (input.getAttribute('type')==='checkbox' && input.checked === false) {
    //                 formAddError()
    //             }
    //             else {
    //                 if (input.value === "") {
    //                     formAddError(input);
    //                     error++;
    //                 }
    //             }
    //         }
    //     }
    //     return error;
    // }



    // let emailTest = function (input) {
    //     return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value)
    // }
    // const validateForm = function () {


    //     formInputs.forEach(function (input) {
    //         if (input.value == "") {
    //             error.textContent = '*Это обязательные поле для заполнения';
    //             input.style.border = '1px solid red';
    //             return false;
    //         } else {
    //             error.textContent = "";
    //             input.style.border = '1px solid #707070';
    //         }
    //     })
    //     if (inputName.value == "") {
    //         error.textContent = '*Это обязательные поле для заполнения';
    //         inputName.style.border = '1px solid red';
    //         return false;
    //     } else {
    //         error.textContent = "";
    //         inputName.style.border = '1px solid #707070';
    //     }
    //     if (inputPhone.value == "") {
    //         error.textContent = '*Это обязательные поле для заполнения';
    //         inputPhone.style.border = '1px solid red';
    //         return false;
    //     } else {
    //         error.textContent = "";
    //         inputPhone.style.border = '1px solid #707070';
    //     }
    //     if (reg.test(emailValue) == false) {
    //         error.textContent = 'Введите корректный e-mail';
    //         inputEmail.style.border = '1px solid red';
    //         return false;
    //     } else {
    //         error.textContent = "";
    //         inputEmail.style.border = '1px solid #707070';

    //     } if (inputEmail.value == "") {
    //         error.textContent = '*Это обязательные поле для заполнения';
    //         inputEmail.style.border = '1px solid red';
    //         return false;
    //     } else {
    //         error.textContent = "";
    //         inputEmail.style.border = '1px solid #707070';
    //     }

    //     return true


    // }

    // форма 3
    // let validateInputs = function () {
    //     const emailValue = inputEmail.value;
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     const inputsArray = Array.prototype.slice.call(formInputs);
    //     for (let i = 0; i < inputsArray.length; i++) {
    //         const input = inputsArray[i];
    //         console.log(inputsArray[i])
    //         if (input.value == "") {
    //             error.textContent = '*Это обязательное поле для заполнения';
    //             input.style.border = '1px solid red';
    //         }
    //         else {
    //             error.textContent = "";
    //             input.style.border = '1px solid #707070';
    //         } if (input.classList.contains('form__input_type_email')) {
    //             if (reg.test(emailValue) == false) {
    //                 error.textContent = 'Введите корректный e-mail';
    //                 inputEmail.style.border = '1px solid red';
    //                 return false;
    //             }
    //             else {
    //                 error.textContent = "";
    //                 input.style.border = '1px solid #707070';
    //             }
    //     }
    //     }
    //     return true;
    // }

    // форма 4.
    // let validateInputs = function () {
    //     const emailValue = inputEmail.value;
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     formInputs.forEach(function (input) {
    //         if (input.value == "") {
    //             error.textContent = '*Это обязательные поле для заполнения';
    //             input.style.border = '1px solid red';
    //             return false;
    //         } else {
    //             error.textContent = "";
    //             input.style.border = '1px solid #707070';
    //         }
    //     })
    // }

    // inputName.onblur = function () {
    //     if (!inputName.value) {
    //         error.textContent = '*Это обязательное поле для заполнения';
    //         inputName.style.border = '1px solid red';
    //     }
    // };

    // inputName.onfocus = function () {
    //     if (inputName) {
    //         error.textContent = "";
    //         inputName.style.border = '1px solid #707070';
    //     }
    // };

    // inputEmail.onblur = function () {
    //     const emailValue = inputEmail.value;
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     if (!inputEmail.value) {
    //         error.textContent = '*Это обязательное поле для заполнения';
    //         inputEmail.style.border = '1px solid red';
    //     } else if (reg.test(emailValue) == false) {
    //         error.textContent = 'Введите корректный e-mail';
    //         inputEmail.style.border = '1px solid red';
    //     }
    // };

    // inputEmail.onfocus = function () {
    //     if (inputEmail) {
    //         error.textContent = "";
    //         inputEmail.style.border = '1px solid #707070';
    //     }
    // };


    // let validateInputs = function () {
    //     formInputs.forEach(function (input) {
    //         if (input.value == "") {
    //             error.textContent = '*Это обязательные поле для заполнения';
    //             input.style.border = '1px solid red';
    //             return false;
    //         } else {
    //             error.textContent = "";
    //             input.style.border = '1px solid #707070';
    //         }
    //     })

    // inputEmail.onblur = function () {
    //     if (!inputEmail.value) {
    //         error.textContent = '*Введите имя';
    //         input.style.border = '1px solid red';
    //     } else {
    //         error.textContent = "";
    //         inputEmail.style.border = '1px solid #707070';
    //     }
    // };

    // inputEmail.onfocus = function () {
    //     if (inputEmail) {
    //         error.textContent = "";
    //         input.style.border = '1px solid #707070';
    //     }
    // };
    // }

    // let validateInputs = function () {
    //     const emailValue = inputEmail.value;
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     const inputsArray = Array.prototype.slice.call(formInputs);
    //     for (let i = 0; i < inputsArray.length; i++) {
    //         let input = inputsArray[i];
    //         console.log(inputsArray[i])
    //         if (input.value == "") {
    //             error.textContent = '*Это обязательные поля для заполнения';
    //             input.style.border = '1px solid red';
    //         } else {
    //             error.textContent = "";
    //             input.style.border = '1px solid #707070';
    //         } 

    //     }

    //     if (reg.test(emailValue) == false) {
    //         error.textContent = 'Введите корректный e-mail';
    //         inputEmail.style.border = '1px solid red';

    //     }
    //     else {
    //         error.textContent = "";
    //         inputEmail.style.border = '1px solid #707070';
    //     }

    // }


    // let validateName = function () {
    //     inputName.onblur = function () {
    //         if (!inputName.value) {
    //             error.textContent = '*Введите имя';
    //             inputName.style.border = '1px solid red';
    //         }
    //     };

    //     inputName.onfocus = function () {
    //         if (inputName) {
    //             error.textContent = "";
    //             inputName.style.border = '1px solid #707070';
    //         }
    //     };
    // }

    // let validateEmailValue = function () {
    //     inputEmail.onblur = function () {
    //         if (!inputEmail.value) {
    //             error.textContent = '*Введите e-mail';
    //             input.style.border = '1px solid red';
    //         }
    //     };

    //     inputEmail.onfocus = function () {
    //         if (inputEmail) {
    //             error.textContent = "";
    //             inputEmail.style.border = '1px solid #707070';
    //         }
    //     };
    // }

    // let validateEmailValidity = function () {
    //     const emailValue = inputEmail.value;
    //     const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //     inputEmail.onblur = function () {
    //         if (reg.test(emailValue) == false) {
    //             error.textContent = 'Введите корректный e-mail';
    //             inputEmail.style.border = '1px solid red';
    //         }
    //     };
    //     inputEmail.onfocus = function () {
    //         if (inputEmail) {
    //             error.textContent = "";
    //             inputEmail.style.border = '1px solid #707070';
    //         }
    //     };

    // }



    // form.addEventListener('input', validateInputs);
    // inputName.addEventListener('input', validateName);
    // inputEmail.addEventListener('input', validateEmail);
    // inputPhone.addEventListener('input', validatePhone);
})();
