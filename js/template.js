const template = (function () {
    const dataForm = document.querySelector('.data-form');


    const getFormTemplate = function () {
        return document.querySelector('.check_template').content.cloneNode(true);
    }
    dataForm.appendChild(getFormTemplate())

return {
    getFormTemplate: getFormTemplate
}

})();

        // jBoxContainer.style = "background-color: #FFDB08; border-radius: 50px;"
        // const jBoxTitle = jBoxContainer.querySelector('.jBox-title');
        // jBoxTitle.style = "border-radius: 50px 50px 0 0; border-bottom: none; background-color: #FFDB08; padding-right: 40px; padding-top: 41px; padding-left: 20px; "
        // const jBoxCloseButton = jBoxContainer.querySelector('.jBox-closeButton');
        // const closer = jBoxCloseButton.querySelector('.jBox-closeButton path')
        // jBoxCloseButton.style = " background-image: url(img/close.svg);background-repeat: no-repeat; top: 31px;right: 15px;"
        // closer.style = "display: none;"
        // const boxTitle = jBoxContainer.querySelector('.data-form__title');
        // boxTitle.style = "margin-bottom: 0px";