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
    {name:"hint1",path:imgsrc+"./images/hint1.jpg"},
    {name:"acpic1",path:imgsrc+"./images/acpic1.png"},
    {name:"infoframe",path:imgsrc+"./images/infoframe.png"},
    {name:"crashframe",path:imgsrc+"./images/crashfame.jpg"},
    {name:"select-female",path:imgsrc+"./images/select-female.png"},
    {name:"select-male",path:imgsrc+"./images/select-male.png"},
    {name:"person",path:imgsrc+"./images/person.jpg"},
    {name:"icons",path:imgsrc+"./images/icons.png"},
    {name:"light",path:imgsrc+"./images/light.png"},
    {name:"light2",path:imgsrc+"./images/light2.png"},
    {name:"rank",path:imgsrc+"./images/rank.png"},
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
            homePage('male');
            crashPage();
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
    btnInvite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(invitePage,500)
    });

    var btnActiv = new HomeFunc('活动',535,150);
    homeLayer.addChild(btnActiv);
    btnActiv.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(eventsPage,500)
    });

    var btnHelp = new HomeFunc('帮助',675,150);
    homeLayer.addChild(btnHelp);

    var btnGZH = new LButton(new Zimg([imglist['icons'],3,49,80,102]));
    btnGZH.x = 25;
    btnGZH.y = 225;
    homeLayer.addChild(btnGZH);
    btnGZH.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(function(){
            document.getElementById('gongzhonghao').style.display = 'block';
            var gzh = document.getElementById('btnGZH');
            gzh.removeEventListener('click',function(){
                document.getElementById('gongzhonghao').style.display = 'none';
            });
            gzh.addEventListener('click',function(){
                document.getElementById('gongzhonghao').style.display = 'none';
            })
        },500)
    });

    var btnFeedList = new LButton(new Zimg([imglist['icons'],196,64,64,220]));
    btnFeedList.y = 955;
    homeLayer.addChild(btnFeedList);

    var btnFriend = new HomeBottomFunc('好友',90,1200);
    homeLayer.addChild(btnFriend);
    btnFriend.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(myfriendsPage,500)
    });

    var btnRank = new HomeBottomFunc('排行榜',245,1200);
    homeLayer.addChild(btnRank);
    btnRank.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(ranksPage,500)
    });

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
                        setTimeout(function(){
                            infoWindow.close();
                        },3000)
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
                showMSG('无法定位！<br>请保证网络通畅和允许获取个人位置。');
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

//升级方式
function uploadPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,275,710,620,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[45,365,660,500,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,275);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '升级方式';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 280;
    upLayer.addChild(title);

    var txtRule = [],ruleData = staticGameData.uploadRule;
    for(var i= 0;i<ruleData.length;i++){
        txtRule[i] = new RuleTXT(ruleData[i],70,400+i*45);
        upLayer.addChild(txtRule[i]);
    }

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 290;
    upLayer.addChild(btnClose);

    var btnInvite = new ZRimg([imglist['icons'],1010,0,270,97],-135,-48);
    btnInvite.x = 375;
    btnInvite.y = 770;
    upLayer.addChild(btnInvite);
    btnInvite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btnInvite,function(){
            stage.removeChild(upLayer);
            upLayer = null;
            invitePage();
        })
    })
}

//体力值获取方式
function energyPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,275,710,620,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[45,365,660,500,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,275);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '体力值获取方式';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 280;
    upLayer.addChild(title);

    var txtRule = [],ruleData = staticGameData.energyRule;
    for(var i= 0;i<ruleData.length;i++){
        txtRule[i] = new RuleTXT(ruleData[i],70,400+i*45);
        upLayer.addChild(txtRule[i]);
    }
    txtRule[5].color = '#fe8300';
    txtRule[5].size = 24;

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 290;
    upLayer.addChild(btnClose);

    var btnInvite = new ZRimg([imglist['icons'],1010,0,270,97],-135,-48);
    btnInvite.x = 375;
    btnInvite.y = 770;
    upLayer.addChild(btnInvite);
    btnInvite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btnInvite,function(){
            stage.removeChild(upLayer);
            upLayer = null;
            invitePage();
        })
    })
}

//体力值不足
function energyLessPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,275,710,620,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[45,365,660,500,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,275);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '很遗憾';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 280;
    upLayer.addChild(title);

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 290;
    upLayer.addChild(btnClose);

    var hint = new Zimg([imglist['hint1']],213,380);
    upLayer.addChild(hint);

    var btnInvite = new ZRimg([imglist['icons'],1010,0,270,97],-135,-48);
    btnInvite.x = 375;
    btnInvite.y = 770;
    upLayer.addChild(btnInvite);
    btnInvite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btnInvite,function(){
            stage.removeChild(upLayer);
            upLayer = null;
        })
    })
}

//邀请好友
function invitePage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,275,710,620,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[45,365,660,500,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,275);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '邀请好友';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 280;
    upLayer.addChild(title);

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 290;
    upLayer.addChild(btnClose);

    var txtRule = [],ruleData = staticGameData.inviteRule;
    for(var i= 0;i<ruleData.length;i++){
        txtRule[i] = new RuleTXT(ruleData[i],70,380+i*45);
        upLayer.addChild(txtRule[i]);
    }
    txtRule[3].y = 530;

    var btnInvite = new ZRimg([imglist['icons'],320,635,287,85],-143,-42);
    btnInvite.x = 375;
    btnInvite.y = 770;
    upLayer.addChild(btnInvite);
    btnInvite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btnInvite,function(){
            stage.removeChild(upLayer);
            upLayer = null;
        })
    })
}

//活动列表
function eventsPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,160,710,940,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[35,250,680,820,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,160);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '活动列表';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 165;
    upLayer.addChild(title);

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 175;
    upLayer.addChild(btnClose);

    var pic1 = new Zimg([imglist['acpic1']],45,260);
    upLayer.addChild(pic1);

    var pic2 = new Zimg([imglist['acpic1']],45,660);
    upLayer.addChild(pic2);
}

//我的好友
function myfriendsPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,160,710,940,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[35,250,680,820,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,160);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '我的好友';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 165;
    upLayer.addChild(title);

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 175;
    upLayer.addChild(btnClose);

    var item1 = new MyfriendItem();
    item1.x = 45;
    item1.y = 270;
    upLayer.addChild(item1);

    var pageInfo = new PageInfo(1,5);
    pageInfo.x = 375;
    pageInfo.y = 1000;
    upLayer.addChild(pageInfo);
}

//排行榜
function ranksPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,160,710,940,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[35,250,680,820,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,940,710,117],20,160);
    upLayer.addChild(tbg);

    var title = new Zimg([imglist['rank']]);
    upLayer.addChild(title);

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 175;
    upLayer.addChild(btnClose);

    var tabChange = new Tab();
    tabChange.x = 375;
    tabChange.y = 220;
    upLayer.addChild(tabChange);

    var item1 = new RankItem(1);
    item1.x = 45;
    item1.y = 300;
    upLayer.addChild(item1);

    var item1 = new RankItem(2);
    item1.x = 45;
    item1.y = 400;
    upLayer.addChild(item1);

    var item1 = new RankItem(3);
    item1.x = 45;
    item1.y = 500;
    upLayer.addChild(item1);

    var item1 = new RankItem(4);
    item1.x = 45;
    item1.y = 600;
    upLayer.addChild(item1);

    var pageInfo = new PageInfo(1,5);
    pageInfo.x = 375;
    pageInfo.y = 1000;
    upLayer.addChild(pageInfo);
}

//个人信息
function personData(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,160,710,990,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(2,'#15a7d3',[35,710,680,400,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,160);
    upLayer.addChild(tbg);

    var title = new LTextField();
    title.text = '个人信息';
    title.size = 36;
    title.color = '#fff';
    title.font = '微软雅黑';
    title.textAlign = 'center';
    title.x = 375;
    title.y = 165;
    upLayer.addChild(title);

    var btnClose = new BtnClose(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 670;
    btnClose.y = 175;
    upLayer.addChild(btnClose);

    var infoframe = new Zimg([imglist['infoframe']],32,230);
    upLayer.addChild(infoframe);

    //头像
    var cover = new LSprite();
    cover.graphics.drawArc(0,'#f00',[375,290,50,0,Math.PI*2]);
    var head = new Zimg([imglist['person']],325,240);
    head.mask = cover;
    upLayer.addChild(head);

    //性别
    var sex = new Zimg([imglist['icons'],153,19,38,40],410,300);
    upLayer.addChild(sex);

    //姓名
    var name = new LTextField();
    name.text = '大脸猫爱吃鱼';
    name.size = 30;
    name.color = '#116992';
    name.textAlign = 'center';
    name.x = 375;
    name.y = 360;
    upLayer.addChild(name);

    //昨日总收益
    var value1 = name.clone();
    value1.text = 13.5;
    value1.size = 24;
    value1.x = 195;
    value1.y = 455;
    upLayer.addChild(value1);

    //零钱
    var value2 = value1.clone();
    value2.text = 130;
    value2.x = 545;
    upLayer.addChild(value2);

    //总金额
    var value3 = value1.clone();
    value3.text = 130;
    value3.x = 125;
    value3.y = 585;
    upLayer.addChild(value3);

    //消费金额
    var value4 = value3.clone();
    value4.text = 130;
    value4.x = 355;
    upLayer.addChild(value4);

    //可提现
    var value5 = value3.clone();
    value5.text = 130;
    value5.x = 585;
    upLayer.addChild(value5);

    //过关红包
    var txt1 = name.clone();
    txt1.text = '过关红包';
    txt1.color = '#ff5aa0';
    txt1.y = 670;
    upLayer.addChild(txt1);

    //箭头
    var arrow = new Zimg([imglist['icons'],130,120,45,23],352,1120);
    upLayer.addChild(arrow);

    //红包列表
    var listView = new LListView();
    listView.resize(680,360);
    upLayer.addChild(listView);
    listView.x = 35;
    listView.y = 730;
    listView.maxPerLine = 1;
    listView.cellWidth = 680;
    listView.cellHeight = 95;
    listView.graphics.drawRect(0, "#f00", [0, 0, listView.clipping.width,listView.clipping.height]);
    var scrollBarVertical = new LListScrollBar(new LPanel("#9370DB", 0, 0), new LPanel("#9400D3", 0, 0), LListView.ScrollBarCondition.OnlyIfNeeded);
    listView.setVerticalScrollBar(scrollBarVertical);


    var item1 = new MoneBagItem();
    listView.insertChildView(item1);
    var item1 = new MoneBagItem();
    listView.insertChildView(item1);
    var item1 = new MoneBagItem();
    listView.insertChildView(item1);
    var item1 = new MoneBagItem();
    listView.insertChildView(item1);
}

//提现
function crashPage(){
    var upLayer = new LSprite();
    stage.addChild(upLayer);
    upLayer.graphics.drawRect(0,'#000',[0,0,750,1333],true,'rgba(0,0,0,0.7)');
    upLayer.graphics.drawRoundRect(0,'#000',[20,160,710,940,36],true,'#65d7f1');
    upLayer.graphics.drawRoundRect(0,'#000',[35,250,680,820,20],true,'#e6f6ff');

    var tbg = new Zimg([imglist['icons'],0,790,710,61],20,160);
    upLayer.addChild(tbg);

    var btnClose = new BtnBack(function(){
        stage.removeChild(upLayer);
        upLayer = null;
    });
    btnClose.x = 70;
    btnClose.y = 170;
    upLayer.addChild(btnClose);

    var crashframe = new Zimg([imglist['crashframe']],90,250);
    upLayer.addChild(crashframe);

    var money = new LTextField();
    money.text = 120;
    money.size = 44;
    money.color = '#02303e';
    money.x = 330;
    money.y = 470;
    upLayer.addChild(money);

    var inputLayer = new LSprite();
    inputLayer.graphics.drawRect(1,"#000000",[0, 0, 380, 60]);
    var money2 = money.clone();
    money2.text = '';
    money2.x = 150;
    money2.y = 685;
    money2.setType(LTextFieldType.INPUT,inputLayer);
    upLayer.addChild(money2);

    var btn = new ZRimg([imglist['icons'],720,720,278,90],-139,-45);
    btn.x = 375;
    btn.y = 870;
    upLayer.addChild(btn);
    btn.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(btn,function(){
            stage.removeChild(upLayer);
            upLayer = null;
        })
    })
}

//消费明细
function spenddetailsPage(){

}