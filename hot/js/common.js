/* UA判定
---------------------------------------------------------- */
var ua           = navigator.userAgent.toLowerCase();
var isIE         = ua.match(/msie/) || ua.match(/trident/);
var isIE8        = ua.indexOf('msie 8.') != -1;
var isOldAndroid = ua.search(/android 2.[123]/) != -1 || ua.search(/android 4.0[34]/) != -1;

var isSP         = (ua.indexOf('windows') != -1 && ua.indexOf('phone') != -1)
    || ua.indexOf('iphone') != -1
    || ua.indexOf('ipod') != -1
    || (ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1)
    || (ua.indexOf('firefox') != -1 && ua.indexOf('mobile') != -1)
    || ua.indexOf('blackberry') != -1;

var isTB         = (ua.indexOf('windows') != -1 && ua.indexOf('touch') != -1)
    || ua.indexOf('ipad') != -1
    || (ua.indexOf('android') != -1 && ua.indexOf('mobile') == -1)
    || (ua.indexOf('firefox') != -1 && ua.indexOf('tablet') != -1)
    || ua.indexOf('kindle') != -1
    || ua.indexOf('silk') != -1
    || ua.indexOf('playbook') != -1;

if (!(isSP || isTB)) {
    $('html').addClass('no-touch');
}


if (isTB) {
    document.getElementById('viewport').setAttribute('content', 'width=1280');
    // $('html').removeClass('no-touch');
}

if (isIE) {
    $('html').addClass('ie');
}


/* 変数
---------------------------------------------------------- */
var mediaQuery = {};
var winW = $(window).width();
var winH = $(window).height();
var oldWinW    = winW;
var y    = $(window).scrollTop();

var clickTouchstart = 'click';
var clickTouchend   = 'click';

if (isSP || isTB) {
    clickTouchstart = 'touchstart';
    clickTouchend   = 'touchend';
}


/* jQueryオブジェクト
---------------------------------------------------------- */
var $header  = $('#header');
var $headerHome = $('.headerHome');
var $footer    = $('#footer');
var $pagetop   = $('#pagetop');

var $lanNav    = $('#lanNav');
var $lanBtn    = $('#lanNav').find('.lanBtn');
var $lanList   = $('#lanNav').find('.lanList');

var $nav     = $('#globalNav');
var $navBtn  = $('#navBtn');
var $layer = $('<div id="layer" class="layer"></div>'); //色背景

var overflg = false ;


/* onloadイベントの重複回避関数
---------------------------------------------------------- */
var addOnLoad = function(func) {
    try {
        window.addEventListener('load', func, false);
    } catch (e) {
        // ie
        window.attachEvent('onload', func);
    }
};


/* 多言語切り替えボタン
---------------------------------------------------------- */
var langSwitch = {
    init: function() {
        $lanNav.on('click', function() {
            if ($lanBtn.hasClass('active')) {
                // メニュー非表示
                $lanBtn.removeClass('active');
                $lanList.slideUp('fast');
            } else {
                // メニュー表示
                $lanBtn.addClass('active');
                $lanList.slideDown('fast');
            }
        });

        // マウスカーソルがメニュー上/メニュー外
        $lanNav.hover(function(){
            overflg = true;
        }, function(){
            overflg = false;
        });

        // メニュー領域外をクリックしたらメニューを閉じる
        $('body').click(function() {
            if (overflg == false) {
                $lanBtn.removeClass('active');
                $lanList.slideUp('fast');
            }
        });
    }
}
langSwitch.init();


/* スムーススクロール
---------------------------------------------------------- */
var smoothScroll = function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        if (target.length) {
            $('html, body').stop().animate({'scrollTop': $(target).offset().top}, 700, 'easeOutQuart');
            return false;
        }
    }
};


/* アコーディオンで開閉
---------------------------------------------------------- */
function accordion(selector1,selector2,visible) {
    // selector2が空の時は、selector1の隣の要素をtargetに入れる
    var target = (!selector2) ? $(selector1).next() : $(selector2);

    // visibleの値がfalseの時はtargetを初期非表示
    if (!visible) {
        target.hide();
    } else {
        $(selector1).addClass('active');
    }

    $(selector1).on('click', function(){
        if (!selector2) {target = $(this).next();}

        accordionFlg = true;

        if (target.is(':visible')) {
            //target.hide();
            target.slideUp(function() {
                accordionFlg = false;
            });
            $(this).removeClass('active');
        } else {
            target.slideDown(function() {
                accordionFlg = false;
            });
            $(this).addClass('active');
        }
    });
}

/* グローバルナビ
---------------------------------------------------------- */
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
                    $headerHome.css({'top': 0, 'opacity': 0}).removeClass('bg');
                    $headerHome.stop().delay(200).animate({'opacity': 1}, 150);
                });
            }
        }
    },
    destroy: function() {
        $(window).off('scroll', pcHeader.change);
        pcHeader.showFlg = false;
        $headerHome.removeAttr('style').removeClass('bg');
    }
};


/* スマホ用グローバルナビ
---------------------------------------------------------- */
var spGlobalNav = {
    init: function() {
        // 色背景のhtmlを仕込む
        $layer.appendTo($header).on('click', function(e) {
            e.preventDefault();
            spGlobalNav.hide();
        });
        $navBtn.on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                spGlobalNav.hide();
            } else {
                spGlobalNav.show();
            }
        });
    },
    show: function() {
        $navBtn.add($nav).addClass('active');
        $nav.stop().animate({'right': 0}, 300, 'easeInOutQuad');
        $navBtn.stop().animate({'right': 215}, 300, 'easeInOutQuad');
        $layer.stop().fadeIn(300);
    },
    hide: function() {
        $navBtn.add($nav).removeClass('active');
        $nav.stop().animate({'right': -215}, 300, 'easeInOutQuad');
        $navBtn.stop().animate({'right': 0}, 300, 'easeInOutQuad');
        $layer.stop().fadeOut(300);
    },
    destroy: function() {
        $navBtn.off(clickTouchstart);
        $navBtn.add($nav).removeClass('active').removeAttr('style');
        $layer.off(clickTouchstart).stop().removeAttr('style').remove();
    }
};


/* フッターの位置を必ずページ下部に
---------------------------------------------------------- */
var pcFooter = {
    init: function() {
        $footer.css('top', 0);
        var footerPos = $footer.offset().top;
        var footerH   = $footer.innerHeight();

        if (footerPos + footerH < winH) {
            $footer.css('top', winH - footerH - footerPos);
        }
    },
    destroy: function() {
        $footer.removeAttr('style');
    }
};


/* ページトップへ戻るボタン
---------------------------------------------------------- */
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


/* スムーススクロール
---------------------------------------------------------- */
$('a[href*=#]').not('.tabs a').on('click', smoothScroll);


/* スマホ端末では電話番号にリンクを張る
---------------------------------------------------------- */
// <span data-tel="0120-00-0000">0120-00-0000</span>
if (isSP) {
    $('[data-tel]').each(function() {
        var telNum = $(this).attr('data-tel').replace(/-/g, '');
        var telAnchor = '<a href="tel:' + telNum + '"></a>';
        $(this).wrap(telAnchor);
    });
}


/* タブの挙動
---------------------------------------------------------- */
var tab    = $('.tabs').find('li');
var detail = $('.tabsDetail').find('.detail');
tab.eq(0).addClass('active');
tab.find('a').on('click', function(){
    var target = $(this).attr('href');
    if ($(target).is(':hidden')) {
        btnScroll.destroy();
        tab.removeClass('active');
        $(this).parent().addClass('active');
        $(target).fadeIn(400);
        detail.not(target).hide();
        btnScroll.init();
    }
    return false;
});

/* タブの追従処理
---------------------------------------------------------- */
var btnScroll = (function() {
    var flg     = false;
    var $tabBtn = $('.tabs');
    var topH    = 230;
    var innerH  = $('.tabsDetail').innerHeight();
    var btnStop = $tabBtn.innerHeight() + 10;   // タブの高さ-ヘッダーとタブの隙間分
    return {
        init: function() {
            flg = false;
            innerH = $('.tabsDetail').innerHeight();
            btnScroll.fixed();
            $(window).on('scroll', btnScroll.fixed);
        },
        fixed: function() {
            innerH = $('.tabsDetail').innerHeight();
            if ($(window).scrollTop() > topH) {
                if (!flg) {
                    flg = true;
                    $tabBtn.addClass('fixed').removeClass('finish');
                }
                if ($(window).scrollTop() >= topH+innerH-btnStop) {
                    $tabBtn.removeClass('fixed').addClass('finish');
                } else {
                    $tabBtn.addClass('fixed').removeClass('finish');
                }
            } else {
                if (flg) {
                    flg = false;
                    $tabBtn.removeClass('fixed finish');
                }
            }
        },
        destroy: function() {
            $(window).off('scroll', btnScroll.fixed);
            $tabBtn.removeAttr('style').removeClass('fixed finish');
        }
    }
}());


/* CSSメディアクエリと連動する処理
---------------------------------------------------------- */
// メディアクエリを取得（css側でbody:beforeのcontentを指定しておくこと）
var getMediaQuery = function() {
    if (window.getComputedStyle) {
        var mq = window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/"/g, '');
    } else {
        var mq = 'pc';
    }
    return mq;
};

// カスタムイベントを設定
$(document).ready(function() {
    mediaQuery['new'] = getMediaQuery();
    mediaQuery['old'] = mediaQuery['new'];

    // ページ読み込み時のカスタムイベント
    $(window).triggerHandler('loadMediaQuery', mediaQuery);
});

$(window).on('resize orientationchange', function() {
    winW = $(window).width();
    winH = $(window).height();

    if (winW !== oldWinW) {
        mediaQuery['new'] = getMediaQuery();
    }

    if (mediaQuery['new'] === mediaQuery['old']) {
        // リサイズ時のカスタムイベント
        if (isSP || isTB) {
            // スマホの時は横幅に変更がある時のみイベント発生（iPhone対策）
            if (winW !== oldWinW) {
                $(window).triggerHandler('resizeMediaQuery', mediaQuery);
            }
        } else {
            $(window).triggerHandler('resizeMediaQuery', mediaQuery);
        }
    } else {
        // SP←→PCとメディアクエリが変更になった時のカスタムイベント
        $(window).triggerHandler('changeMediaQuery', mediaQuery);
    }

    mediaQuery['old'] = mediaQuery['new'];
    oldWinW = winW;
});


// 初回ロード時、メディアクエリが変更になった時
$(window).on('loadMediaQuery changeMediaQuery', function(e, mediaQuery) {
    if (mediaQuery['new'] === 'pc') {
        pcHeader.init();
        pcFooter.init();
        pcPagetop.init();
        btnScroll.init();

        // スマホからPCに切り替わった時
        if (mediaQuery['new'] !== mediaQuery['old']) {
            spGlobalNav.destroy();
        }

    } else if (mediaQuery['new'] === 'sp') {
        spGlobalNav.init();
        btnScroll.destroy();

        // PCからスマホに切り替わった時
        if (mediaQuery['new'] !== mediaQuery['old']) {
            pcHeader.destroy();
            pcPagetop.destroy();
            pcFooter.destroy();
        }
    }
});

$(window).on('resizeMediaQuery', function(e, mediaQuery) {

    if (mediaQuery['new'] === 'pc') {
        // pcFooter.init();
        innerH = $('.tabsDetail').innerHeight();

        if (mediaQuery['new'] !== mediaQuery['old']) {
        }
    } else if (mediaQuery['new'] === 'sp') {
        if (mediaQuery['new'] !== mediaQuery['old']) {
            // pcFooter.destroy();
        }
    }
});

$(window).on('scroll', function() {
    y = $(window).scrollTop();
});


// ページ読み込み時に実行
addOnLoad(function(){

});
