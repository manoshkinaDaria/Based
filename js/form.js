'use strict'
const popup = (function () {
    const sectionAboutButton = document.querySelector('.section-about__button');
    const blockShadow = document.querySelector('.block__shadow');
    const popupForm = document.querySelector('.popup');
    const closeIcon = document.querySelector('.popup__close')

    const openPopup = function () {
        popupForm.classList.remove('hidden');
        popupForm.style.left = 340 + 'px';
        popupForm.style.top = 100 + 'px';
        blockShadow.classList.remove('hidden');
        document.addEventListener('keydown', handlerEscapePress)
    };
// сюда обработчик? 

    
    const closePopup = function () {
        popupForm.classList.add('hidden');
        blockShadow.classList.add('hidden');
        document.removeEventListener('keydown', handlerEscapePress)
    }

    const handlerEscapePress = function (evt) {
        utils.escape(evt, closePopup)
    };



    sectionAboutButton.addEventListener('click', openPopup);
    closeIcon.addEventListener('click', closePopup);
    

})();
