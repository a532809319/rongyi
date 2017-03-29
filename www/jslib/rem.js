(function() {

    var html = document.documentElement;
    var resizeEvent = 'orientationchnage' in window ? 'orientationchange' : 'resize';
    var recalculation = function() {
        var clientWidth = html.clientWidth;
        if (!clientWidth) {
            return;
        }
        html.style.fontSize = (140.625 * (clientWidth / 720.00)) + "%";
        // console.log("html style fontsize >> " + html.style.fontSize);
    }
    if (!html.addEventListener) {
        return;
    }
    window.addEventListener(resizeEvent, recalculation, false);
    document.addEventListener("DOMContentLoaded", recalculation, false);

})();
