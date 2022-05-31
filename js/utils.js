var utils = (function () {
    let ENTER = 'Enter';
    let ESCAPE = 'Escape'

    return {
        enter: function (evt, callback) {
            if (evt.key === ENTER) {
                callback();
            }
        },
        escape: function (evt, callback) {
            if (evt.key === ESCAPE) {
                callback();
            }
        }
        
    }
})();