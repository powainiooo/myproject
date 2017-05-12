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
    {name:"title1",path:imgsrc+"./images/title1.png"},
    {name:"beespart",path:imgsrc+"./images/beespart.png"},
    {name:"bg",path:imgsrc+"./images/bg.jpg"},
    {name:"bee1",path:imgsrc+"./images/bee1.png"}
);


function main(){
    LGlobal.setDebug(true);
    //全屏操作
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    //添加舞台
    stage = new LSprite();
    stage.graphics.drawRect(0,"#eee93a",[0,0,750,1125],true,"#eee93a");
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
            page3Init();
        }
    );
}

function page1Init(){
    page1Layer = new LSprite();
    page1Layer.graphics.drawRect(0,"#eee93a",[0,0,750,1125],true,"#eee93a");
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
        objMove.call(page1Layer,{
            direc:'out',
            t:1,
            delay:1,
            callback:page2Init
        })
    });
    page1Layer.addChild(logo);
}

function page2Init(){
    page2Layer = new LSprite();
    page2Layer.graphics.drawRect(0,"#eee93a",[0,0,750,1125],true,"#eee93a");
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

    objMove.call(page2Layer,{
        t:2,
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
        delay:4
    });
    objMove.call(title,{
        type:'scaleS2L',
        ei:'Back',
        delay:4.4,
        callback:function(){
            objMove.call(bee,{
                direc:'out',
                t:1
            });
            objMove.call(logo,{
                direc:'out',
                t:1
            });
            objMove.call(title,{
                direc:'out',
                t:1
            });
        }
    });

    LTweenLite.to(bg,1,{y:-1120,delay:7,ease:LEasing.None.easeIn,onComplete:page3Init});
}

function page3Init(){
    page3Layer = new LSprite();
    page3Layer.graphics.drawRect(0,"#fff",[0,0,750,1125],true,"#fff");
    stage.addChild(page3Layer);

    var bg = new LBitmap(new LBitmapData(imglist['bg']));
    bg.y = -1120;
    page3Layer.addChild(bg);

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

    objMove.call(body,{
        delay:1
    });
    objMove.call(wing,{
        delay:1.3
    });
    objMove.call(inside,{
        delay:1.6
    });
    objMove.call(head,{
        delay:1.9
    });
}