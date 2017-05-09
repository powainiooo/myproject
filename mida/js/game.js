var stage;

var loadinglist = {};
var loadingData = new Array(
    {name:"L_loading",path:imgsrc+"./images/loading.png"},
    {name:"L_line",path:imgsrc+"./images/L_line.png"}
);

var imglist = {};
var imgData = new Array(
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
            //stage.removeChild(loadinglayer);
            //loadinglayer = null;
            //gameInit();
        }
    );
}

function startInit(){
    startLayer = new LSprite();
    startLayer.graphics.drawRect(0,"#000",[0,0,640,960],true,"rgba(0,0,0,0.5)");
    stage.addChild(startLayer);

    var title = new LBitmap(new LBitmapData(imglist["title"]));
    title.x = (LGlobal.width - title.getWidth())/2;
    title.y = 85;
    startLayer.addChild(title);

    var txt = new LTextField();
    txt.text = startTXT;
    txt.color = start_COLOR;
    txt.size = 26;
    txt.width = 460;
    txt.setWordWrap(true,40);
    txt.x = (LGlobal.width - txt.getWidth())/2;
    txt.y = 280;
    startLayer.addChild(txt);

    var startbt = new LButton(new LBitmap(new LBitmapData(imglist["startbt"])));
    var btw = startbt.getWidth();
    if(btw > 443){
        startbt.scaleX = 443/btw;
        startbt.scaleY = 443/btw;
    }
    startbt.x = (LGlobal.width - startbt.getWidth())/2;
    startbt.y = 450;
    startLayer.addChild(startbt);
    startbt.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(function(){

            var transParams = {type:LTransition.Iris,startPoint:5,shape:LIris.CIRCLE,duration:2,direction:LTransition.OUT,easing:Strong.easeOut,onComplete:function(){
                stage.removeChild(startLayer);
                gameInit();
            }};
            LTransitionManager.start(startLayer,transParams);
        },500);
    });
}

function gameInit(){

}

function endInit(){
    endLayer = new LSprite();
    endLayer.graphics.drawRect(0,"#000",[0,0,640,960],true,"rgba(0,0,0,0.5)");
    stage.addChild(endLayer);

    var frame = new LBitmap(new LBitmapData(imglist["frame"]));
    frame.x = (LGlobal.width - frame.getWidth())/2;
    frame.y = 44;
    endLayer.addChild(frame);

    var txt = new LTextField();
    txt.text = "恭喜你在双十二中抢购了"+gameData.point+",打败全国"+beat+"%人！"+endTXT;
    txt.color = endTXT_COLOR;
    txt.size = 30;
    txt.width = 430;
    txt.setWordWrap(true,40);
    txt.x = 265;
    txt.y = 80;
    endLayer.addChild(txt);

    var btreplay = new LButton(new LBitmap(new LBitmapData(imglist["endbt1"])));
    btreplay.x = (LGlobal.width - btreplay.getWidth())/2;
    btreplay.y = 490;
    endLayer.addChild(btreplay);
    btreplay.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(function(){
            stage.removeChild(endLayer);
            stage.removeChild(gameLayer);
            resetgameData();
            gameInit();
        },500);
    });

    var btshare = new LButton(new LBitmap(new LBitmapData(imglist["endbt2"])));
    btshare.x = (LGlobal.width - btshare.getWidth())/2;
    btshare.y = 610;
    endLayer.addChild(btshare);
    btshare.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(function(){
            shareInit();
        },500);
    });

    var btattention = new LButton(new LBitmap(new LBitmapData(imglist["endbt3"])));
    btattention.x = (LGlobal.width - btattention.getWidth())/2;
    btattention.y = 730;
    endLayer.addChild(btattention);
    btattention.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(function(){
            window.location = attentionAddr;
        },500);
    });
}