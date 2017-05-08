$(document).ready(function() {
    pcHeader.init();
    pcPagetop.init();

    $("#btn-menu").on('click',function(){
        $(this).toggleClass("btn-menu-close");
        $("#globalNav .navArea").slideToggle(200);
    })
});

/* 导航条
 ---------------------------------------------------------- */
var winW = $(window).width();
var winH = $(window).height();
var oldWinW    = winW;
var y    = $(window).scrollTop();

var $header  = $('#header');
var $headerHome = $('.headerHome');
var pcHeader = {
    showFlg: false,
    init: function() {
        pcHeader.change();
        $(window).on('scroll', pcHeader.change);
    },
    change: function() {
        if ($(window).scrollTop() > 100) {
            if (pcHeader.showFlg === false) {
                pcHeader.showFlg = true;
                $headerHome.animate({'top': -100}, 1, function(){
                    $headerHome.addClass('bg');
                    $headerHome.stop().delay(200).animate({'top': 0}, 300);
                });
            }
        } else {
            if (pcHeader.showFlg) {
                pcHeader.showFlg = false;
                $headerHome.stop().animate({'top': -100}, 300, function(){
                    $headerHome.css({'top': 0, 'opacity': 0});
                    $headerHome.stop().delay(200).animate({'opacity': 1}, 150);
                });
            }
        }
    },
    destroy: function() {
        $(window).off('scroll', pcHeader.change);
        pcHeader.showFlg = false;
        $headerHome.removeAttr('style');
    }
};
var $pagetop   = $('#pagetop');
var $footer    = $('#footer');
var flgPagetop = false;
var pcPagetop = {
    init: function() {
        flgPagetop = false;
        $pagetop.css({'bottom': -110});
        pcPagetop.show();
        $(window).on('scroll', pcPagetop.show);
    },
    show: function() {
        if ($(window).scrollTop() > 100) {
            if (!flgPagetop) {
                flgPagetop = true;
                $pagetop.stop().delay(300).animate({'bottom': 20}, 600, 'easeOutBack');
            }
            if ($(window).scrollTop() >= $footer.offset().top - winH -20) {
                $pagetop.addClass('stop');
            } else {
                $pagetop.removeClass('stop');
            }
        } else {
            if (flgPagetop) {
                flgPagetop = false;
                $pagetop.stop().animate({'bottom': -110}, 500);
            }
        }
    },
    destroy: function() {
        $(window).off('scroll', pcPagetop.show);
        $pagetop.removeAttr('style').removeClass('stop');
    }
};