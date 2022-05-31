const modalWindow = (function () {
    const button = document.querySelector('.invitation__button');
    const buttonAbout = document.querySelector('.section-about__button');

    const newForm = $('.form').clone();
    const labelCheck = newForm.find('.form__label_checkbox');
    const input = newForm.find('.form__checkbox');
    labelCheck.attr('for', 'modal__label_checkbox');
    input.attr('id', 'modal__label_checkbox');
    newForm.addClass('modal-form')
    const modal = new jBox('Modal', {
        content: newForm,
        title: $('.data-form__title').clone(),
        closeButton: "title",
        onCreated: () => {
            validate.validateForm('.modal-form');
        },

    })

    button.addEventListener('click', function () {
        modal.open()
    });
    buttonAbout.addEventListener('click', function () {
        modal.open()
    });



})();

