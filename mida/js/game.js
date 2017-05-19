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
            page2Init();
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
    var bgUp = new LSprite();
    bgUp.graphics.drawRect(0,"#fff",[0,0,750,800],true,"#ffff00");
    bgUp.mask = bgUpCover;
    page3Layer.addChild(bgUp);

    var bgDownCover = new LSprite();
    bgDownCover.graphics.drawVertices(0,'#f00',[[0,800],[750,378],[750,1125],[0,1125]]);
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
    page3Layer.addChild(vedio);

    var btnRotate = new LButton(new Zimg([imglist['icons'],266,704,49,44]));
    btnRotate.x = 350;
    btnRotate.y = 800;
    page3Layer.addChild(btnRotate);

    var hintHead = new ClickHint(582,586,'#615724');
    page3Layer.addChild(hintHead);

    var hintWings = new ClickHint(300,465,'#615724');
    page3Layer.addChild(hintWings);

    var hintBody = new ClickHint(394,644,'#b2b2b2');
    page3Layer.addChild(hintBody);

    var hintVedio = new ClickHint(280,583,'#fff');
    page3Layer.addChild(hintVedio);

    var infoWings = new LButton(new Zimg([imglist['icons'],750,0,331,309],28,69));
    page3Layer.addChild(infoWings);

    var infoHead = new LButton(new Zimg([imglist['icons'],1096,0,331,309],390,66));
    page3Layer.addChild(infoHead);

    var infoBody = new LButton(new Zimg([imglist['icons'],375,644,333,312],70,743));
    page3Layer.addChild(infoBody);

}

function page4Init(){
    page4Layer = new LSprite();
    page4Layer.alpha = 0;
    page4Layer.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2ec0ad");
    stage.addChild(page4Layer);

    var bg = new Zimg([imglist['bg4']]);
    page4Layer.addChild(bg);

    var bgCover = new Zimg([imglist['bg-cover']],0,-174);
    page4Layer.addChild(bgCover);

    var title1 = new Zimg([imglist['icons'],0,74,335,75],280,120);
    title1.alpha = 0;
    page4Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],0,0,344,75],63,52);
    title2.alpha = 0;
    page4Layer.addChild(title2);

    var logo = new Zimg([imglist['icons'],350,0,150,87],536,34);
    logo.alpha = 0;
    page4Layer.addChild(logo);

    var circle = new Zimg([imglist['circle']],37,193);
    page4Layer.addChild(circle);

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
    moveL.addChild(lines);

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

    objMove.call(page4Layer,{t:1.5});
    objMove.call(player1,{t:1,delay:2});
    objMove.call(player2,{t:1,delay:2.5});
    objMove.call(player3,{t:1,delay:3});
    objMove.call(player4,{t:1,delay:3.5});
    LTweenLite.to(linesCover,1,{scaleY:1,delay:4,ease:LEasing.None.easeIn}).to(moveL,3,{y:280,ease:LEasing.Cubic.easeIn,onComplete:function(){
        bee.visible = true;
    }}).to(moveL,5,{y:0,ease:LEasing.None.easeIn,onComplete:function(){
        LTweenLite.to(player1,1,{y:726,loop:true,ease:LEasing.None.easeIn}).to(player1,1,{y:716,loop:true,ease:LEasing.None.easeIn});
        LTweenLite.to(player2,1,{y:595,loop:true,ease:LEasing.None.easeIn}).to(player2,1,{y:585,loop:true,ease:LEasing.None.easeIn});
        LTweenLite.to(player3,1,{y:519,loop:true,ease:LEasing.None.easeIn}).to(player3,1,{y:509,loop:true,ease:LEasing.None.easeIn});
        LTweenLite.to(player4,1,{y:718,loop:true,ease:LEasing.None.easeIn}).to(player4,1,{y:708,loop:true,ease:LEasing.None.easeIn});
        objMove.call(title1,{t:1,delay:1,type:'right'});
        objMove.call(title2,{t:1,delay:1,type:'left'});
        objMove.call(logo,{t:1,delay:2});
        objMove.call(rect1,{delay:3,type:'scaleS2L',ei:'Back'});
        objMove.call(rect2,{delay:3.5,type:'scaleS2L',ei:'Back'});
        objMove.call(rect3,{delay:4,type:'scaleS2L',ei:'Back'});
        objMove.call(rect4,{delay:4.5,type:'scaleS2L',ei:'Back'});
        LTweenLite.to(page4Layer,1,{alpha:0,delay:8,ease:LEasing.None.easeIn,onComplete:page7Init});
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

    var btn = new ClickLogo(5,548,900);
    page5Layer.addChild(btn);

    var title1 = new Zimg([imglist['icons'],0,1200,475,62],208,1000);
    page5Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],0,1130,454,62],19,943);
    page5Layer.addChild(title2);
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
    page6Layer.addChild(wheelLine);

    var wheel1 = new ZRimg([imglist['icons'],0,1264,130,130],-65,-65);
    wheel1.x = 407;
    wheel1.y = 830;
    page6Layer.addChild(wheel1);

    var wheel2 = new ZRimg([imglist['icons'],130,1270,226,226],-113,-113);
    wheel2.x = 543;
    wheel2.y = 704;
    page6Layer.addChild(wheel2);

    var wheel3 = new ZRimg([imglist['icons'],492,1145,252,252],-126,-126);
    wheel3.x = 407;
    wheel3.y = 504;
    page6Layer.addChild(wheel3);

    var wheel4 = new ZRimg([imglist['icons'],718,584,282,282],-141,-141);
    wheel4.x = 593;
    wheel4.y = 300;
    page6Layer.addChild(wheel4);

    var wheel5 = new ZRimg([imglist['icons'],727,866,240,240],-120,-120);
    wheel5.x = 332;
    wheel5.y = 220;
    page6Layer.addChild(wheel5);

    var wheel6 = new ZRimg([imglist['icons'],361,1349,144,144],-72,-72);
    wheel6.x = 513;
    wheel6.y = 84;
    page6Layer.addChild(wheel6);

    var info1 = new ZRimg([imglist['icons'],517,1417,139,62],-70,-31);
    info1.x = 543;
    info1.y = 704;
    page6Layer.addChild(info1);

    var info2 = new ZRimg([imglist['icons'],1312,331,138,63],-69,-31);
    info2.x = 407;
    info2.y = 504;
    page6Layer.addChild(info2);

    var info3 = new ZRimg([imglist['icons'],1052,461,168,63],-84,-31);
    info3.x = 593;
    info3.y = 300;
    page6Layer.addChild(info3);

    var info4 = new ZRimg([imglist['icons'],1311,406,139,112],-70,-56);
    info4.x = 332;
    info4.y = 210;
    page6Layer.addChild(info4);

    var title1 = new Zimg([imglist['icons'],1003,627,488,75],212,968);
    page6Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],1047,542,379,75],30,899);
    page6Layer.addChild(title2);

    var person = new Zimg([imglist['icons'],340,959,166,117],79,789);
    page6Layer.addChild(person);

    var point = new Zimg([imglist['icons'],671,290,56,53],252,784);
    page6Layer.addChild(point);

    var btn = new ClickLogo(6,550,882);
    page6Layer.addChild(btn);
}

function page7Init(){
    page7Layer = new LSprite();
    page7Layer.alpha = 0;
    page7Layer.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#2ec0ad");
    stage.addChild(page7Layer);

    var road = new Zimg([imglist['bg7']]);
    page7Layer.addChild(road);

    var bgCover = new Zimg([imglist['bg-cover']],0,-364);
    page7Layer.addChild(bgCover);

    var title1 = new Zimg([imglist['icons'],0,616,371,75],300,135);
    title1.alpha = 0;
    page7Layer.addChild(title1);

    var title2 = new Zimg([imglist['icons'],0,532,316,75],83,66);
    title2.alpha = 0;
    page7Layer.addChild(title2);

    var logo = new Zimg([imglist['icons'],503,270,152,87],538,48);
    logo.alpha = 0;
    page7Layer.addChild(logo);

    var tree1 = new Zimg([imglist['icons'],340,402,157,207],471,900);
    page7Layer.addChild(tree1);

    var tree2 = new Zimg([imglist['icons'],340,402,157,207],460,600);
    tree2.scaleX = -0.5;
    tree2.scaleY = 0.5;
    page7Layer.addChild(tree2);

    var card1 = new ZRimg([imglist['icons'],1,910,328,216],-164,-216);
    card1.x = 180;
    card1.y = 828;
    card1.rotate = -90;
    card1.alpha = 0;
    page7Layer.addChild(card1);

    var card2 = new ZRimg([imglist['icons'],517,363,230,274],-115,-274);
    card2.x = 628;
    card2.y = 563;
    card2.rotate = -90;
    card2.alpha = 0;
    page7Layer.addChild(card2);

    var card3 = new ZRimg([imglist['icons'],0,691,251,219],-125,-219);
    card3.x = 153;
    card3.y = 450;
    card3.rotate = 90;
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

    objMove.call(page7Layer,{t:1.5});
    objMove.call(title1,{t:1,delay:2,type:'right'});
    objMove.call(title2,{t:1,delay:2,type:'left'});
    objMove.call(logo,{t:1,delay:3});
    setTimeout(function(){
        objMove.call(dot1,{type:'down',ei:'Back',callback:function(){
            LTweenLite.to(card1,1,{alpha:1,rotate:0,ease:LEasing.Cubic.easeOut});
        }});
    },5000);
    setTimeout(function(){
        objMove.call(dot2,{type:'down',ei:'Back',callback:function(){
            LTweenLite.to(card2,1,{alpha:1,rotate:0,ease:LEasing.Cubic.easeOut});
        }});
    },8000);
    setTimeout(function(){
        objMove.call(dot3,{type:'down',ei:'Back',callback:function(){
            LTweenLite.to(card3,1,{alpha:1,rotate:0,ease:LEasing.Cubic.easeOut});
        }});
    },11000);
    setTimeout(function(){
        objMove.call(page7Layer,{t:1.5,direc:'out',callback:function(){
            $("#lastPage").fadeIn();
            $("#titlepic").addClass('reset');
            setTimeout(function(){
                $("#frame").addClass('reset');
            },1000);
            setTimeout(function(){
                $("#btn").addClass('reset');
                LGlobal.preventDefault = false;
            },2000);
        }});
    },15000);
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
    page8Layer.addChild(claw);

    var hint = new LTextField();
    hint.text = '快来捉我呀！';
    hint.font = '微软雅黑';
    hint.size = 36;
    hint.color = '#ffff00';
    hint.x = (LGlobal.width - hint.getWidth())/2;
    hint.y = 350;
    page8Layer.addChild(hint);

    var chicken = new ZRimg([imglist['icons'],750,1141,190,169],-85,-84);
    chicken.x = 375;
    chicken.y = 870;
    page8Layer.addChild(chicken);
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
    page8Layer.addChild(person);

    var lines = new Zimg([imglist['icons'],1434,748,33,74],410,787);
    page8Layer.addChild(lines);

    var infos = new Zimg([imglist['icons'],1144,710,270,141],451,726);
    page8Layer.addChild(infos);

    var btn = new ClickLogo(8,506,982);
    page8Layer.addChild(btn);
}