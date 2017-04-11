
var $collection        = $('#collectionSlider');
var $collectionSlides  = $collection.children('.slider');

var $aboutLi           = $('#aboutList').find('li');
var $brandClothes      = $aboutLi.find('.clothes');
var $brandShoes        = $aboutLi.find('.shoes');
var $brandGift         = $aboutLi.find('.gift');

var $aboutArea         = $('#about');
var $about01           = $aboutArea.find('.about01');
var $about02           = $aboutArea.find('.about02');
var $about03           = $aboutArea.find('.about03');

var $characterArea     = $('#character');
var $characterBg       = $('#characterBg');
var $cloud01           = $characterBg.find('.cloud01');
var $cloud02           = $characterBg.find('.cloud02');
var $cloud03           = $characterBg.find('.cloud03');
var $cloud04           = $characterBg.find('.cloud04');

var $beans             = $('#charaBeans');
var $cabbit            = $('#charaCabbit');
var $plane             = $('#charaPlane');

var aboutTop           = $aboutArea.offset().top;
var about01Top         = $about01.offset().top;
var about02Top         = $about02.offset().top;
var about03Top         = $about03.offset().top;
var charaTop           = $characterArea.offset().top;

$(window).focus();


/* フィルムロール
---------------------------------------------------------- */
var num                = $collectionSlides.length;


if (num < 15) {
    for (var i = 0; i <= 4; i++) {
        $collection.children().last().after($collectionSlides.eq(i).clone(false)).addClass('cloned');
    }
}

function imgSlide() {
  var slider = $('#sliderPro').sliderPro({
    width: '220px',
    height: 339,
    visibleSize: '100%',
    forceSize: 'fullWidth',
    animation: 500,
    slideDistance: 0,
    autoplayOnHover:'none',
    buttons: false,
    arrows: true,
    breakpoints: {
        767: {
            width: '260px',
            height: 383,
            slideDistance: 20
        }
    }
  });
}


/* ABOUT BRAND アニメーション
---------------------------------------------------------- */

// pngアニメ
var circleH = 94;
var max_frame = 6;

var frame01 = 0;
var frame02 = 0;
var frame03 = 0;

var clothFlg = false;
var shoesFlg = false;
var giftFlg  = false;
var clothFlgSp = false;
var shoesFlgSp = false;
var giftFlgSp  = false;

var aboutFlg  = false;

var bisSpFlg01 = false;
var bisSpFlg02 = false;
var bisSpFlg03 = false;

var timer01;
var timer02;
var timer03;


function clothesLoop() {
  timer01 = setTimeout(function() {
    var firstDelay01 = (frame01 == 0) ? 2700 : 0; //最初のフレームだけ遅延
    if (!clothFlg) {
        firstDelay01 = 1800;
    }
    $brandClothes.delay(firstDelay01).queue(function() {
        clothFlg = true;
        clothFlgSp = true;
        $brandClothes.delay(200).css({
            "background-position":"0 "+ -circleH * frame01 +"px"
        }).dequeue();
        frame01++;
        clothesLoop();

        if(frame01>=max_frame){
            frame01 = 0;
        };
    });
  });
}

function shoesLoop() {
  timer02 = setTimeout(function() {
    var firstDelay02 = (frame02 == 0) ? 2700 : 0; //最初のフレームだけ遅延

    if (!shoesFlg) {
        firstDelay02 = 2700;
    }

    $brandShoes.delay(firstDelay02).queue(function() {
        shoesFlg = true;
        $brandShoes.delay(200).css({
            "background-position":"0 "+ -circleH * frame02 +"px"
        }).dequeue();
        frame02++;
        shoesLoop();

        if(frame02>=max_frame){
            frame02 = 0;
        };
    });
  });
}

function giftLoop() {
  timer03 = setTimeout(function() {
    var firstDelay03 = (frame03 == 0) ? 2700 : 0; //最初のフレームだけ遅延

    if (!giftFlg) {
        firstDelay03 = 3600;
    }

    $brandGift.delay(firstDelay03).queue(function() {
        giftFlg = true;
        $brandGift.delay(200).css({
            "background-position":"0 "+ -circleH * frame03 +"px"
        }).dequeue();
        frame03++;
        giftLoop();

        if(frame03>=max_frame){
            frame03 = 0;
        };
    });
  });
}

function clothesLoopSp() {
  timer01 = setTimeout(function() {
    var firstDelay01 = (frame01 == 0) ? 2700 : 0; //最初のフレームだけ遅延
    if (!clothFlg) {
        firstDelay01 = 0;
    }
    $brandClothes.delay(firstDelay01).queue(function() {
        clothFlg = true;
        clothFlgSp = true;
        $brandClothes.delay(200).css({
            "background-position":"0 "+ -circleH * frame01 +"px"
        }).dequeue();
        frame01++;
        clothesLoop();

        if(frame01>=max_frame){
            frame01 = 0;
        };
    });
  });
}

function shoesLoopSp() {
  timer02 = setTimeout(function() {
    var firstDelay02 = (frame02 == 0) ? 2700 : 0; //最初のフレームだけ遅延

    if (!shoesFlg) {
        firstDelay02 = 900;
    }

    $brandShoes.delay(firstDelay02).queue(function() {
        shoesFlg = true;
        $brandShoes.delay(200).css({
            "background-position":"0 "+ -circleH * frame02 +"px"
        }).dequeue();
        frame02++;
        shoesLoop();

        if(frame02>=max_frame){
            frame02 = 0;
        };
    });
  });
}

function giftLoopSp() {
  timer03 = setTimeout(function() {
    var firstDelay03 = (frame03 == 0) ? 2700 : 0; //最初のフレームだけ遅延

    if (!giftFlg) {
        firstDelay03 = 1800;
    }

    $brandGift.delay(firstDelay03).queue(function() {
        giftFlg = true;
        $brandGift.delay(200).css({
            "background-position":"0 "+ -circleH * frame03 +"px"
        }).dequeue();
        frame03++;
        giftLoop();

        if(frame03>=max_frame){
            frame03 = 0;
        };
    });
  });
}

// ビスケット回転
function biscuitRotate(biscuit) {
    biscuit.rotate({
        duration: 400,
        angle: 0,
        animateTo: 45,
        easing: $.easing.easeInSine
    });
}

function biscuit() {
    biscuitRotate($('.bgPink'));
    setTimeout(function(){
        biscuitRotate($('.bgGreen'));
    },450);
    setTimeout(function(){
        biscuitRotate($('.bgOrange'));
    },900);
}


// ビスケット回転後のアイコンアニメーション
var brandLoop ={
    init: function() {
        clothesLoop();
        shoesLoop();
        giftLoop();
    },
    initSp: function() {
        brandLoop.destroy();
        clothesLoopSp();
        shoesLoopSp();
        giftLoopSp();
    },
    destroy: function() {
        clearTimeout(timer01);
        clearTimeout(timer02);
        clearTimeout(timer03);
        $brandClothes.add($brandShoes).add($brandGift).finish().removeAttr('style');
        clothFlg = false;
        shoesFlg = false;
        giftFlg  = false;
    }
}

// ABOUT BRANDのとこまで来たらアニメーションスタート

function aboutMovePc() {
    if (isTB) {
        if (aboutTop - 800 < y) {
            if (!aboutFlg) {
                aboutFlg = true;
                biscuit();
                brandLoop.init();
            }
        }
    } else {
        if (aboutTop - 300 < y) {
            if (!aboutFlg) {
                aboutFlg = true;
                biscuit();
                brandLoop.init();
            }
        }
    }

}

function aboutMoveSp() {
    aboutFlg = true;
    if (about01Top - 250 < y) {
        if (!bisSpFlg01) {
            bisSpFlg01 = true;
            biscuitRotate($('.bgPink'));
        }
    }
    if (about02Top - 250 < y) {
        if (!bisSpFlg02) {
            bisSpFlg02 = true;
            biscuitRotate($('.bgGreen'));
        }
    }
    if (about03Top - 250 < y) {
        if (!bisSpFlg03) {
            bisSpFlg03 = true;
            biscuitRotate($('.bgOrange'));
        }
    }
}


/* CHARACTER アニメーション
---------------------------------------------------------- */

// 雲のアニメーション

function cloud01() {
    $cloud01.add($cloud04).animate({
        marginTop: '-=4px'
    }, 1000).animate({
        marginTop: '+=4px'
    }, 1000);
    setTimeout('cloud01()',100);
}

function cloud02() {
    $cloud02.animate({
        marginTop: '-=8px'
    }, 1200).animate({
        marginTop: '+=8px'
    }, 1200);
    setTimeout('cloud02()', 2400);
}

function cloud03() {
    $cloud03.animate({
        marginTop: '+=8px'
    }, 1200).animate({
        marginTop: '-=8px'
    }, 1200);
    setTimeout('cloud03()', 2400);
}

$(function () {
    setTimeout('cloud01()');
    setTimeout('cloud02()');
    setTimeout('cloud03()');
});


// ビーンズくんたち

var charaH = 250;
var charaHlong = 260;

var chara_max_frame = 12;

var frame04 = 0;
var frame05 = 0;

var cabbitFlg = false;


function beansLoop() {
  setTimeout(function() {
    var firstDelay04 = (frame04 == 0) ? 2000 : 0; //最初のフレームだけ遅延

    $beans.delay(firstDelay04).queue(function() {
        $beans.delay(150).css({
            "background-position":"0 "+ (-charaH * frame04 -1) +"px"
        }).dequeue();
        frame04++;
        beansLoop();

        if(frame04>=chara_max_frame){
            frame04 = 0;
        };
    });
  });
}

function cabbitLoop() {
    setTimeout(function() {
        var firstDelay05 = (frame05 == 0) ? 2000 : 0; //最初のフレームだけ遅延

        if (!cabbitFlg) {
            firstDelay05 = 3800;
        }

        $cabbit.delay(firstDelay05).queue(function() {
            cabbitFlg = true;
            $cabbit.delay(150).css({
                "background-position":"0 "+ -charaHlong * frame05 +"px"
            }).dequeue();
            frame05++;
            cabbitLoop();

            if(frame05>=chara_max_frame){
                frame05 = 0;
            };
        });
    });
}


var charaLoop = {
    init: function(){
        beansLoop();
        cabbitLoop();
    },
    destroy: function() {
        $beans.add($cabbit).finish().removeAttr('style');
        cabbitFlg= false;
        frame04 = 0;
        frame05 = 0;
    }
}


// 飛行機

var planeMoveFlg = false;
var planeTimer01;
var planeTimer02;

function planeLoopPc() {
    planeTimer01 = setTimeout(function() {
        $plane.animate({
        'right':2000,
        },{
            'duration': 55000,'easing': 'easeOutSine'
        }).queue(function(){
            $(this).css({'right':-130}).dequeue();
        });
        planeLoopPc();
    });
}

function planeLoopSp() {
    planeTimer02 = setTimeout(function() {
        $plane.animate({
        'right':768,
        },{
            'duration': 40000,'easing': 'linear'
        }).queue(function(){
            $(this).css({'right':-100}).dequeue();
        });
        planeLoopSp();
    });
}

var planeMove = {
    init: function() {
        planeLoopPc();
        planeMoveFlg = true;
    },
    initSp: function() {
        planeMoveFlg = true;
        planeLoopSp();
    },
    destroy: function() {
        clearTimeout(planeTimer01);
        clearTimeout(planeTimer02);
        $plane.finish().removeAttr('style');
    }
}


function planeMovePc() {
    $(window).on('scroll', function() {
        if (charaTop - 600 < y) {
            if(!planeMoveFlg) {
                planeLoopPc();
                planeMoveFlg = true;
            }
        }
    });
}

function planeMoveSp() {
    $(window).on('scroll', function() {
        if (charaTop - 500 < y) {
            if(!planeMoveFlg) {
                planeMoveFlg = true;
                planeLoopSp();
            }
        }
    });
}

// このウィンドウからフォーカスがはずれたらsetintervalをクリア
$(window).bind("focus",function(){
    if (aboutFlg == true) {
        brandLoop.destroy();
        brandLoop.init();
    }
}).bind("blur",function(){
    if (aboutFlg == true) {
        brandLoop.destroy();
    }
});


// 初回ロード時、メディアクエリが変更になった時
$(window).on('loadMediaQuery changeMediaQuery', function(e, mediaQuery) {
    imgSlide();

    aboutTop  = $aboutArea.offset().top;
    charaTop  = $characterArea.offset().top;

    charaLoop.init();

    if (mediaQuery['new'] === 'pc') {

        circleH = 94;
        charaH = 250;
        charaHlong = 260;



        $(window).on('scroll', function() {
            aboutMovePc();

            if (charaTop - 600 < y) {
                if(!planeMoveFlg) {
                    planeMove.init();
                }
            }
        });

        // スマホからPCに切り替わった時
        if (mediaQuery['new'] !== mediaQuery['old']) {
            charaTop           = $characterArea.offset().top;

            brandLoop.destroy();
            brandLoop.init();
            charaLoop.destroy();

            planeMove.destroy();
            planeMove.init();

        }

    } else if (mediaQuery['new'] === 'sp') {

        about01Top         = $about01.offset().top;
        about02Top         = $about02.offset().top;
        about03Top         = $about03.offset().top;

        circleH = 75;
        charaH = 125;
        charaHlong = 130;

        brandLoop.initSp();

        $(window).on('scroll', function() {
            aboutMoveSp();

            if (charaTop - 500 < y) {
                if(!planeMoveFlg) {
                    planeMove.initSp();
                }
            }
        });

        // PCからスマホに切り替わった時
        if (mediaQuery['new'] !== mediaQuery['old']) {
            charaTop           = $characterArea.offset().top;
            charaLoop.destroy();
            planeMove.destroy();
            planeMove.initSp();

        }
    }
});
