var stage;

var loadinglist = {};
var loadingData = new Array(
    {name:"L_loading",path:imgsrc+"./images/loading_cover.png"},
    {name:"L_line",path:imgsrc+"./images/loading_line.png"}
);

var imglist = {};
var imgData = new Array(
    {name:"p1_bg_normal",path:imgsrc+"./images/p1_bg_normal.jpg"},
    {name:"p1_bg_ab",path:imgsrc+"./images/p1_bg_ab.jpg"},
    {name:"p2_map_bg",path:imgsrc+"./images/p2_map_bg.jpg"},
    {name:"p2_map_cover",path:imgsrc+"./images/p2_map_cover.jpg"},
    {name:"p3_pic1",path:imgsrc+"./images/p3_pic1.jpg"},
    {name:"p3_pic2",path:imgsrc+"./images/p3_pic2.jpg"},
    {name:"p3_pic3",path:imgsrc+"./images/p3_pic3.jpg"},
    {name:"p4_pic1",path:imgsrc+"./images/p4_pic1.jpg"},
    {name:"p4_pic2",path:imgsrc+"./images/p4_pic2.jpg"},
    {name:"p5_pic1",path:imgsrc+"./images/p5_pic1.jpg"},
    {name:"p6_pic1",path:imgsrc+"./images/p6_pic1.jpg"},
    {name:"helicopter",path:imgsrc+"./images/helicopter.png"},
    {name:"car",path:imgsrc+"./images/car.png"},
    {name:"c_imgs",path:imgsrc+"./images/c_imgs.png"},
    {name:"icons",path:imgsrc+"./images/icons.png"}
);

var gameData = {};
function resetgameData(){

}

function main(){
    LGlobal.setDebug(true);
    //全屏操作
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    //添加舞台
    stage = new LSprite();
    addChild(stage);

    addChild(new FPS());

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
            page6Init();
        }
    );
}

function page1Init(){
    page1Layer = new LSprite();
    stage.addChild(page1Layer);

    var bgNor = new LBitmap(new LBitmapData(imglist["p1_bg_normal"]));
    page1Layer.addChild(bgNor);

    var bgAb = new LBitmap(new LBitmapData(imglist["p1_bg_ab"]));
    bgAb.alpha = 0;
    page1Layer.addChild(bgAb);


    var btnNext = new LButton(new LBitmap(new LBitmapData(imglist["icons"],0,1457,118,118)));
    btnNext.x = 440;
    btnNext.y = 740;
    btnNext.alpha = 0;
    page1Layer.addChild(btnNext);

    btnNext.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        document.getElementById("txt1").style.display = 'none';
        document.getElementById("txt2").style.display = 'none';
        stage.removeChild(page1Layer);
        page1Layer = null;
    });


    LTweenLite.to(bgAb,0.2,{alpha:1,ease:LEasing.None.easeIn}).to(bgAb,0.2,{alpha:0,ease:LEasing.None.easeIn}).to(bgAb,0.2,{alpha:1,delay:1,ease:LEasing.None.easeIn}).to(bgAb,0.2,{alpha:0,ease:LEasing.None.easeIn}).to(bgAb,0.2,{alpha:1,ease:LEasing.None.easeIn}).to(bgAb,0.2,{alpha:0,ease:LEasing.None.easeIn}).to(bgAb,0.2,{alpha:1,ease:LEasing.None.easeIn,onComplete:function(){
        typeC("txt1",function(){
            typeC("txt2",function(){
                LTweenLite.to(btnNext,0.8,{alpha:1,ease:LEasing.None.easeIn}).to(btnNext,0.8,{alpha:0,loop:true,ease:LEasing.None.easeIn}).to(btnNext,0.8,{alpha:1,loop:true,ease:LEasing.None.easeIn});
            })
        });
    }});

}

function page2Init(){
    page2Layer = new LSprite();
    page2Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page2Layer);
}

function page3Init(){
    page3Layer = new LSprite();
    page3Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page3Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p3_pic1"]));
    pic1.y = -10;
    page3Layer.addChild(pic1);

    var cover = new LSprite();
    cover.graphics.drawRect(0,'#fff',[40,25,680,440]);

    var dot = new LBitmap(new LBitmapData(imglist["icons"],0,400,90,144));
    dot.x = 320;
    dot.y = 190;
    dot.scaleX = 0.66;
    dot.scaleY = 0.66;
    dot.mask = cover;
    page3Layer.addChild(dot);

    var rode = new LBitmap(new LBitmapData(imglist["icons"],0,1037,210,420));
    rode.x = 190;
    rode.y = 235;
    rode.scaleX = 0.66;
    rode.scaleY = 0.66;
    rode.mask = cover;
    page3Layer.addChild(rode);

    var line = new LSprite();
    line.pic = new LBitmap(new LBitmapData(imglist["icons"],0,0,20,400));
    line.pic.x = -10;
    line.pic.y = -400;
    line.addChild(line.pic);
    line.x = 185;
    line.y = 490;
    line.scaleX = 0.66;
    line.scaleY = 0.66;
    line.rotate = 40;
    line.mask = cover;
    page3Layer.addChild(line);

    var exit = new LBitmap(new LBitmapData(imglist["icons"],0,656,120,70));
    exit.x = 210;
    exit.y = 335;
    exit.scaleX = 0.66;
    exit.scaleY = 0.66;
    exit.mask = cover;
    page3Layer.addChild(exit);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,1330,586,296));
    info1.x = 360;
    info1.y = 50;
    info1.scaleX = 0.6;
    info1.scaleY = 0.6;
    page3Layer.addChild(info1);

    /*
        bottom
    */
    var pic2 = new LBitmap(new LBitmapData(imglist["p3_pic3"]));
    pic2.y = 470;
    page3Layer.addChild(pic2);

    var car1 = new LBitmap(new LBitmapData(imglist["p3_pic2"],0,0,460,140));
    car1.x = 20;
    car1.y = 510;
    page3Layer.addChild(car1);

    var car2 = new LBitmap(new LBitmapData(imglist["p3_pic2"],0,146,460,140));
    car2.x = 20;
    car2.y = 656;
    page3Layer.addChild(car2);

    var car3 = new LBitmap(new LBitmapData(imglist["p3_pic2"],0,292,460,140));
    car3.x = 20;
    car3.y = 802;
    page3Layer.addChild(car3);

    var car4 = new LBitmap(new LBitmapData(imglist["p3_pic2"],472,0,240,432));
    car4.x = 492;
    car4.y = 510;
    page3Layer.addChild(car4);

    var info2 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,329,220,254));
    info2.x = 340;
    info2.y = 610;
    page3Layer.addChild(info2);

    var info3 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,806,262,196));
    info3.x = 488;
    info3.y = 1021;
    page3Layer.addChild(info3);

    var helicopter = new LBitmap(new LBitmapData(imglist["helicopter"]));
    helicopter.x = 270;
    helicopter.y = 370;
    page3Layer.addChild(helicopter);
}

function page4Init(){
    page4Layer = new LSprite();
    page4Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page4Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p4_pic1"]));
    page4Layer.addChild(pic1);

    var car = new Car();
    car.x = 345;
    car.y = 75;
    page4Layer.addChild(car);

    var pic2 = new LBitmap(new LBitmapData(imglist["p4_pic2"]));
    pic2.y = 477;
    page4Layer.addChild(pic2);
}

function page5Init(){
    page5Layer = new LSprite();
    page5Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page5Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p5_pic1"],0,0,750,232));
    page5Layer.addChild(pic1);

    var pic2 = new LBitmap(new LBitmapData(imglist["p5_pic1"],0,235,750,470));
    pic2.y = 235;
    page5Layer.addChild(pic2);

    var pic3 = new LBitmap(new LBitmapData(imglist["p5_pic1"],0,704,750,445));
    pic3.y = 704;
    page5Layer.addChild(pic3);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,0,182,88));
    info1.x = 515;
    info1.y = 840;
    page5Layer.addChild(info1);
}

function page6Init(){
    page6Layer = new LSprite();
    page6Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#202020");
    stage.addChild(page6Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p6_pic1"],40,0,574,470));
    pic1.x = 40;
    pic1.y = 155;
    page6Layer.addChild(pic1);

    var pic2 = new LBitmap(new LBitmapData(imglist["p6_pic1"],168,500,540,350));
    pic2.x = 168;
    pic2.y = 660;
    page6Layer.addChild(pic2);

    var hand = new LBitmap(new LBitmapData(imglist["icons"],31,7,82,90));
    hand.x = 280;
    hand.y = 560;
    page6Layer.addChild(hand);
}