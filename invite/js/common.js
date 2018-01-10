(function (doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi),
        dpr = isIOS? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self? dpr : 1; //被iframe引用时，禁止缩放
    var recalc = function () {
        var width = docEl.clientWidth;
        if (width / dpr > 1080) {
            width = 1080 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 1080) + 'px';
    };
    recalc();
})(document, window);
var wwidth;
var wheight;
function setsize(){
    wwidth = parseInt($(window).width());
    wheight = parseInt($(window).height());
    $(".wheight").css("height",wheight);
}
window.onload=function(){
    setsize();
    setTimeout(setsize,500);
}
