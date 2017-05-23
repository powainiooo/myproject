var stage;

var loadinglist = {};
var loadingData = new Array(
    {name:"L_loading",path:imgsrc+"./images/loading_cover.png"},
    {name:"L_line",path:imgsrc+"./images/loading_line.png"}
);

var imglist = {};
var imgData = new Array(
    {name:"bg1",path:imgsrc+"./images/bg1.jpg"},
    {name:"bg2",path:imgsrc+"./images/bg2.jpg"},
    {name:"select-female",path:imgsrc+"./images/select-female.png"},
    {name:"select-male",path:imgsrc+"./images/select-male.png"},
    {name:"person",path:imgsrc+"./images/person.jpg"},
    {name:"icons",path:imgsrc+"./images/icons.png"},
    {name:"male",path:imgsrc+"./images/male.png"},
    {name:"female",path:imgsrc+"./images/female.png"}
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
            selectPage();
        }
    );
}

function selectPage(){
    selectLayer = new LSprite();
    stage.addChild(selectLayer);

    var bg = new Zimg([imglist['bg2']]);
    selectLayer.addChild(bg);

    var female = new ZRimg([imglist['select-female']],0,0);
    female.x = 13;
    female.y = 140;
    selectLayer.addChild(female);

    var btnFemale = new ZRimg([imglist['icons'],408,232,244,80],-122,-35);
    btnFemale.x = 580;
    btnFemale.y = 350;
    female.addChild(btnFemale);
    btnFemale.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btnFemale,function(){
            homePage('female');
        });
    });

    var male = new ZRimg([imglist['select-male']],0,0);
    male.x = 13;
    male.y = 610;
    selectLayer.addChild(male);

    var btnMale = new ZRimg([imglist['icons'],408,232,244,80],-122,-35);
    btnMale.x = 580;
    btnMale.y = 350;
    male.addChild(btnMale);
    btnMale.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btnMale,function(){
            homePage('male');
        });
    });
}

function homePage(sex){
    homeLayer = new LSprite();
    stage.addChild(homeLayer);

    var bg = new Zimg([imglist['bg1']]);
    homeLayer.addChild(bg);

    var startBtn = new StartBtn();
    homeLayer.addChild(startBtn);

    var lvline = new Lvline(5);
    homeLayer.addChild(lvline);

    var diamondLine = new DiamondLine(5);
    homeLayer.addChild(diamondLine);

    var moneyLine = new MoneyLine(5);
    homeLayer.addChild(moneyLine);

    var persondata = new Persondata();
    homeLayer.addChild(persondata);

    var btnInvite = new HomeFunc('邀请好友',395,150);
    homeLayer.addChild(btnInvite);

    var btnActiv = new HomeFunc('活动',535,150);
    homeLayer.addChild(btnActiv);

    var btnHelp = new HomeFunc('帮助',675,150);
    homeLayer.addChild(btnHelp);

    var btnGZH = new LButton(new Zimg([imglist['icons'],3,49,80,102]));
    btnGZH.x = 25;
    btnGZH.y = 225;
    homeLayer.addChild(btnGZH);

    var btnFeedList = new LButton(new Zimg([imglist['icons'],196,64,64,220]));
    btnFeedList.y = 955;
    homeLayer.addChild(btnFeedList);

    var btnFriend = new HomeBottomFunc('好友',90,1200);
    homeLayer.addChild(btnFriend);

    var btnRank = new HomeBottomFunc('排行榜',245,1200);
    homeLayer.addChild(btnRank);

    var btnFeed = new HomeBottomFunc('喂养',400,1200);
    homeLayer.addChild(btnFeed);

    var btnMsg = new HomeBottomFunc('消息',555,1200);
    homeLayer.addChild(btnMsg);

    if(sex == 'male'){
        var male = new Male();
    }else if(sex == 'female'){
        var male = new Female();
    }
    homeLayer.addChild(male);

    var transParams = {type:LTransition.Curtain,dimension:1,duration:2,direction:LTransition.IN,easing:Strong.easeOut};
    LTransitionManager.start(homeLayer,transParams);
}