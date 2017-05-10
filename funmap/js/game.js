var stage;

var loadinglist = {};
var loadingData = new Array(
    {name:"L_loading",path:imgsrc+"./images/loading.png"},
    {name:"L_line",path:imgsrc+"./images/L_line.png"}
);

var imglist = {};
var imgData = new Array(
    {name:"logo",path:imgsrc+"./images/logo.png"}
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
            page1Init();
        }
    );
}

function page1Init(){
    page1Layer = new LSprite();
    page1Layer.graphics.drawRect(0,"#fff100",[0,0,750,1125],true,"#fff100");
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
        logo.alpha = 0;
        scaleIn.call(logo);
    });
    page1Layer.addChild(logo);
}