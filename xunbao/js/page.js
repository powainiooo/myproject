﻿var stage;

var loadinglist = {};
var loadingData = [
    {name:"L_loading",path:imgsrc+"./images/loading_cover.png"},
    {name:"L_line",path:imgsrc+"./images/loading_line.png"}
];

var imglist = {};
var imgData = [
    {name:"bg1",path:imgsrc+"./images/bg1.jpg"},
    {name:"bg2",path:imgsrc+"./images/bg2.jpg"},
    {name:"select-female",path:imgsrc+"./images/select-female.png"},
    {name:"select-male",path:imgsrc+"./images/select-male.png"},
    {name:"person",path:imgsrc+"./images/person.jpg"},
    {name:"icons",path:imgsrc+"./images/icons.png"},
    {name:"male",path:imgsrc+"./images/male.png"},
    {name:"female",path:imgsrc+"./images/female.png"}
];

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

//选择宠物页
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
            //homePage('female');
            mapPage();
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

//首页
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

//地图页
function mapPage(){
    var mapWindow = document.getElementById('mapWindow');
    mapWindow.style.display = 'block';
    setTimeout(function(){
        mapWindow.firstElementChild.className += ' tsf-reset';
    },100);
    document.getElementById('map').style.height = window.innerHeight*0.8+'px';

    map = new AMap.Map('map', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function(data){
            var lng = data.position.getLng();
            var lat = data.position.getLat();
            console.log('lng:'+lng+';lat:'+lat);

            marker = new AMap.Marker({
                map : map,
                icon : "images/icon-marker.png",
                position : [lng-0.001,lat-0.001],
                offset : new AMap.Pixel(-25, -36)
            })
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', function(data){
            console.log("fail");
        });      //返回定位出错信息
    });
}