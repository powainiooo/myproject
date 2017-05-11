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
    {name:"p2_info",path:imgsrc+"./images/p2_info.png"},
    {name:"p3_pic1",path:imgsrc+"./images/p3_pic1.jpg"},
    {name:"p3_pic2",path:imgsrc+"./images/p3_pic2.jpg"},
    {name:"p3_pic3",path:imgsrc+"./images/p3_pic3.jpg"},
    {name:"p4_pic1",path:imgsrc+"./images/p4_pic1.jpg"},
    {name:"p4_pic2",path:imgsrc+"./images/p4_pic2.jpg"},
    {name:"p5_pic1",path:imgsrc+"./images/p5_pic1.jpg"},
    {name:"p6_pic1",path:imgsrc+"./images/p6_pic1.jpg"},
    {name:"p7_pic1",path:imgsrc+"./images/p7_pic1.jpg"},
    {name:"p8_pic1",path:imgsrc+"./images/p8_pic1.jpg"},
    {name:"p8_pic2",path:imgsrc+"./images/p8_pic2.jpg"},
    {name:"p8_pic3",path:imgsrc+"./images/p8_pic3.png"},
    {name:"p8_pic4",path:imgsrc+"./images/p8_pic4.jpg"},
    {name:"p8_pic5",path:imgsrc+"./images/p8_pic5.png"},
    {name:"p9_pic1",path:imgsrc+"./images/p9_pic1.jpg"},
    {name:"p9_pic2",path:imgsrc+"./images/p9_pic2.png"},
    {name:"p10_pic1",path:imgsrc+"./images/p10_pic1.jpg"},
    {name:"p10_btn",path:imgsrc+"./images/p10_btn.png"},
    {name:"p10_line",path:imgsrc+"./images/p10_line.png"},
    {name:"p10_pic2",path:imgsrc+"./images/p10_pic2.png"},
    {name:"p10_pic3",path:imgsrc+"./images/p10_pic3.png"},
    {name:"p10_satellite",path:imgsrc+"./images/p10_satellite.png"},
    {name:"p11_pic1",path:imgsrc+"./images/p11_pic1.jpg"},
    {name:"p11_pic2",path:imgsrc+"./images/p11_pic2.jpg"},
    {name:"helicopter",path:imgsrc+"./images/helicopter.png"},
    {name:"redlight",path:imgsrc+"./images/redlight.png"},
    {name:"car",path:imgsrc+"./images/car.png"},
    {name:"cars",path:imgsrc+"./images/cars.png"},
    {name:"line1",path:imgsrc+"./images/line1.png"},
    {name:"c_imgs",path:imgsrc+"./images/c_imgs.png"},
    {name:"icons",path:imgsrc+"./images/icons.png"}
);

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
            page11Init();
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

    var backSprite;
    var paintbrushSprite;
    var outBitmapData;
    var paintbrushBitmapData;
    var paintbrush;
    var paintbrushSize = 50;
    var pointList = [];
    var lx = 0, ly = 0;
    var isStart = false;

    var bitmapData;
    var bitmap;
    var shape;

    var backBitmapData = new LBitmapData(imglist["p2_map_cover"]);

    paintbrushSprite = new LSprite();

    //每次填充像素块儿做成，一个类似刷子的东西
    shape = new LShape();
    shape.graphics.drawArc(0, "#CCCCCC", [paintbrushSize,paintbrushSize, paintbrushSize,0, Math.PI*2], true, "#CCCCCC");
    bitmapData = new LBitmapData(null, 0, 0, paintbrushSize, paintbrushSize, LBitmapData.DATA_CANVAS);
    bitmapData.draw(shape);
    paintbrush = bitmapData.getPixels(new LRectangle(0, 0, paintbrushSize, paintbrushSize));

    //这个用来做颜色合成
    paintbrushBitmapData = new LBitmapData(null, 0, 0, backBitmapData.width, backBitmapData.height, LBitmapData.DATA_CANVAS);
    //这个用来拷贝像素
    outBitmapData = new LBitmapData(null, 0, 0, backBitmapData.width, backBitmapData.height, LBitmapData.DATA_CANVAS);

    var paintbrushBitmap = new LBitmap(paintbrushBitmapData);
    paintbrushSprite.addChild(paintbrushBitmap);
    //我用了同一张图片，为了看出效果，我显示了不同的区域，以达到错位
    bitmapData = new LBitmapData(imglist["p2_map_bg"]);
    bitmap = new LBitmap(bitmapData);
    paintbrushSprite.addChild(bitmap);
    //＊这个是关键，因为是LBlendMode.SOURCE_IN，所以只能显示和paintbrushBitmapData重叠的部分，最初paintbrushBitmapData中是null，所以没有图
    //因为LBlendMode的效果是叠加的，所以如果还要显示其他图片的话，绝对不可以直接显示这个bitmap，否则整个画面都将变成LBlendMode.SOURCE_IN。所以要将它拷贝到另一个outBitmapData中
    bitmap.blendMode = LBlendMode.SOURCE_IN;


    backSprite = new LSprite();
    page2Layer.addChild(backSprite);
    //底图
    var backBitmap = new LBitmap(backBitmapData);
    backSprite.addChild(backBitmap);
    //
    var outBitmap = new LBitmap(outBitmapData);
    backSprite.addChild(outBitmap);

    var picinfo = new LBitmap(new LBitmapData(imglist["p2_info"]));
    picinfo.x = 150;
    picinfo.y = 250;
    backSprite.addChild(picinfo);

    var hand = new LBitmap(new LBitmapData(imglist["icons"]));
    //刮图
    backSprite.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
        isStart = true;
        paintbrushBitmapData.putPixels(new LRectangle(event.selfX - paintbrushSize * 0.5, event.selfY - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
    });
    backSprite.addEventListener(LMouseEvent.MOUSE_MOVE, function(event){
        if (isStart) {
            if (pointList.indexOf(Math.round(event.offsetX) + "_" + Math.round(event.offsetY)) < 0) {
                pointList.push(Math.round(event.offsetX) + "_" + Math.round(event.offsetY));
            }

            //console.log(pointList.length);
            //之前的bitmap和paintbrushBitmapData重叠的部分就会有效
            if (lx == 0 && ly == 0) {
                lx = event.offsetX;
                ly = event.offsetY;
                paintbrushBitmapData.putPixels(new LRectangle(event.selfX - paintbrushSize * 0.5, event.selfY - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
            }
            else {
                //补充画笔
                paintbrushBitmapData.putPixels(new LRectangle(lx + (event.selfX - lx) / 5 - paintbrushSize * 0.5, ly + (event.selfY - ly) / 5 - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
                paintbrushBitmapData.putPixels(new LRectangle(lx + (event.selfX - lx) * 2 / 5 - paintbrushSize * 0.5, ly + (event.selfY - ly) * 2 / 5 - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
                paintbrushBitmapData.putPixels(new LRectangle(lx + (event.selfX - lx) * 3 / 5 - paintbrushSize * 0.5, ly + (event.selfY - ly) * 3 / 5 - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
                paintbrushBitmapData.putPixels(new LRectangle(lx + (event.selfX - lx) * 4 / 5 - paintbrushSize * 0.5, ly + (event.selfY - ly) * 4 / 5 - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
                paintbrushBitmapData.putPixels(new LRectangle(event.selfX - paintbrushSize * 0.5, event.selfY - paintbrushSize * 0.5, paintbrushSize, paintbrushSize), paintbrush);
                lx = event.offsetX;
                ly = event.offsetY;
            }
        }
    });
    backSprite.addEventListener(LMouseEvent.MOUSE_UP, function(event){
        //alert(pointList.length);
        isStart = false;
        lx = 0;
        ly = 0;
        //刮到一定坐标数,可调整
        if (pointList.length >= 150) {
            //LTweenLite.to(backSprite, 1, { alpha: 0, ease: LEasing.Strong.easeInOut,  });
            //backSprite.removeAllChild();

            var newBitmap = new LBitmap(new LBitmapData(imglist["p2_map_bg"]));
            newBitmap.alpha = 0;
            backSprite.addChild(newBitmap);
            backSprite.addChild(picinfo);
            LTweenLite.to(newBitmap, 1, { alpha: 1, ease: LEasing.Strong.easeInOut});
        }
    });

    //实时拷贝像素
    backSprite.addEventListener(LEvent.ENTER_FRAME, function(){
        outBitmapData.draw(paintbrushSprite);
    });
}

function page3Init(){
    page3Layer = new LSprite();
    page3Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page3Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p3_pic1"]));
    pic1.y = -10;
    pic1.alpha = 0;
    page3Layer.addChild(pic1);

    var cover = new LSprite();
    cover.graphics.drawRect(0,'#fff',[40,25,680,440]);

    var dot = new LBitmap(new LBitmapData(imglist["icons"],0,400,90,144));
    dot.x = 320;
    dot.y = 190;
    dot.scaleX = 0.66;
    dot.scaleY = 0.66;
    dot.mask = cover;
    dot.alpha = 0;
    page3Layer.addChild(dot);

    var rode = new LBitmap(new LBitmapData(imglist["icons"],0,1037,210,420));
    rode.x = 190;
    rode.y = 235;
    rode.scaleX = 0.66;
    rode.scaleY = 0.66;
    rode.mask = cover;
    rode.alpha = 0;
    page3Layer.addChild(rode);

    var line = new LSprite();
    line.pic = new LBitmap(new LBitmapData(imglist["icons"],0,0,20,400));
    line.pic.x = -10;
    line.pic.y = -400;
    line.addChild(line.pic);
    line.x = 185;
    line.y = 490;
    line.scaleX = 0.66;
    line.scaleY = 0;
    line.rotate = 40;
    line.mask = cover;
    page3Layer.addChild(line);

    var exit = new LBitmap(new LBitmapData(imglist["icons"],0,656,120,70));
    exit.x = 210;
    exit.y = 335;
    exit.scaleX = 0.66;
    exit.scaleY = 0.66;
    exit.mask = cover;
    exit.alpha = 0;
    page3Layer.addChild(exit);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,1330,586,296));
    info1.x = 360;
    info1.y = 50;
    info1.scaleX = 0.6;
    info1.scaleY = 0.6;
    info1.alpha = 0;
    page3Layer.addChild(info1);

    objMove.call(pic1,'up',0,1);
    setTimeout(function(){
        objMove.call(dot,'down',200);
    },500);
    setTimeout(function(){
        objShake.call(page3Layer);
    },800);
    setTimeout(function(){
        scaleIn.call(rode);
        scaleIn.call(exit);
    },1200);
    setTimeout(function(){
        LTweenLite.to(line,0.3,{scaleY:0.66,ease:LEasing.Cubic.easeInOut});
    },1500);
    setTimeout(function(){
        objMove.call(info1,'right');
    },1800);
    /*
        bottom
    */
    var pic2 = new LBitmap(new LBitmapData(imglist["p3_pic3"]));
    pic2.y = 470;
    pic2.alpha = 0;
    page3Layer.addChild(pic2);

    var car1 = new LBitmap(new LBitmapData(imglist["p3_pic2"],0,0,460,140));
    car1.x = 20;
    car1.y = 510;
    car1.alpha = 0;
    page3Layer.addChild(car1);

    var car2 = new LBitmap(new LBitmapData(imglist["p3_pic2"],0,146,460,140));
    car2.x = 20;
    car2.y = 656;
    car2.alpha = 0;
    page3Layer.addChild(car2);

    var car3 = new LBitmap(new LBitmapData(imglist["p3_pic2"],0,292,460,140));
    car3.x = 20;
    car3.y = 802;
    car3.alpha = 0;
    page3Layer.addChild(car3);

    var car4 = new LBitmap(new LBitmapData(imglist["p3_pic2"],472,0,240,432));
    car4.x = 492;
    car4.y = 510;
    car4.alpha = 0;
    page3Layer.addChild(car4);

    var info2 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,329,220,254));
    info2.x = 340;
    info2.y = 610;
    info2.alpha = 0;
    page3Layer.addChild(info2);

    var info3 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,806,262,196));
    info3.x = 488;
    info3.y = 1021;
    info3.alpha = 0;
    page3Layer.addChild(info3);

    var helicopter = new LBitmap(new LBitmapData(imglist["helicopter"]));
    helicopter.x = 270;
    helicopter.y = 370;
    helicopter.alpha = 0;
    page3Layer.addChild(helicopter);

    setTimeout(function(){
        objMove.call(pic2,'right',0);
    },2000);
    setTimeout(function(){
        objMove.call(car1,'right');
    },2500);
    setTimeout(function(){
        objMove.call(car2,'right');
    },2700);
    setTimeout(function(){
        objMove.call(car3,'right');
    },2900);
    setTimeout(function(){
        objMove.call(car4,'left');
    },3100);
    setTimeout(function(){
        objMove.call(helicopter,'left',200);
    },3600);
    setTimeout(function(){
        LTweenLite.to(helicopter,0.8,{x:260,loop:true,ease:LEasing.None.easeIn}).to(helicopter,1.6,{x:280,loop:true,ease:LEasing.None.easeIn}).to(helicopter,0.8,{x:270,loop:true,ease:LEasing.None.easeIn});
    },4000);
    setTimeout(function(){
        objMove.call(info2,'left',0,0.8);
    },4000);
    setTimeout(function(){
        objMove.call(info3,'left',0,0.8);
    },6000);
}

function page4Init(){
    page4Layer = new LSprite();
    page4Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page4Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p4_pic1"]));
    pic1.alpha = 0;
    page4Layer.addChild(pic1);

    var car = new Car();
    car.x = 345;
    car.y = 75;
    car.alpha = 0;
    page4Layer.addChild(car);

    var pic2 = new LBitmap(new LBitmapData(imglist["p4_pic2"]));
    pic2.y = 477;
    pic2.alpha = 0;
    page4Layer.addChild(pic2);

    var btn = new LSprite();
    btn.graphics.drawArc(0,'#fff',[0,0,24,0,2*Math.PI],true,'rgba(20,20,20,0.8)');
    btn.x = 420;
    btn.y = 800;
    btn.alpha = 0;
    page4Layer.addChild(btn);

    objMove.call(pic1,'left',0,1);
    setTimeout(function(){
        car.move();
        objMove.call(car,'left',400,1);
    },1000);
    setTimeout(function(){
        car.move();
        objMove.call(pic2,'left',0,1);
    },2000);
    LTweenLite.to(btn,0.6,{alpha:0.8,delay:2.5,ease:LEasing.None.easeIn}).to(btn,0.6,{alpha:0.3,loop:true,ease:LEasing.None.easeIn}).to(btn,0.6,{alpha:0.8,loop:true,ease:LEasing.None.easeIn});
}

function page5Init(){
    page5Layer = new LSprite();
    page5Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page5Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p5_pic1"],0,0,750,232));
    pic1.alpha = 0;
    page5Layer.addChild(pic1);

    var pic2 = new LBitmap(new LBitmapData(imglist["p5_pic1"],0,235,750,470));
    pic2.y = 235;
    pic2.alpha = 0;
    page5Layer.addChild(pic2);

    var pic3 = new LBitmap(new LBitmapData(imglist["p5_pic1"],0,704,750,445));
    pic3.y = 704;
    pic3.alpha = 0;
    page5Layer.addChild(pic3);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,0,182,88));
    info1.x = 515;
    info1.y = 840;
    info1.alpha = 0;
    page5Layer.addChild(info1);

    objMove.call(pic1,'up',150,1,'Back');
    setTimeout(function(){
        objMove.call(pic2,'up',150,1,'Back');
    },1500);
    setTimeout(function(){
        objMove.call(pic3,'up',150,1,'Back');
    },3000);
    setTimeout(function(){
        objMove.call(info1,'left',100,0.5,'Back');
    },5000);
}

function page6Init(){
    page6Layer = new LSprite();
    page6Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#202020");
    stage.addChild(page6Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p6_pic1"],40,0,574,470));
    pic1.x = 40;
    pic1.y = 155;
    pic1.alpha = 0;
    page6Layer.addChild(pic1);

    var pic2 = new LBitmap(new LBitmapData(imglist["p6_pic1"],168,500,540,350));
    pic2.x = 168;
    pic2.y = 660;
    pic2.alpha = 0;
    page6Layer.addChild(pic2);

    var hand = new LBitmap(new LBitmapData(imglist["icons"],31,7,82,90));
    hand.x = 280;
    hand.y = 560;
    hand.alpha = 0;
    page6Layer.addChild(hand);

    scaleIn.call(pic1,1);
    setTimeout(function(){
        objMove.call(hand,'up',100,1);
    },1200);

    var btn = new LSprite();
    btn.graphics.drawRect(0,'#000',[0,0,100,100]);
    btn.x = 240;
    btn.y = 520;
    page6Layer.addChild(btn);
    btn.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        pic2.alpha = 1;
        objShake.call(pic2);
    })
}

function page7Init(){
    page7Layer = new LSprite();
    page7Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#202020");
    stage.addChild(page7Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p7_pic1"],0,0,750,510));
    pic1.alpha = 0;
    page7Layer.addChild(pic1);

    var car = new Car();
    car.x = 15;
    car.y = 230;
    car.scaleX = 0.93;
    car.scaleY = 0.93;
    car.alpha = 0;
    page7Layer.addChild(car);

    var dust1 = new LBitmap(new LBitmapData(imglist["icons"],0,1655,289,319));
    dust1.x = 460;
    dust1.y = 122;
    dust1.alpha = 0;
    page7Layer.addChild(dust1);

    var dust2 = new LBitmap(new LBitmapData(imglist["icons"],0,726,149,74));
    dust2.x = 110;
    dust2.y = 210;
    dust2.alpha = 0;
    page7Layer.addChild(dust2);

    var pic2 = new LBitmap(new LBitmapData(imglist["p7_pic1"],0,510,750,707));
    pic2.y = 510;
    pic2.alpha = 0;
    page7Layer.addChild(pic2);

    var treeL = new LBitmap(new LBitmapData(imglist["icons"],0,1974,409,240));
    treeL.x = 20;
    treeL.y = 610;
    treeL.alpha = 0;
    page7Layer.addChild(treeL);

    var treeR = new LBitmap(new LBitmapData(imglist["icons"],0,800,177,237));
    treeR.x = 570;
    treeR.y = 630;
    treeR.alpha = 0;
    page7Layer.addChild(treeR);

    var line1 = new LBitmap(new LBitmapData(imglist["line1"]));
    line1.y = 520;
    line1.alpha = 0;
    page7Layer.addChild(line1);

    objMove.call(pic1,'up',0,1.2);
    objMove.call(car,'up',0,1.2);
    setTimeout(function(){
        car.move();
    },1000);
    setTimeout(function(){
        LTweenLite.to(dust1,0.8,{alpha:1,ease:LEasing.None.easeIn}).to(dust1,0.5,{alpha:0,loop:true,ease:LEasing.None.easeIn}).to(dust1,0.5,{alpha:1,loop:true,ease:LEasing.None.easeIn});
        LTweenLite.to(dust2,0.8,{alpha:1,delay:1,ease:LEasing.None.easeIn});
    },1500);
    setTimeout(function(){
        objMove.call(pic2,'up',0,1.2);
    },4000);
    setTimeout(function(){
        treeL.alpha = 1;
        treeR.alpha = 1;
        LTweenLite.to(line1,0.2,{alpha:0,loop:true,ease:LEasing.None.easeIn,onComplete:function(){
            treeL.x = -200;
            treeL.y = 700;
            treeR.x = 650;
            treeR.y = 740;
        }}).to(line1,0.2,{alpha:1,loop:true,ease:LEasing.None.easeIn,onComplete:function(){
            treeL.x = 20;
            treeL.y = 610;
            treeR.x = 570;
            treeR.y = 630;
        }})
    },4500);

}

function page8Init(){
    page8Layer = new LSprite();
    page8Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page8Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p8_pic1"],0,0,750,535));
    pic1.alpha = 0;
    page8Layer.addChild(pic1);

    var redlight = new LBitmap(new LBitmapData(imglist["redlight"]));
    redlight.x = 120;
    redlight.y = 38;
    redlight.scaleX = 0.6;
    redlight.scaleY = 0.6;
    redlight.alpha = 0;
    page8Layer.addChild(redlight);

    var cars = new LBitmap(new LBitmapData(imglist["cars"]));
    cars.alpha = 0;
    page8Layer.addChild(cars);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,1781,754,390));
    info1.x = 244;
    info1.y = 18;
    info1.alpha = 0;
    info1.scaleX = 0.6;
    info1.scaleY = 0.6;
    page8Layer.addChild(info1);

    var phone = new LBitmap(new LBitmapData(imglist["p8_pic1"],0,610,750,605));
    phone.y = 610;
    phone.alpha = 0;
    page8Layer.addChild(phone);

    objMove.call(pic1,"up",0,1.5);
    setTimeout(function(){
        objMove.call(redlight,"up",0,1.5);
    },2000);
    setTimeout(function(){
        objMove.call(cars,"up",0,1.5);
    },4000);
    setTimeout(function(){
        objMove.call(info1,"left",100,0.5,'Back');
    },6000);
}

function page82Init(){
    page82Layer = new LSprite();
    page82Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page82Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p8_pic2"]));
    pic1.alpha = 1;
    page82Layer.addChild(pic1);

    var cover1 = new LSprite();
    cover1.graphics.drawVertices(0, "#000", [[10, 18], [190, 18], [190, 352],[10,312]], true, "#000");
    page82Layer.addChild(cover1);

    var cover2 = new LSprite();
    cover2.graphics.drawVertices(0, "#000", [[195, 18], [424, 18], [424, 404],[195,352]], true, "#000");
    page82Layer.addChild(cover2);

    var cover3 = new LSprite();
    cover3.graphics.drawVertices(0, "#000", [[428, 18], [740, 18], [740, 475],[428,407]], true, "#000");
    page82Layer.addChild(cover3);

    var cover4 = new LSprite();
    cover4.graphics.drawVertices(0, "#000", [[10, 318], [740, 480], [740, 605],[10,605]], true, "#000");
    page82Layer.addChild(cover4);

    var pic3 = new LBitmap(new LBitmapData(imglist["p8_pic4"]));
    pic3.y = 870;
    pic3.alpha = 0;
    page82Layer.addChild(pic3);

    var pic2 = new LBitmap(new LBitmapData(imglist["p8_pic3"]));
    pic2.y = 617;
    pic2.alpha = 0;
    page82Layer.addChild(pic2);

    var pic4 = new LBitmap(new LBitmapData(imglist["p8_pic5"]));
    pic4.x = 574;
    pic4.y = 236;
    pic4.alpha = 0;
    page82Layer.addChild(pic4);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,1626,595,155));
    info1.x = 310;
    info1.y = 30;
    info1.scaleX = 0.6;
    info1.scaleY = 0.6;
    info1.alpha = 0;
    page82Layer.addChild(info1);

    var info2 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,1002,376,328));
    info2.x = 410;
    info2.y = 890;
    info2.scaleX = 0.6;
    info2.scaleY = 0.6;
    info2.alpha = 0;
    page82Layer.addChild(info2);

    var btn = new LBitmap(new LBitmapData(imglist["c_imgs"],0,88,205,83));
    btn.x = 200;
    btn.y = 1030;
    btn.scaleX = 0.6;
    btn.scaleY = 0.6;
    btn.alpha = 0;
    page82Layer.addChild(btn);

    LTweenLite.to(cover1,1,{alpha:0,ease:LEasing.None.easeIn}).to(cover2,1,{alpha:0,ease:LEasing.None.easeIn}).to(cover3,1,{alpha:0,ease:LEasing.None.easeIn}).to(cover4,1,{alpha:0,ease:LEasing.None.easeIn,onComplete:function(){
        objMove.call(pic4,'left',200,0.6,'Back');
    }});
    setTimeout(function(){
        objMove.call(info1,'up',100,0.6,'Back');
    },5000);
    setTimeout(function(){
        objMove.call(pic3,'up',0,1);
    },6000);
    setTimeout(function(){
        objMove.call(pic2,'up',100,0.6,'Back');
    },7000);
    setTimeout(function(){
        objMove.call(info2,'left',100,0.6,'Back');
    },8000);
    setTimeout(function(){
        objMove.call(btn,'left',100,0.6,'Back');
    },9000);
}

function page9Init(){
    page9Layer = new LSprite();
    page9Layer.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");
    stage.addChild(page9Layer);

    var pic1 = new LBitmap(new LBitmapData(imglist["p9_pic1"]));
    pic1.x = -230;//-1250  -320~-1070
    pic1.y = -1376;//1783  0~-500
    page9Layer.addChild(pic1);

    var info = new LBitmap(new LBitmapData(imglist["p9_pic2"]));
    info.x = 298;
    info.y = 200;
    page9Layer.addChild(info);

    var speedX = 0,speedY = 0,isFit = false;
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function(){
            if(isFit) return;
            if(event.beta > 10){//up
                speedY = 5;
            }else{//down
                speedY = -5;
            }
            if(event.gamma > 0){//right
                speedX = -5;
            }else{//left
                speedX = 5;
            }
        }, false);
    }
    page9Layer.addEventListener(LEvent.ENTER_FRAME,function(){
        if(!isFit){
            pic1.x += speedX;
            pic1.y += speedY;
            if(pic1.x>=0)pic1.x=0;
            if(pic1.x<=-1250)pic1.x=-1250;
            if(pic1.y>=0)pic1.y=0;
            if(pic1.y<=-1783)pic1.y=-1783;
            if(pic1.x >-1070 && pic1.x <-320 && pic1.y <0 && pic1.y >-500){
                isFit = true;
                LTweenLite.to(info,0.3,{alpha:0,ease:LEasing.None.easeIn}).to(pic1,2,{scaleX:1.2,scaleY:1.2,alpha:0,ease:LEasing.None.easeIn});
            }
        }
    })
}

function page10Init() {
    page10Layer = new LSprite();
    page10Layer.graphics.drawRect(0, "#fff100", [0, 0, 750, 1217], true, "#000");
    stage.addChild(page10Layer);

    var bg = new LBitmap(new LBitmapData(imglist["p10_pic1"],0,441,750,776));
    bg.y = 441;
    bg.alpha = 0;
    page10Layer.addChild(bg);

    var satellite = new LBitmap(new LBitmapData(imglist["p10_satellite"]));
    satellite.y = 840;
    satellite.alpha = 0;
    page10Layer.addChild(satellite);

    var line = new LBitmap(new LBitmapData(imglist["p10_line"]));
    line.x = 110;
    line.y = 526;
    line.alpha = 0;
    page10Layer.addChild(line);

    var ge1 = new LBitmap(new LBitmapData(imglist["p10_pic1"],0,48,442,374));
    ge1.y = 10;
    ge1.alpha = 0;
    page10Layer.addChild(ge1);

    var ge2 = new LBitmap(new LBitmapData(imglist["p10_pic2"]));
    ge2.x = 322;
    ge2.y = 90;
    ge2.alpha = 0;
    page10Layer.addChild(ge2);

    var ge3 = new LBitmap(new LBitmapData(imglist["p10_pic3"]));
    ge3.y = 441;
    ge3.alpha = 0;
    page10Layer.addChild(ge3);

    var info1 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,583,252,223));
    info1.x = 18;
    info1.y = 18;
    info1.alpha = 0;
    page10Layer.addChild(info1);

    var info2 = new LBitmap(new LBitmapData(imglist["c_imgs"],0,171,216,158));
    info2.x = 415;
    info2.y = 280;
    info2.alpha = 0;
    page10Layer.addChild(info2);

    var btnL = new LSprite();
    btnL.btn = new LButton(new LBitmap(new LBitmapData(imglist["p10_btn"])));
    btnL.btn.x = -116;
    btnL.btn.y = -116;
    btnL.addChild(btnL.btn);
    btnL.x = 625;
    btnL.y = 650;
    btnL.alpha = 0;
    page10Layer.addChild(btnL);

    objMove.call(bg,'up',0,1.5);
    setTimeout(function(){
        objMove.call(ge1,'right',450,1,'Back');
    },1500);
    setTimeout(function(){
        objMove.call(info1,'up',100,1);
    },2500);
    setTimeout(function(){
        objMove.call(satellite,'up',0,1);
    },3500);
    setTimeout(function(){
        objMove.call(ge2,'left',430,1,'Back');
    },4500);
    setTimeout(function(){
        objMove.call(info2,'down',100,1);
    },5500);
    setTimeout(function(){
        objMove.call(ge3,'right',450,1,'Back');
    },6500);
    setTimeout(function(){
        scaleIn.call(btnL,0.6);
    },7500);
    setTimeout(function(){
        LTweenLite.to(btnL,1,{scaleX:1.1,scaleY:1.1,loop:true,ease:LEasing.None.easeIn}).to(btnL,1,{scaleX:1,scaleY:1,loop:true,ease:LEasing.None.easeIn});
    },8200);
}

function page11Init() {
    page11Layer = new LSprite();
    page11Layer.graphics.drawRect(0, "#fff100", [0, 0, 750, 1217], true, "#202020");
    stage.addChild(page11Layer);

    var bg = new LBitmap(new LBitmapData(imglist["p11_pic1"]));
    bg.alpha = 0;
    page11Layer.addChild(bg);

    var pic1L = new LSprite();
    pic1L.pic = new LBitmap(new LBitmapData(imglist["p11_pic2"],0,0,730,210));
    pic1L.pic.x = -365;
    pic1L.pic.y = -105;
    pic1L.addChild(pic1L.pic);
    pic1L.x = 375;
    pic1L.y = 485;
    pic1L.alpha = 0;
    page11Layer.addChild(pic1L);

    var pic2L = new LSprite();
    pic2L.pic = new LBitmap(new LBitmapData(imglist["p11_pic2"],0,210,730,196));
    pic2L.pic.x = -365;
    pic2L.pic.y = -98;
    pic2L.addChild(pic2L.pic);
    pic2L.x = 375;
    pic2L.y = 688;
    pic2L.alpha = 0;
    page11Layer.addChild(pic2L);

    var pic3L = new LSprite();
    pic3L.pic = new LBitmap(new LBitmapData(imglist["p11_pic2"],0,406,730,200));
    pic3L.pic.x = -365;
    pic3L.pic.y = -100;
    pic3L.addChild(pic3L.pic);
    pic3L.x = 375;
    pic3L.y = 886;
    pic3L.alpha = 0;
    page11Layer.addChild(pic3L);

    var pic4L = new LSprite();
    pic4L.pic = new LBitmap(new LBitmapData(imglist["p11_pic2"],0,606,730,220));
    pic4L.pic.x = -365;
    pic4L.pic.y = -110;
    pic4L.addChild(pic4L.pic);
    pic4L.x = 375;
    pic4L.y = 1096;
    pic4L.alpha = 0;
    page11Layer.addChild(pic4L);

    objMove.call(bg,'up',0,1.5);
    setTimeout(function(){
        scaleOut.call(pic1L,1);
    },2000);
    setTimeout(function(){
        scaleOut.call(pic2L,1);
    },3000);
    setTimeout(function(){
        scaleOut.call(pic3L,1);
    },4000);
    setTimeout(function(){
        scaleOut.call(pic4L,1);
    },5000);
}