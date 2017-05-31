var stage;

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
    {name:"light",path:imgsrc+"./images/light.png"},
    {name:"light2",path:imgsrc+"./images/light2.png"},
    {name:"male",path:imgsrc+"./images/male.png"},
    {name:"female",path:imgsrc+"./images/female.png"}
];

function main(){
    LGlobal.setDebug(true);
    //全屏操作
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
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

//首页
function homePage(sex){
    homeLayer = new LSprite();
    stage.addChild(homeLayer);

    var bg = new Zimg([imglist['bg1']]);
    homeLayer.addChild(bg);

    var startBtn = new StartBtn(mapPage);
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
    document.getElementById('map').style.height = (window.innerHeight-98)+'px';

    setTimeout(function(){
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
                    offset : new AMap.Pixel(-25, -70),
                    extData : {
                        name : '牛厨零食',
                        mile : 250,
                        lng:lng-0.001,
                        lat:lat-0.001
                    }
                }).on('click',function(event){
                        var data = event.target.getExtData();
                        var html = '<div class="infoWindow">';
                        html += '<div>';
                        html += '<span>'+data.name+'的宝箱距离你只有'+data.mile+'米</span>';
                        html += '<p>（200米内才能打开宝箱噢！）</p>';
                        html += '</div><i class="icon-arrow"></i></div>';
                        infoWindow.setContent(html);
                        infoWindow.open(map, [data.lng, data.lat]);
                    });

                marker2 = new AMap.Marker({
                    map : map,
                    icon : "images/icon-marker.png",
                    position : [lng+0.001,lat+0.001],
                    offset : new AMap.Pixel(-25, -70),
                    extData : {
                        name : '牛厨零食',
                        mile : 250,
                        lng:lng-0.001,
                        lat:lat-0.001
                    }
                }).on('click',function(event){
                    var frame = document.getElementById('mapOpenbox');
                        frame.style.display = 'block';
                        setTimeout(function(){
                            frame.className += ' tsf-reset';
                            LGlobal.preventDefault = false;
                        },100);
                        var btn = document.getElementById('btnPlayGame');
                        btn.addEventListener('click',function(){
                            mapWindow.style.display = 'none';
                            var game = new Game();
                            stage.addChild(game);
                            game.init();
                            LGlobal.preventDefault = true;
                        })
                })
            });//返回定位信息
            AMap.event.addListener(geolocation, 'error', function(data){
                console.log(data);
                console.log("fail");
            });      //返回定位出错信息
            infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: 'test',
                offset: new AMap.Pixel(85,-185)//-113, -140
            });
        });
    },500);

}

//游戏页
function Game(){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawRect(0,'#fff',[0,0,750,1333],true,'rgba(0,0,0,0.5)');

    self.times = 30;//游戏时间
    self.clickPassNums = 30;//通关点击次数
    self.clickNums = 0;//当前点击次数
    self.isGaming = false;//是否正在游戏中
}
var p = {
    init:function(){
        var self = this;

        self.light1 = new ZRimg([imglist['light']],-382,-375);
        self.light1.x = 375;
        self.light1.y = 650;
        self.light1.alpha = 0;
        self.addChild(self.light1);

        self.timer = new Timer(30);
        self.timer.x = 200;
        self.timer.y = 210;
        self.timer.alpha = 0;
        self.addChild(self.timer);

        self.hint = new Zimg([imglist['icons'],657,280,265,32],365,300);
        self.hint.alpha = 0;
        self.addChild(self.hint);

        self.point = new Zimg([imglist['icons'],865,185,26,68],440,330);
        self.point.alpha = 0;
        self.addChild(self.point);

        self.cat = new Zimg([imglist['icons'],0,350,295,440],320,350);
        self.cat.alpha = 0;
        self.addChild(self.cat);

        self.boxClose = new ZRimg([imglist['icons'],300,340,260,222],-130,-111);
        self.boxClose.x = 340;
        self.boxClose.y = 731;
        self.boxClose.alpha = 0;
        self.addChild(self.boxClose);

        self.boxOpen = new Zimg([imglist['icons'],566,317,244,253],226,588);
        self.boxOpen.alpha = 0;
        self.addChild(self.boxOpen);

        self.light2 = new ZRimg([imglist['light2']],-96,-100);
        self.light2.x = 330;
        self.light2.y = 740;
        self.light2.alpha = 0;
        self.addChild(self.light2);

        self.move();
    },
    move:function(){
        var self = this;
        self.boxClose.scaleX = 0.85;
        self.boxClose.scaleY = 1.15;
        objMove.call(self.boxClose,{type:'down',t:0.3,dis:800,ei:'None',callback:function(){
            LTweenLite.to(self.boxClose,0.15,{scaleX:1.15,scaleY:0.85,ease:LEasing.None.easeIn}).to(self.boxClose,0.15,{scaleX:0.95,scaleY:1.05,ease:LEasing.None.easeIn}).to(self.boxClose,0.15,{scaleX:1,scaleY:1,ease:LEasing.None.easeIn})
        }});
        objMove.call(self.cat,{type:'up',ei:'Back',delay:1});
        objMove.call(self.light1,{delay:1.2});
        objMove.call(self.timer,{delay:1.5});
        objMove.call(self.hint,{type:'left',delay:1.5,callback:function(){
            self.point.alpha = 1;
            LTweenLite.to(self.point,0.8,{y:340,loop:true,ease:LEasing.None.easeIn}).to(self.point,0,{y:330,loop:true,ease:LEasing.None.easeIn})
        }});
        setTimeout(function(){
            self.timer.count();
            self.twL1 = LTweenLite.to(self.light1,4,{rotate:360,loop:true,ease:LEasing.None.easeIn}).to(self.light1,0,{rotate:0,loop:true,ease:LEasing.None.easeIn});
            self.twL2 = LTweenLite.to(self.light1,0.6,{alpha:0,loop:true,ease:LEasing.None.easeIn}).to(self.light1,0.6,{alpha:1,loop:true,ease:LEasing.None.easeIn});
            self.isGaming = true;
        },3000);

        self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
            if(self.isGaming){
                self.clickNums++;
                LTweenLite.to(self.boxClose,0.05,{x:350,ease:LEasing.None.easeIn}).to(self.boxClose,0.1,{x:330,ease:LEasing.None.easeIn}).to(self.boxClose,0.05,{x:340,ease:LEasing.None.easeIn});
                if(self.clickNums > self.clickPassNums){//通关
                    self.pass();
                }
            }
        })
    },
    pass:function(){
        var self = this;
        self.isGaming = false;
        self.timer.stop();
        LTweenLite.to(self.boxClose,0.05,{x:350,ease:LEasing.None.easeIn}).to(self.boxClose,0.1,{x:330,ease:LEasing.None.easeIn}).to(self.boxClose,0.05,{x:340,ease:LEasing.None.easeIn}).to(self.boxClose,0.3,{scaleX:1.25,scaleY:0.75,ease:LEasing.None.easeIn}).to(self.boxClose,0.1,{scaleX:0.75,scaleY:1.25,ease:LEasing.None.easeIn,onComplete:function(){
            self.boxClose.alpha = 0;
            self.boxOpen.alpha = 1;
            objMove.call(self.light2,{type:'scaleS2L',callback:function(){
                LTweenLite.to(self.light2,2,{rotate:360,loop:true,ease:LEasing.None.easeIn}).to(self.light2,0,{rotate:0,loop:true,ease:LEasing.None.easeIn});
                LTweenLite.remove(self.twL1);
                LTweenLite.remove(self.twL2);
                LTweenLite.to(self.light1,2,{rotate:360,loop:true,ease:LEasing.None.easeIn}).to(self.light1,0,{rotate:0,loop:true,ease:LEasing.None.easeIn});
                LTweenLite.to(self.light1,0.3,{alpha:0,loop:true,ease:LEasing.None.easeIn}).to(self.light1,0.3,{alpha:1,loop:true,ease:LEasing.None.easeIn});
            }})
        }});

        self.initFall();
    },
    initFall:function(){
        var self = this;
        self.fallLayer = new LSprite();
        self.addChild(self.fallLayer);
        var addIndex = 0;
        self.fallLayer.addEventListener(LEvent.ENTER_FRAME,function(){
            if(addIndex -- < 0){
                addIndex = 60;
                var item = new Redbag();
                self.fallLayer.addChild(item);
            }
            for(var i=self.fallLayer.numChildren-1;i>=0;i--){
                var _child = self.fallLayer.childList[i];
                _child.updates();
            }
        })
    }
};
for(var k in p)Game.prototype[k]=p[k];
