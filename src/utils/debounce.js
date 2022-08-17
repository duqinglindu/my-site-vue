/**
 * 防抖
 * @param {*} callback 要做的事情 
 * @param {*} time  等多久后在做
 */
function debounce(callback, time) {
    var timer; 
    return function () {
        var args = arguments;
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            callback.apply(null, args);
            timer = null;
        }, time);
    }
}
export default debounce;