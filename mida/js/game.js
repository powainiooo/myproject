var stage;

var loadinglist = {};
var loadingData = new Array(
    {name:"L_loading",path:imgsrc+"./images/loading.png"},
    {name:"L_line",path:imgsrc+"./images/L_line.png"}
);

var imglist = {};
var imgData = new Array(
    {name:"logo",path:imgsrc+"./images/logo.png"},
    {name:"logo2",path:imgsrc+"./images/logo2.png"},
    {name:"beespart",path:imgsrc+"./images/beespart.png"},
    {name:"beesRotate",path:imgsrc+"./images/beesRotate.png"},
    {name:"title1",path:imgsrc+"./images/title1.png"},
    {name:"bg-cover",path:imgsrc+"./images/bg-cover.png"},
    {name:"circle",path:imgsrc+"./images/circle.png"},
    {name:"icons",path:imgsrc+"./images/icons.png"},
    {name:"lines",path:imgsrc+"./images/lines.png"},
    {name:"lines2",path:imgsrc+"./images/lines2.png"},
    {name:"sun",path:imgsrc+"./images/sun.png"},
    {name:"vedio",path:imgsrc+"./images/vedio.jpg"},
    {name:"p6_11",path:imgsrc+"./images/p6_11.jpg"},
    {name:"p6_12",path:imgsrc+"./images/p6_12.jpg"},
    {name:"p6_13",path:imgsrc+"./images/p6_13.jpg"},
    {name:"p6_14",path:imgsrc+"./images/p6_14.jpg"},
    {name:"p6_21",path:imgsrc+"./images/p6_21.jpg"},
    {name:"p6_22",path:imgsrc+"./images/p6_22.jpg"},
    {name:"p6_23",path:imgsrc+"./images/p6_23.jpg"},
    {name:"p6_24",path:imgsrc+"./images/p6_24.jpg"},
    {name:"p6_31",path:imgsrc+"./images/p6_31.jpg"},
    {name:"p6_32",path:imgsrc+"./images/p6_32.jpg"},
    {name:"p6_33",path:imgsrc+"./images/p6_33.jpg"},
    {name:"p6_34",path:imgsrc+"./images/p6_34.jpg"},
    {name:"p9_pic1",path:imgsrc+"./images/p9_pic1.png"},
    {name:"bg",path:imgsrc+"./images/bg.jpg"},
    {name:"bg4",path:imgsrc+"./images/bg4.jpg"},
    {name:"bg7",path:imgsrc+"./images/bg7.jpg"},
    {name:"bee1",path:imgsrc+"./images/bee1.png"},
    {name:"bee2",path:imgsrc+"./images/bee2.png"}
);


function main(){
    LGlobal.setDebug(true);
    //全屏操作
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    //添加舞台
    stage = new LSprite();
    //stage.graphics.drawRect(0,"#eee93a",[0,0,750,1125],true,"#eee93a");
    addChild(stage);

    //addChild(new FPS());


    //添加加载层
    LLoadManage.load(
        loadingData,
        function(progress){

        },
        function(result){
            loadinglist = result;
            loading_gameData();
        }
    );
}

function loading_gameData(){
    //添加加载层
    var loadinglayer = new LoadingDoufen();
    stage.addChild(loadinglayer);
    LLoadManage.load(
        imgData,
        function(progress){
            loadinglayer.setProgress(progress);
        },
        function(result){
            imglist = result;
            stage.removeChild(loadinglayer);
            loadinglayer = null;
            page3Init();
        }
    );
}

function page1Init(){
    page1Layer = new LSprite();
    page1Layer.graphics.drawRect(0,"#eee93a",[0,0,750,1125],true,"#ffff00");
    stage.addChild(page1Layer);

    var list = LGlobal.divideCoordinate(1957, 664, 1, 11);
    var data = new LBitmapData(imglist["logo"]);
    var logo = new LAnimationTimeline(data, list);
    logo.x = 286;
    logo.y = 230;
    logo.speed = 8;
    logo.setLabel("end",0,10,1,false);
    logo.addFrameScript("end",function(){
        logo.stop();
        objMove.call(logo,{
            direc:'out',
            t:0.5,
            delay:0.5,
            callback:page2Init
        })
    });
    page1Layer.addChild(logo);
}

function page2Init(){
    page2Layer = new LSprite();
    page2Layer.graphics.drawRect(0,"#ffff00",[0,0,750,1125],true,"#ffff00");
    page2Layer.alpha = 0;
    stage.addChild(page2Layer);

    var bg = new LBitmap(new LBitmapData(imglist['bg']));
    bg.alpha = 0;
    page2Layer.addChild(bg);

    var bee = new LBitmap(new LBitmapData(imglist['bee1']));
    bee.y = 310;//585
    page2Layer.addChild(bee);

    var logo = new LBitmap(new LBitmapData(imglist['logo2']));
    logo.x = 58;
    logo.y = 73;
    logo.alpha = 0;
    page2Layer.addChild(logo);

    var title = new LSprite();
    title.pic = new LBitmap(new LBitmapData(imglist["title1"]));
    title.pic.x = -267;
    title.pic.y = -108;
    title.addChild(title.pic);
    title.x = 375;
    title.y = 380;
    title.alpha = 0;
    page2Layer.addChild(title);

    var btn = new ClickLogo(2,538,44,function(){
        btn.canClick = false;
        objMove.call(page2Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page2Layer);
                page2Layer = null;
                page3Init();
            }
        });
    });
    btn.alpha = 0;
    page2Layer.addChild(btn);

    objMove.call(page2Layer,{
        t:1,
        callback:function(){
            LTweenLite.to(bee,1,{y:585,ease:LEasing.Cubic.easeOut});
            LTweenLite.to(bg,1,{alpha:1,ease:LEasing.None.easeIn,onComplete:function(){
                page2Layer.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#fff");
            }});
        }
    });
    objMove.call(logo,{
        type:'left',
        ei:'Back',
        delay:3
    });
    objMove.call(title,{
        type:'scaleS2L',
        ei:'Back',
        delay:3.4
    });
    objMove.call(btn,{
        delay:4.4,
        callback:function(){
            btn.move();
        }
    });

    //LTweenLite.to(bg,1,{y:-1120,delay:7,ease:LEasing.None.easeIn,onComplete:page4Init});
}

function page3Init(){
    page3Layer = new LSprite();
    page3Layer.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#fff");
    stage.addChild(page3Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,378],[0,800]]);
    //bgUpCover.y = -800;
    var bgUp = new LSprite();
    bgUp.graphics.drawRect(0,"#fff",[0,0,750,800],true,"#ffff00");
    bgUp.mask = bgUpCover;
    page3Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,800],[750,378],[750,1125],[0,1125]]);
    //bgDownCover.y = 800;
    var bgDown = new LSprite();
    bgDown.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2eb7a4");
    bgDown.mask = bgDownCover;
    page3Layer.addChild(bgDown);

    var body = new LBitmap(new LBitmapData(imglist["beespart"],0,48,215,168));
    body.x = 138;
    body.y = 510;
    body.alpha = 0;
    page3Layer.addChild(body);

    var wing = new LBitmap(new LBitmapData(imglist["beespart"],230,246,164,44));
    wing.x = 170;
    wing.y = 440;
    wing.alpha = 0;
    page3Layer.addChild(wing);

    var inside = new LBitmap(new LBitmapData(imglist["beespart"],50,227,117,105));
    inside.x = 305;
    inside.y = 540;
    inside.alpha = 0;
    page3Layer.addChild(inside);

    var head = new LBitmap(new LBitmapData(imglist["beespart"],231,0,221,220));
    head.x = 412;
    head.y = 450;
    head.alpha = 0;
    page3Layer.addChild(head);

    var list = LGlobal.divideCoordinate(5600, 415, 1, 8);
    var data = new LBitmapData(imglist["beesRotate"]);
    var bees = new LAnimationTimeline(data, list);
    bees.x = 25;
    bees.y = 360;
    bees.speed = 10;
    bees.alpha = 0;
    page3Layer.addChild(bees);
    bees.setLabel("show",0,0,1,false);
    bees.setLabel("hide",0,1,1,false);
    bees.addFrameScript("show",function(){
        vedio.visible = true;
        hintHead.visible = true;
        hintWings.visible = true;
        hintBody.visible = true;
        hintVedio.visible = true;
    });
    bees.addFrameScript("hide",function(){
        vedio.visible = false;
        hintHead.visible = false;
        hintWings.visible = false;
        hintBody.visible = false;
        hintVedio.visible = false;
    });
    bees.stop();

    var vedio = new Zimg([imglist['vedio']],240,558);
    vedio.alpha = 0;
    page3Layer.addChild(vedio);

    var hintHead = new ClickHint(582,586,'#615724');
    hintHead.alpha = 0;
    page3Layer.addChild(hintHead);
    hintHead.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        objMove.call(infoHead,{type:'up',ei:'Back'})
    });

    var hintWings = new ClickHint(300,465,'#615724');
    hintWings.alpha = 0;
    page3Layer.addChild(hintWings);
    hintWings.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        objMove.call(infoWings,{type:'up',ei:'Back'})
    });

    var hintBody = new ClickHint(394,644,'#b2b2b2');
    hintBody.alpha = 0;
    page3Layer.addChild(hintBody);
    hintBody.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        objMove.call(infoBody,{type:'down',ei:'Back'})
    });

    var hintVedio = new ClickHint(280,583,'#fff');
    hintVedio.alpha = 0;
    page3Layer.addChild(hintVedio);
    hintVedio.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        var media = document.getElementById('movie');
        //media.style.display = 'block';
        media.play();
        setInterval(function(){
            if(media.ended){
                media.style.display = 'none';
            }
        },1000);
        media.addEventListener('pause',function(){
            media.style.display = 'none';
        },false);
    });

    var infoWings = new LButton(new Zimg([imglist['icons'],750,0,331,309],28,69));
    infoWings.alpha = 0;
    page3Layer.addChild(infoWings);
    infoWings.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        objMove.call(infoWings,{type:'down',direc:'out',ei:'Back',em:'easeIn'})
    });

    var infoHead = new LButton(new Zimg([imglist['icons'],1096,0,331,309],390,66));
    infoHead.alpha = 0;
    page3Layer.addChild(infoHead);
    infoHead.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        objMove.call(infoHead,{type:'down',direc:'out',ei:'Back',em:'easeIn'})
    });

    var infoBody = new LButton(new Zimg([imglist['icons'],375,644,333,312],70,743));
    infoBody.alpha = 0;
    page3Layer.addChild(infoBody);
    infoBody.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        objMove.call(infoBody,{type:'up',direc:'out',ei:'Back',em:'easeIn'})
    });

    var btnRotate = new LButton(new Zimg([imglist['icons'],266,704,49,44]));
    btnRotate.x = 350;
    btnRotate.y = 800;
    btnRotate.alpha = 0;
    page3Layer.addChild(btnRotate);
    btnRotate.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(btnRotate.alpha == 1){
            bees.play();
        }
    });
    btnRotate.addEventListener(LMouseEvent.MOUSE_UP,function(){
        if(btnRotate.alpha == 1){
            bees.stop();
        }
    });

    var btn = new ClickLogo(3,538,970,function(){
        btn.canClick = false;
        objMove.call(page3Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page3Layer);
                page3Layer = null;
                page4Init();
            }
        });

    });
    btn.alpha = 0;
    page3Layer.addChild(btn);

    objMove.call(bgUpCover,{type:'down',dis:800});
    objMove.call(bgDownCover,{type:'up',dis:800});
    objMove.call(body,{type:'fade',delay:1});
    objMove.call(head,{type:'fade',delay:1.2});
    objMove.call(wing,{type:'fade',delay:1.4});
    objMove.call(inside,{type:'fade',delay:1.6,callback:function(){
        LTweenLite.to(body,0.4,{x:68,delay:0.5,ease:LEasing.Cubic.easeOut}).to(body,0.8,{x:178,alpha:0,ease:LEasing.Cubic.easeOut});
        LTweenLite.to(head,0.4,{x:502,delay:0.5,ease:LEasing.Cubic.easeOut}).to(head,0.8,{x:352,alpha:0,ease:LEasing.Cubic.easeOut});
        LTweenLite.to(wing,0.4,{x:120,y:360,delay:0.5,ease:LEasing.Cubic.easeOut}).to(wing,0.8,{x:200,y:470,alpha:0,ease:LEasing.Cubic.easeOut});
        LTweenLite.to(inside,0.8,{alpha:0,delay:0.9,ease:LEasing.Cubic.easeOut});
    }});
    objMove.call(bees,{type:'fade',t:0.8,delay:3.5});
    objMove.call(btnRotate,{type:'fade',delay:3.7});
    objMove.call(hintBody,{type:'fade',delay:3.9,callback:function(){
        ZBlink.call(hintBody)
    }});
    objMove.call(hintHead,{type:'fade',delay:4.1,callback:function(){
        ZBlink.call(hintHead)
    }});
    objMove.call(hintWings,{type:'fade',delay:4.3,callback:function(){
        ZBlink.call(hintWings)
    }});
    objMove.call(vedio,{type:'fade',delay:4.5});
    objMove.call(hintVedio,{type:'fade',delay:4.7,callback:function(){
        ZBlink.call(hintVedio)
    }});
    objMove.call(btn,{type:'fade',delay:6,callback:function(){
        btn.move();
    }});
}

function page4Init(){
    page4Layer = new LSprite();
    stage.addChild(page4Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,264],[0,597]]);
    var bgUp = new Zimg([imglist['bg-cover']]);
    bgUp.mask = bgUpCover;
    page4Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,597],[750,264],[750,1125],[0,1125]]);
    var bg = new Zimg([imglist['bg4']]);
    bg.mask = bgDownCover;
    page4Layer.addChild(bg);

    var title1 = new Zimg([imglist['icons'],0,74,335,75],280,120);
    title1.alpha = 0;
    page4Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],0,0,344,75],63,52);
    title2.alpha = 0;
    page4Layer.addChild(title2);

    var btn = new ClickLogo(4,548,34,function(){
        btn.canClick = false;
        objMove.call(page4Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page4Layer);
                page4Layer = null;
                page5Init();
            }
        });
    });
    btn.alpha = 0;
    page4Layer.addChild(btn);

    var circle = new Zimg([imglist['circle']],37,193);
    page4Layer.addChild(circle);

    var rectbg1 = new ZRimg([imglist['icons'],521,957,163,184],-81,-92);
    rectbg1.x = 110;
    rectbg1.y = 560;
    rectbg1.alpha = 0;
    page4Layer.addChild(rectbg1);

    var rectbg2 = new ZRimg([imglist['icons'],521,957,163,184],-81,-92);
    rectbg2.x = 288;
    rectbg2.y = 490;
    rectbg2.alpha = 0;
    page4Layer.addChild(rectbg2);

    var rectbg3 = new ZRimg([imglist['icons'],521,957,163,184],-81,-92);
    rectbg3.x = 466;
    rectbg3.y = 420;
    rectbg3.alpha = 0;
    page4Layer.addChild(rectbg3);

    var rectbg4 = new ZRimg([imglist['icons'],521,957,163,184],-81,-92);
    rectbg4.x = 644;
    rectbg4.y = 350;
    rectbg4.alpha = 0;
    page4Layer.addChild(rectbg4);

    var rect1 = new ZRimg([imglist['icons'],0,153,163,184],-81,-92);
    rect1.x = 110;
    rect1.y = 560;
    rect1.alpha = 0;
    page4Layer.addChild(rect1);

    var rect2 = new ZRimg([imglist['icons'],166,154,163,184],-81,-92);
    rect2.x = 288;
    rect2.y = 490;
    rect2.alpha = 0;
    page4Layer.addChild(rect2);

    var rect3 = new ZRimg([imglist['icons'],0,341,163,184],-81,-92);
    rect3.x = 466;
    rect3.y = 420;
    rect3.alpha = 0;
    page4Layer.addChild(rect3);

    var rect4 = new ZRimg([imglist['icons'],165,341,163,184],-81,-92);
    rect4.x = 644;
    rect4.y = 350;
    rect4.alpha = 0;
    page4Layer.addChild(rect4);

    var moveL = new LSprite();
    page4Layer.addChild(moveL);

    var linesCover = new LSprite();
    linesCover.graphics.drawRect(0,'#f00',[150,594,518,417]);
    linesCover.scaleY = 0;
    var lines = new Zimg([imglist['lines']],150,594);
    lines.mask = linesCover;
    lines.visible = false;
    moveL.addChild(lines);
    var lines2 = new Zimg([imglist['lines2']],150,594);
    lines2.mask = linesCover;
    moveL.addChild(lines2);

    var player1 = new Zimg([imglist['icons'],362,277,119,116],73,716);
    player1.alpha = 0;
    moveL.addChild(player1);

    var player2 = new Zimg([imglist['icons'],356,95,138,173],306,585);
    player2.alpha = 0;
    moveL.addChild(player2);

    var player3 = new Zimg([imglist['icons'],508,0,188,114],472,509);
    player3.alpha = 0;
    moveL.addChild(player3);

    var player4 = new Zimg([imglist['icons'],521,128,128,125],552,708);
    player4.alpha = 0;
    moveL.addChild(player4);

    var bee = new Zimg([imglist['bee2']],100,825);
    bee.visible = false;
    moveL.addChild(bee);

    objMove.call(bgUpCover,{type:'down',dis:966});
    objMove.call(bgDownCover,{type:'up',dis:800});
    objMove.call(title1,{type:'left',delay:0.8});
    objMove.call(title2,{type:'right',delay:0.8});
    objMove.call(btn,{delay:1.4});
    objMove.call(player1,{t:0.6,delay:2});
    objMove.call(player2,{t:0.6,delay:2.3});
    objMove.call(player3,{t:0.6,delay:2.6});
    objMove.call(player4,{t:0.6,delay:2.9});
    LTweenLite.to(moveL,2,{y:280,delay:3.5,ease:LEasing.Cubic.easeInOut}).to(linesCover,0.5,{scaleY:1,ease:LEasing.None.easeIn,onComplete:function(){
        bee.visible = true;
    }}).to(moveL,3,{y:0,ease:LEasing.Back.easeInOut,onComplete:function(){
        lines.visible = true;
        lines2.visible = false;
        LTweenLite.to(moveL,1,{y:10,loop:true,ease:LEasing.None.easeIn}).to(moveL,1,{y:0,loop:true,ease:LEasing.None.easeIn});
        objMove.call(rectbg1,{delay:1,type:'scaleS2L',ei:'Back'});
        objMove.call(rectbg2,{delay:1.3,type:'scaleS2L',ei:'Back'});
        objMove.call(rectbg3,{delay:1.6,type:'scaleS2L',ei:'Back'});
        objMove.call(rectbg4,{delay:1.9,type:'scaleS2L',ei:'Back'});
        objMove.call(rect1,{delay:2.2,type:'scaleS2L',ei:'Back'});
        objMove.call(rect2,{delay:2.5,type:'scaleS2L',ei:'Back'});
        objMove.call(rect3,{delay:2.8,type:'scaleS2L',ei:'Back'});
        objMove.call(rect4,{delay:3.1,type:'scaleS2L',ei:'Back',callback:function(){
            btn.move();
        }});
    }});
}

function page5Init(){
    page5Layer = new LSprite();
    stage.addChild(page5Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,838],[0,966]]);
    var bgUp = new Zimg([imglist['bg-cover']]);
    bgUp.mask = bgUpCover;
    page5Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,966],[750,838],[750,1125],[0,1125]]);
    var bgDown = new LSprite();
    bgDown.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2eb7a4");
    bgDown.mask = bgDownCover;
    page5Layer.addChild(bgDown);

    var content1 = new P5content([314,196],[365,56],[180,51,435,239],1);
    page5Layer.addChild(content1);

    var content2 = new P5content([55,78],[118,435],[90,378,286,286],2);
    page5Layer.addChild(content2);

    var content3 = new P5content([40,632],[418,644],[265,590,457,207],3);
    page5Layer.addChild(content3);

    var btn = new ClickLogo(5,548,900,function(){
        btn.canClick = false;
        objMove.call(page5Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page5Layer);
                page5Layer = null;
                page6Init();
            }
        });
    });
    btn.alpha = 0;
    page5Layer.addChild(btn);

    var title1 = new Zimg([imglist['icons'],0,1200,475,62],208,1000);
    title1.alpha = 0;
    page5Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],0,1130,454,62],19,943);
    title2.alpha = 0;
    page5Layer.addChild(title2);

    objMove.call(bgUpCover,{type:'down',dis:966});
    objMove.call(bgDownCover,{type:'up',dis:800});
    objMove.call(title1,{type:'left',delay:0.8});
    objMove.call(title2,{type:'right',delay:0.8});
    objMove.call(btn,{delay:1.4});
    setTimeout(function(){
        content1.move();
    },2000);
    setTimeout(function(){
        content2.move();
    },5000);
    setTimeout(function(){
        content3.move();
    },8000);
    setTimeout(function(){
        btn.move();
    },10500);
}

function page6Init(){
    page6Layer = new LSprite();
    stage.addChild(page6Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,1040],[0,762]]);
    var bgUp = new Zimg([imglist['bg-cover']]);
    bgUp.mask = bgUpCover;
    page6Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,762],[750,1040],[750,1125],[0,1125]]);
    var bgDown = new LSprite();
    bgDown.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#000");
    bgDown.mask = bgDownCover;
    page6Layer.addChild(bgDown);

    var sun = new Zimg([imglist['sun']]);
    sun.mask = bgUpCover;
    page6Layer.addChild(sun);

    var wheelLine = new LSprite();
    wheelLine.graphics.drawLine(5,'#464646',[378,782,490,625]);
    wheelLine.graphics.drawLine(5,'#464646',[425,874,566,750]);
    wheelLine.graphics.drawLine(5,'#464646',[470,748,352,548]);
    wheelLine.graphics.drawLine(5,'#464646',[604,653,477,488]);
    wheelLine.graphics.drawLine(5,'#464646',[369,441,500,242]);
    wheelLine.graphics.drawLine(5,'#464646',[500,490,631,316]);
    wheelLine.graphics.drawLine(5,'#464646',[511,380,330,301]);
    wheelLine.graphics.drawLine(5,'#464646',[593,246,399,160]);
    wheelLine.graphics.drawLine(5,'#464646',[310,145,486,37]);
    wheelLine.graphics.drawLine(5,'#464646',[396,275,548,115]);
    wheelLine.alpha = 0;
    page6Layer.addChild(wheelLine);

    var wheel1 = new ZRimg([imglist['icons'],0,1264,130,130],-62,-65);
    wheel1.x = 407;
    wheel1.y = 830;
    wheel1.alpha = 0;
    page6Layer.addChild(wheel1);

    var wheel2 = new ZRimg([imglist['icons'],130,1270,226,226],-113,-113);
    wheel2.x = 543;
    wheel2.y = 704;
    wheel2.alpha = 0;
    page6Layer.addChild(wheel2);

    var wheel3 = new ZRimg([imglist['icons'],492,1145,252,252],-126,-126);
    wheel3.x = 407;
    wheel3.y = 504;
    wheel3.alpha = 0;
    page6Layer.addChild(wheel3);

    var wheel4 = new ZRimg([imglist['icons'],718,584,282,282],-137,-141);
    wheel4.x = 593;
    wheel4.y = 300;
    wheel4.alpha = 0;
    page6Layer.addChild(wheel4);

    var wheel5 = new ZRimg([imglist['icons'],727,866,240,240],-120,-120);
    wheel5.x = 332;
    wheel5.y = 220;
    wheel5.alpha = 0;
    page6Layer.addChild(wheel5);

    var wheel6 = new ZRimg([imglist['icons'],361,1356,136,136],-67,-67);
    wheel6.x = 513;
    wheel6.y = 84;
    wheel6.alpha = 0;
    page6Layer.addChild(wheel6);

    var info1 = new ZRimg([imglist['icons'],517,1417,139,62],-75,-31);
    info1.x = 543;
    info1.y = 704;
    info1.alpha = 0;
    page6Layer.addChild(info1);

    var info2 = new ZRimg([imglist['icons'],1312,331,138,63],-69,-31);
    info2.x = 407;
    info2.y = 504;
    info2.alpha = 0;
    page6Layer.addChild(info2);

    var info3 = new ZRimg([imglist['icons'],1052,461,168,63],-84,-31);
    info3.x = 593;
    info3.y = 300;
    info3.alpha = 0;
    page6Layer.addChild(info3);

    var info4 = new ZRimg([imglist['icons'],1311,406,139,112],-70,-56);
    info4.x = 332;
    info4.y = 210;
    info4.alpha = 0;
    page6Layer.addChild(info4);

    var title1 = new Zimg([imglist['icons'],1003,627,488,75],212,968);
    title1.alpha = 0;
    page6Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],1047,542,379,75],30,899);
    title2.alpha = 0;
    page6Layer.addChild(title2);

    var person = new Zimg([imglist['icons'],340,959,166,117],79,789);
    person.alpha = 0;
    page6Layer.addChild(person);

    var point = new Zimg([imglist['icons'],671,290,56,53],252,784);
    point.alpha = 0;
    page6Layer.addChild(point);

    fallLayer = new LSprite();
    page6Layer.addChild(fallLayer);

    var opLayer = new LSprite();
    opLayer.graphics.drawRect(0,'#000',[0,0,750,1125]);
    page6Layer.addChild(opLayer);

    var btn = new ClickLogo(6,550,882,function(){
        btn.canClick = false;
        objMove.call(page6Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page6Layer);
                page6Layer = null;
                page7Init();
            }
        });
    });
    btn.alpha = 0;
    page6Layer.addChild(btn);

    var cansilde = false,sx=0,isfall = false;
    opLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
        if(cansilde){
            sx = e.selfX;
        }
    });
    opLayer.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){
        event.preventDefault();
    });
    opLayer.addEventListener(LMouseEvent.MOUSE_UP,function(e){
        if(cansilde){
            var ex = e.selfX;
            if(ex>sx+100){
                isfall = true;
                objMove.call(wheelLine,{type:'fade'});
                btn.move();
            }
        }
    });
    var speed = 5,addIndex = 0;
    page6Layer.addEventListener(LEvent.ENTER_FRAME,function(e){
        if(isfall){
            wheel1.rotate += speed;
            wheel2.rotate += speed;
            wheel3.rotate += speed;
            wheel4.rotate += speed;
            wheel5.rotate += speed;
            wheel6.rotate += speed;
            if(wheel1.rotate>=360){
                wheel1.rotate = 0;
                wheel2.rotate = 0;
                wheel3.rotate = 0;
                wheel4.rotate = 0;
                wheel5.rotate = 0;
                wheel6.rotate = 0;
            }
            if(addIndex-- <= 0){
                var item = new Coin();
                addIndex = 20;
            }

            for(var i=fallLayer.numChildren-1;i>=0;i--){
                var _child = fallLayer.childList[i];
                _child.updates();
            }
        }
    });

    objMove.call(bgUpCover,{type:'down',dis:966});
    objMove.call(bgDownCover,{type:'up',dis:800});
    objMove.call(title1,{type:'left',delay:0.8});
    objMove.call(title2,{type:'right',delay:0.8});
    objMove.call(btn,{delay:1.4});
    objMove.call(wheel1,{type:'scaleS2L',delay:2});
    objMove.call(wheel2,{type:'scaleS2L',delay:2.3});
    objMove.call(wheel3,{type:'scaleS2L',delay:2.6});
    objMove.call(wheel4,{type:'scaleS2L',delay:2.9});
    objMove.call(wheel5,{type:'scaleS2L',delay:3.2});
    objMove.call(wheel6,{type:'scaleS2L',delay:3.5});
    objMove.call(info1,{delay:4});
    objMove.call(info2,{delay:4.3});
    objMove.call(info3,{delay:4.9});
    objMove.call(info4,{delay:5.2});
    objMove.call(person,{delay:6});
    objMove.call(point,{delay:6,callback:function(){
        cansilde = true;
        LTweenLite.to(point,0.6,{x:270,loop:true,ease:LEasing.None.easeIn}).to(point,0,{x:252,loop:true,ease:LEasing.None.easeIn});
    }});
}

function page7Init(){
    page7Layer = new LSprite();
    page7Layer.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2ec0ad");
    stage.addChild(page7Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,114],[0,350]]);
    var bgUp = new Zimg([imglist['bg-cover']]);
    bgUp.mask = bgUpCover;
    page7Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,350],[750,114],[750,1125],[0,1125]]);
    var bgDown = new LSprite();
    bgDown.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2eb7a4");
    bgDown.mask = bgDownCover;
    page7Layer.addChild(bgDown);

    var road = new Zimg([imglist['bg7']]);
    road.mask = bgDownCover;
    page7Layer.addChild(road);


    var title1 = new Zimg([imglist['icons'],0,616,371,75],300,135);
    title1.alpha = 0;
    page7Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],0,532,316,75],83,66);
    title2.alpha = 0;
    page7Layer.addChild(title2);

    var btn = new ClickLogo(7,538,48,function(){
        btn.canClick = false;
        objMove.call(page7Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page7Layer);
                page7Layer = null;
                page8Init();
            }
        });
    });
    btn.alpha = 0;
    page7Layer.addChild(btn);

    var tree1 = new Zimg([imglist['icons'],340,402,157,207],471,900);
    tree1.alpha = 0;
    page7Layer.addChild(tree1);

    var tree2 = new Zimg([imglist['icons'],340,402,157,207],460,600);
    tree2.alpha = 0;
    tree2.scaleX = -0.5;
    tree2.scaleY = 0.5;
    page7Layer.addChild(tree2);

    var card1 = new ZRimg([imglist['icons'],1,910,328,216],-164,-216);
    card1.x = 180;//180
    card1.y = 828;
    //card1.rotate = -90;
    card1.alpha = 0;
    page7Layer.addChild(card1);

    var card2 = new ZRimg([imglist['icons'],517,363,230,274],-115,-274);
    card2.x = 628;
    card2.y = 563;
    //card2.rotate = -90;
    card2.alpha = 0;
    page7Layer.addChild(card2);

    var card3 = new ZRimg([imglist['icons'],0,691,251,219],-125,-219);
    card3.x = 153;
    card3.y = 450;
    //card3.rotate = 90;
    card3.alpha = 0;
    page7Layer.addChild(card3);

    var dot1 = new Zimg([imglist['icons'],671,141,61,102],256,783);
    dot1.alpha = 0;
    page7Layer.addChild(dot1);

    var dot2 = new Zimg([imglist['icons'],671,141,61,102],534,521);
    dot2.alpha = 0;
    page7Layer.addChild(dot2);

    var dot3 = new Zimg([imglist['icons'],671,141,61,102],327,284);
    dot3.alpha = 0;
    page7Layer.addChild(dot3);

    var car1 = new ZRimg([imglist['icons'],967,1234,97,163],-48,-81);
    car1.x = 120;
    car1.y = 1070;
    car1.scaleX = 0.5;
    car1.scaleY = 0.5;
    car1.rotate = 10;
    car1.alpha = 0;
    page7Layer.addChild(car1);

    var car2 = new ZRimg([imglist['icons'],1085,1237,78,160],-39,-80);
    car2.x = 315;//315 500 550
    car2.y = 920;//920 820 720
    car2.scaleX = 0.5;
    car2.scaleY = 0.5;
    car2.rotate = 55;//55 50 10 -20
    car2.alpha = 0;
    page7Layer.addChild(car2);

    //LTweenLite.to(car2,1,{x:500,y:820,rotate:50,ease:LEasing.Cubic.easeIn}).to(car2,0.4,{x:550,y:720,rotate:10,ease:LEasing.None.easeOut}).to(car2,0.4,{x:520,y:620,rotate:-40,ease:LEasing.None.easeOut});

    var car3 = new ZRimg([imglist['icons'],1186,1271,56,124],-28,-62);
    car3.x = 520;//420 320
    car3.y = 620;//540 480
    car3.scaleX = 0.5;
    car3.scaleY = 0.5;
    car3.rotate = -40;//-60 -50
    car3.alpha = 0;
    page7Layer.addChild(car3);
    //LTweenLite.to(car3,1,{x:420,y:540,rotate:-60,ease:LEasing.Cubic.easeIn}).to(car3,0.4,{x:320,y:480,rotate:-50,ease:LEasing.None.easeOut}).to(car3,0.4,{x:300,y:440,rotate:40,ease:LEasing.None.easeOut});

    var car4 = new ZRimg([imglist['icons'],1263,1290,46,102],-23,-51);
    car4.x = 300;
    car4.y = 440;
    car4.scaleX = 0.5;
    car4.scaleY = 0.5;
    car4.rotate = 40;
    car4.alpha = 0;
    page7Layer.addChild(car4);

    var hand = new LButton(new Zimg([imglist['icons'],1322,1330,39,58]));
    hand.x = 180;
    hand.y = 1050;
    hand.alpha = 0;
    page7Layer.addChild(hand);
    hand.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        //if(hand.alpha == 1){
            LTweenLite.to(car1,1,{alpha:1,ease:LEasing.Cubic.easeIn}).to(car1,1,{x:315,y:920,rotate:55,ease:LEasing.None.easeInOut,onComplete:function(){
                objMove.call(car1,{direc:'out'});
                objMove.call(dot1,{type:'down',ei:'Back'});
                objMove.call(card1,{type:'right',dis:328,ei:'Back',delay:0.5});
            }});
            LTweenLite.to(car2,1,{alpha:1,delay:2.5,ease:LEasing.Cubic.easeIn}).to(car2,1,{x:500,y:820,rotate:50,delay:0.5,ease:LEasing.None.easeIn}).to(car2,0.6,{x:550,y:720,rotate:10,ease:LEasing.None.easeOut}).to(car2,0.6,{x:520,y:620,rotate:-40,ease:LEasing.None.easeOut,onComplete:function(){
                objMove.call(car2,{direc:'out'});
                objMove.call(dot2,{type:'down',ei:'Back'});
                objMove.call(card2,{type:'left',dis:240,ei:'Back',delay:0.5});
            }});
            LTweenLite.to(car3,1,{alpha:1,delay:6.4,ease:LEasing.Cubic.easeIn}).to(car3,1,{x:420,y:540,rotate:-60,delay:0.5,ease:LEasing.None.easeIn}).to(car3,0.6,{x:320,y:480,rotate:-50,ease:LEasing.None.easeOut}).to(car3,0.6,{x:300,y:440,rotate:40,ease:LEasing.None.easeOut,onComplete:function(){
                objMove.call(car3,{direc:'out'});
                objMove.call(dot3,{type:'down',ei:'Back'});
                objMove.call(card3,{type:'right',dis:250,ei:'Back',delay:0.5});
                objMove.call(car4,{type:'fade'});
                btn.move();
            }});
        //}
    });

    objMove.call(bgUpCover,{type:'down',dis:350});
    objMove.call(bgDownCover,{type:'up',dis:1080});
    objMove.call(tree1,{delay:0.8});
    objMove.call(tree2,{delay:0.8});
    objMove.call(title1,{type:'left',delay:1.4});
    objMove.call(title2,{type:'right',delay:1.4});
    objMove.call(btn,{delay:1.8});
    objMove.call(hand,{delay:2.5,callback:function(){
        ZBlink.call(hand);
    }});

}

function page8Init(){
    page8Layer = new LSprite();
    stage.addChild(page8Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,690],[0,440]]);
    var bgUp = new LSprite();
    bgUp.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#000");
    bgUp.mask = bgUpCover;
    page8Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,440],[750,690],[750,1125],[0,1125]]);
    var bgDown = new Zimg([imglist['bg-cover']]);
    bgDown.mask = bgDownCover;
    page8Layer.addChild(bgDown);

    var claw = new Claw();
    claw.alpha = 0;
    page8Layer.addChild(claw);

    var hint = new LTextField();
    hint.text = '快来捉我呀！';
    hint.font = '微软雅黑';
    hint.size = 36;
    hint.color = '#ffff00';
    hint.x = (LGlobal.width - hint.getWidth())/2;
    hint.y = 350;
    hint.alpha = 0;
    page8Layer.addChild(hint);

    var chicken = new ZRimg([imglist['icons'],750,1141,190,169],-85,-84);
    chicken.x = 375;
    chicken.y = 870;
    chicken.alpha = 0;
    page8Layer.addChild(chicken);

    var iscatch = true;
    page8Layer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(iscatch){
            claw.catch(function(){
                chicken.alpha = 0;
            });
        }
    });

    objMove.call(bgUpCover,{type:'down',dis:350});
    objMove.call(bgDownCover,{type:'up',dis:1080});
    objMove.call(claw,{delay:0.5,callback:function(){
        claw.move();
    }});
    objMove.call(chicken,{delay:1,callback:function(){
        ZBlink.call(hint,0.6);
        LTweenLite.to(chicken,0.2,{rotate:10,loop:true,ease:LEasing.None.easeIn}).to(chicken,0.4,{rotate:-10,loop:true,ease:LEasing.None.easeIn}).to(chicken,0.2,{rotate:0,loop:true,ease:LEasing.None.easeIn})
    }});
}

function page82Init(){
    page8Layer = new LSprite();
    stage.addChild(page8Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,690],[0,440]]);
    var bgUp = new LSprite();
    bgUp.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#000");
    bgUp.mask = bgUpCover;
    page8Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,440],[750,690],[750,1125],[0,1125]]);
    var bgDown = new Zimg([imglist['bg-cover']]);
    bgDown.mask = bgDownCover;
    page8Layer.addChild(bgDown);

    var txtframe1 = new Txtframe('迫不及待想加入我们？',375,180);
    page8Layer.addChild(txtframe1);

    var txtframe2 = new Txtframe('别捉鸡',375,260);
    page8Layer.addChild(txtframe2);

    var person = new Zimg([imglist['p9_pic1']],33,666);
    person.alpha = 0;
    page8Layer.addChild(person);

    var lines = new Zimg([imglist['icons'],1434,748,33,74],410,787);
    lines.alpha = 0;
    page8Layer.addChild(lines);

    var infos = new Zimg([imglist['icons'],1144,710,270,141],451,726);
    infos.alpha = 0;
    page8Layer.addChild(infos);

    var btn = new ClickLogo(8,506,982,function(){
        btn.canClick = false;
        objMove.call(page8Layer,{
            direc:'out',
            callback:function(){
                stage.removeChild(page8Layer);
                page8Layer = null;
                page9Init();
            }
        });
    });
    btn.alpha = 0;
    page8Layer.addChild(btn);

    txtframe1.move();
    setTimeout(function(){
        txtframe2.move();
    },3000);
    objMove.call(person,{type:'right',dis:410,delay:5,callback:function(){
        ZBlink.call(lines,0.4);
    }});
    objMove.call(infos,{type:'right',dis:30,delay:6,callback:function(){
        objMove.call(btn,{callback:function(){
            btn.move();
        }})
    }})
}

function page9Init(){
    page9Layer = new LSprite();
    stage.addChild(page9Layer);

    var bgUpCover = new LSprite();
    bgUpCover.graphics.drawVertices(0,'#f00',[[0,0],[750,0],[750,447],[0,772]]);
    var bgUp = new Zimg([imglist['bg-cover']]);
    bgUp.mask = bgUpCover;
    page9Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,772],[750,447],[750,1125],[0,1125]]);
    var bgDown = new LSprite();
    bgDown.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2eb7a4");
    bgDown.mask = bgDownCover;
    page9Layer.addChild(bgDown);

    objMove.call(bgUpCover,{type:'down',dis:966});
    objMove.call(bgDownCover,{type:'up',dis:800,callback:function(){
        document.getElementById('lastPage').style.display = 'block';
    }});

    setTimeout(function(){
        document.getElementById('titleframe').className += ' reset';
    },600);
    setTimeout(function(){
        document.getElementById('frame').className += ' reset';
        LGlobal.preventDefault = false;
    },1000);
}