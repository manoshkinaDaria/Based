const validate = (function () {

    const form = document.querySelector('.form');

    let validateForm = function (selector,checkboxId, placeTel, placeCheckbox) {
        const telSelector = placeTel.querySelector('input[type="tel"]');
        const inputMask = new Inputmask('+7 (999) 999-99-99');
        inputMask.mask(telSelector);
        const inputCheck = placeCheckbox.querySelector(checkboxId);
        const activeCheck = placeCheckbox.querySelector('.form__label_checkbox');
        const validation = new JustValidate(selector, {
            errorFieldCssClass: 'is-invalid',
        });
        validation
            .addField('#input__name', [
                {
                    rule: 'required',
                    value: true,
                    errorMessage: 'Введите имя',
                },

            ])
            .addField('#input__email', [
                {
                    rule: 'required',
                    value: true,
                    errorMessage: 'Email обязателен',
                },
                {
                    rule: 'email',
                    value: true,
                    errorMessage: 'Введите корректный Email',
                },
            ])
            .addField('#input__number', [
                {
                    rule: 'required',
                    value: true,
                    errorMessage: 'Телефон обязателен',
                },
                {
                    rule: 'function',
                    validator: function () {
                        const phone = telSelector.inputmask.unmaskedvalue();
                        return phone.length === 10;
                    },
                    errorMessage: 'Введите корректный телефон',
                },
            ])
            .addField(checkboxId, [
                {
                    rule: 'required',
                    // value: true,
                    errorMessage: 'Это обязательное поле',
                },
                {
                    rule: 'function',
                    validator: function () {
                        if (inputCheck.checked === false) {
                            activeCheck.classList.add('is-invalid');
                        } else {
                            activeCheck.classList.remove('is-invalid')
                            activeCheck.classList.add('just-validate-success-field')
                        }
                        return true
                    },
                }
            ])

            .onSuccess((event) => {
                console.log('Validation passes and form submitted', event);

                let formData = new FormData(event.target);

                console.log(...formData);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('Отправлено');
                        }
                    }
                }

                xhr.open('POST', 'mail.php', true);
                xhr.send(formData);

                event.target.reset();
            });

    }

    validateForm('.form', '#checkbox_1', form, form);

    return {
        validateForm: validateForm
    }
})()