//首页开始按钮
function StartBtn(callBack){
    base(this,LSprite,[]);
    var self = this;
    self.x = 360;
    self.y = 490;

    self.name = new Zimg([imglist['icons'],730,0,273,91],-100,-150);
    self.name.scaleX = 0.8;
    self.name.scaleY = 0.8;
    self.addChild(self.name);

    self.btn = new ZRimg([imglist['icons'],0,155,190,193],-85,-86);
    self.addChild(self.btn);
    self.btn.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        Zclick.call(self.btn,callBack);
    })
}

//经验条
function Lvline(lv){
    base(this,LSprite,[]);
    var self = this;
    self.x = 25;
    self.y = 5;

    var bg = new Zimg([imglist['icons'],0,0,151,46]);
    self.addChild(bg);

    self.lineCover = new LSprite();
    self.lineCover.graphics.drawRoundRect(1,'#f00',[0,0,105,18,10]);
    self.lineCover.x = 41;
    self.lineCover.y = 15;
    self.lineCover.scaleX = 0.5;

    var line = new Zimg([imglist['icons'],154,0,105,18],41,15);
    line.mask = self.lineCover;
    self.addChild(line);

    self.txt = new LTextField();
    self.txt.text = 'Lv.'+lv;
    self.txt.x = 160;
    self.txt.y = 5;
    self.txt.size = 28;
    self.txt.weight = 'bold';
    self.txt.font = '微软雅黑';
    self.txt.color = '#ffdf26';
    self.addChild(self.txt);

    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        uploadPage();
    })
}

//钻石条
function DiamondLine(txt){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawRoundRect(2,'#3e7694',[0,0,166,36,20],true,'#173e5f');
    self.x = 255;
    self.y = 10;

    var icon = new Zimg([imglist['icons'],236,20,45,38]);
    self.addChild(icon);

    self.txt = new LTextField();
    self.txt.text = txt;
    self.txt.x = 90;
    self.txt.y = 4;
    self.txt.size = 22;
    self.txt.font = '微软雅黑';
    self.txt.color = '#fff';
    self.txt.textAlign = 'center';
    self.addChild(self.txt);

    self.btn = new LButton(new Zimg([imglist['icons'],193,20,40,40],140,0));
    self.addChild(self.btn);

    self.btn.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(energyPage,500)
    })
}

//提现条
function MoneyLine(txt){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawRoundRect(2,'#3e7694',[0,0,230,36,20],true,'#173e5f');
    self.x = 480;
    self.y = 10;

    var icon = new Zimg([imglist['icons'],288,3,44,50],0,-10);
    self.addChild(icon);

    self.txt = new LTextField();
    self.txt.text = txt+'元';
    self.txt.x = 110;
    self.txt.y = 4;
    self.txt.size = 22;
    self.txt.font = '微软雅黑';
    self.txt.color = '#fff';
    self.txt.textAlign = 'center';
    self.addChild(self.txt);

    self.btn = new LButton(new Zimg([imglist['icons'],336,0,82,44],180,-5));
    self.addChild(self.btn);
}

//个人信息
function Persondata(){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawRoundRect(0,'#000',[0,0,106,106,12],true,'#4692a6');
    self.x = 20;
    self.y = 97;

    var cover = new LSprite();
    cover.graphics.drawRoundRect(0,'#000',[4,4,98,98,12]);
    self.pic = new Zimg([imglist['person']],4,4);
    self.pic.mask = cover;
    self.addChild(self.pic);

    var name = new LTextField();
    name.text = '大脸猫爱吃鱼~';
    name.size = 24;
    name.color = '#a5efff';
    name.font = '微软雅黑';
    name.x = 110;
    name.y = 30;
    self.addChild(name);

    var icon = new Zimg([imglist['icons'],153,19,38,40],90,65);
    self.addChild(icon);

    var age = new LTextField();
    age.text = 13;
    age.size = 28;
    age.color = '#ffe123';
    age.font = '微软雅黑';
    age.x = 150;
    age.y = 70;
    self.addChild(age);
}

//首页功能点
function HomeFunc(txt,x,y){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawArc(4,'#5ea1b2',[0,0,52,0,Math.PI*2],true,'#324973');
    self.x = x;
    self.y = y;

    if(txt == '邀请好友'){
        self.icon = new LButton(new Zimg([imglist['icons'],525,4,93,90],-42,-45));
    }else if(txt == '活动'){
        self.icon = new LButton(new Zimg([imglist['icons'],426,0,90,90],-46,-45));
    }else if(txt == '帮助'){
        self.icon = new LButton(new Zimg([imglist['icons'],86,46,68,68],-34,-34));
        self.icon.scaleX = 1.2;
        self.icon.scaleY = 1.2;
    }
    self.addChild(self.icon);

    var name = new LTextField();
    name.text = txt;
    name.size = 30;
    name.color = '#fff';
    name.font = '黑体';
    name.weight = 'bold';
    name.stroke = true;
    name.lineWidth = 6;
    name.lineColor = '#001625';
    name.x = -(name.getWidth())/2;
    name.y = 40;
    self.addChild(name);
}

//首页底部功能点
function HomeBottomFunc(txt,x,y){
    base(this,LSprite,[]);
    var self = this;
    self.x = x;
    self.y = y;

    if(txt == '好友'){
        self.icon = new LButton(new Zimg([imglist['icons'],267,60,131,133]));
    }else if(txt == '排行榜'){
        self.icon = new LButton(new Zimg([imglist['icons'],269,197,131,133]));
    }else if(txt == '喂养'){
        self.icon = new LButton(new Zimg([imglist['icons'],405,94,131,133]));
    }else if(txt == '消息'){
        self.icon = new LButton(new Zimg([imglist['icons'],537,96,131,133]));
    }
    self.icon.scaleX = 0.74;
    self.icon.scaleY = 0.74;
    self.addChild(self.icon);

    var name = new LTextField();
    name.text = txt;
    name.size = 30;
    name.color = '#fff';
    name.font = '黑体';
    name.weight = 'bold';
    name.stroke = true;
    name.lineWidth = 6;
    name.lineColor = '#001625';
    name.x = 49;
    name.y = 90;
    name.textAlign = 'center';
    self.addChild(name);
}

//男猫
function Male(){
    base(this,LSprite,[]);
    var self = this;
    self.x = 350;
    self.y = 880;

    var list = LGlobal.divideCoordinate(2720, 453, 1, 8);
    var data = new LBitmapData(imglist["male"]);
    self.pic = new LAnimationTimeline(data, list);
    self.pic.speed = 5;
    self.pic.x = -170;
    self.pic.y = -226;
    self.addChild(self.pic);
}

//男猫
function Female(){
    base(this,LSprite,[]);
    var self = this;
    self.x = 350;
    self.y = 880;

    var list = LGlobal.divideCoordinate(3280, 481, 1, 8);
    var data = new LBitmapData(imglist["female"]);
    self.pic = new LAnimationTimeline(data, list);
    self.pic.speed = 5;
    self.pic.x = -205;
    self.pic.y = -240;
    self.addChild(self.pic);
}

//计时器
function Timer(times){
    base(this,LSprite,[]);
    var self = this;
    self.times = times;

    self.bg = new Zimg([imglist['icons'],311,570,320,30]);
    self.addChild(self.bg);

    self.cover = new LSprite();
    self.cover.graphics.drawRoundRect(0,'#f00',[3,3,314,23,10]);
    self.line = new Zimg([imglist['icons'],315,609,314,23],3,3);
    self.line.mask = self.cover;
    self.addChild(self.line);

    self.icon = new Zimg([imglist['icons'],785,180,66,72],340,-20);
    self.addChild(self.icon);

    self.txt = new LTextField();
    self.txt.text = times;
    self.txt.size = 24;
    self.txt.color = '#cc2400';
    self.txt.textAlign = 'center';
    self.txt.x = 373;
    self.txt.y = 6;
    self.addChild(self.txt);
}
Timer.prototype.count = function(callback){
    var self = this;
    self.tw = LTweenLite.to(self.cover,self.times,{scaleX:0,ease:LEasing.None.easeIn});
    self.t = setInterval(function(){
        if(self.times == 0){
            clearInterval(self.t);
            //callback();
        }else{
            self.times --;
            self.txt.text = self.times;
        }
    },1000)
};
Timer.prototype.stop = function(){
    var self = this;
    clearInterval(self.t);
    LTweenLite.remove(self.tw);
};

//红包掉落
function Redbag(){
    base(this,LSprite,[]);
    var self = this;
    self.y = -150;

    self.pic1 = new ZRimg([imglist['icons'],900,190,50,61],-25,-30);
    self.pic1.x = 80+parseInt(Math.random()*150);
    self.pic1.y = -40 - parseInt(Math.random()*100);
    self.addChild(self.pic1);
    LTweenLite.to(self.pic1,1,{rotate:360,loop:true,ease:LEasing.None.easeIn}).to(self.pic1,0,{rotate:0,loop:true,ease:LEasing.None.easeIn});

    self.pic2 = new ZRimg([imglist['icons'],900,190,50,61],-25,-30);
    self.pic2.x = 520+parseInt(Math.random()*150);
    self.pic2.y = -40 - parseInt(Math.random()*50);
    self.addChild(self.pic2);
    LTweenLite.to(self.pic2,1,{rotate:360,loop:true,ease:LEasing.None.easeIn}).to(self.pic2,0,{rotate:0,loop:true,ease:LEasing.None.easeIn});
}
Redbag.prototype.updates = function(){
    var self = this;
    var speed = 5;
    self.y += speed;
    if(self.y > 1400){
        self.parent.removeChild(self);
    }
};

//关闭按钮
function BtnClose(callback){
    var imgData = new Zimg([imglist['icons'],90,120,34,34]);
    base(this,LButton,[imgData]);
    var self = this;
    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(callback,500);
    })
}

//返回按钮
function BtnBack(callback){
    var imgData = new Zimg([imglist['icons'],1443,3,52,40]);
    base(this,LButton,[imgData]);
    var self = this;
    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        setTimeout(callback,500);
    })
}

//文字
function RuleTXT(txt,x,y){
    base(this,LTextField,[]);
    var self = this;
    self.text = txt;
    self.color = '#1494bb';
    self.size = 28;
    self.font = '微软雅黑';
    self.x = x;
    self.y = y;
}

//好友列表项
function MyfriendItem(){
    base(this,LSprite,[]);
    var self = this;
    self.bg = new Zimg([imglist['icons'],0,854,655,86]);
    self.addChild(self.bg);

    var cover = new LSprite();
    cover.graphics.drawArc(1,'#f00',[80,42,40,0,Math.PI*2]);
    self.pic = new Zimg([imglist['person']],40,2);
    self.pic.mask = cover;
    self.addChild(self.pic);

    var sexIcon = new Zimg([imglist['icons'],155,63,40,40],110,42);
    self.addChild(sexIcon);

    var name = new LTextField();
    name.text = 'DA橙子';
    name.size = 28;
    name.color = '#fff';
    name.x = 160;
    name.y = 12;
    self.addChild(name);

    var lvz = new LTextField();
    lvz.text = 'LV.6';
    lvz.size = 24;
    lvz.color = '#ffde27';
    lvz.x = 160;
    lvz.y = 50;
    self.addChild(lvz);

    var btn = new LButton(new Zimg([imglist['icons'],825,315,123,42]));
    btn.x = 460;
    btn.y = 20;
    self.addChild(btn);
}

//翻页
function PageInfo(currentPage,pageCount){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawRoundRect(0,'#000',[-80,0,160,50,20],true,'#57c0fc');

    var txt = new LTextField();
    txt.text = currentPage+'/'+pageCount;
    txt.size = 30;
    txt.color = '#fff';
    txt.textAlign = 'center';
    txt.y = 10;
    self.addChild(txt);

    var btnPrev = new LButton(new Zimg([imglist['icons'],825,360,60,60]));
    btnPrev.x = -175;
    btnPrev.y = -5;
    self.addChild(btnPrev);

    var btnNext = new LButton(new Zimg([imglist['icons'],890,360,60,60]));
    btnNext.x = 115;
    btnNext.y = -5;
    self.addChild(btnNext);
}

//切换tab
function Tab(){
    base(this,LSprite,[]);
    var self = this;
    self.graphics.drawRoundRect(0,'#f00',[-205,0,410,45,25],true,'#0c4e6f');

    self.slide = new Zimg([imglist['icons'],322,723,226,53],-208,-4);
    self.addChild(self.slide);

    self.left = new LTextField();
    self.left.text = '好友排名';
    self.left.size = 30;
    self.left.color = '#116992';
    self.left.font = '微软雅黑';
    self.left.textAlign = 'center';
    self.left.x = -102;
    self.left.y = 0;
    self.addChild(self.left);

    self.right = new LTextField();
    self.right.text = '世界排名';
    self.right.size = 24;
    self.right.color = '#80cdec';
    self.right.font = '微软雅黑';
    self.right.textAlign = 'center';
    self.right.x = 102;
    self.right.y = 6;
    self.addChild(self.right);

    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
        if(e.selfX < 0){
            self.left.size = 30;
            self.left.y = 0;
            self.left.color = '#116992';
            self.right.size = 24;
            self.right.y = 6;
            self.right.color = '#80cdec';
            self.slide.x = -208;
        }else{
            self.left.size = 24;
            self.left.y = 6;
            self.left.color = '#80cdec';
            self.right.size = 30;
            self.right.y = 0;
            self.right.color = '#116992';
            self.slide.x = -20;
        }
    })
}

//排行榜列表项
function RankItem(rank){
    base(this,LSprite,[]);
    var self = this;
    self.bg = new Zimg([imglist['icons'],0,854,655,86]);
    self.addChild(self.bg);

    var rankIcon;
    if(rank == 1){
        rankIcon = new Zimg([imglist['icons'],552,726,51,45],15,15);
    }else if(rank == 2){
        rankIcon = new Zimg([imglist['icons'],608,727,48,44],15,15);
    }else if(rank == 3){
        rankIcon = new Zimg([imglist['icons'],661,726,51,48],15,15);
    }else{
        rankIcon = new LTextField();
        rankIcon.text = rank;
        rankIcon.color = '#f7ff12';
        rankIcon.size = 40;
        rankIcon.textAlign = 'center';
        rankIcon.x = 35;
        rankIcon.y = 20;
    }
    self.addChild(rankIcon);

    var cover = new LSprite();
    cover.graphics.drawArc(1,'#f00',[120,42,40,0,Math.PI*2]);
    self.pic = new Zimg([imglist['person']],80,2);
    self.pic.mask = cover;
    self.addChild(self.pic);

    var sexIcon = new Zimg([imglist['icons'],155,63,40,40],150,42);
    self.addChild(sexIcon);

    var name = new LTextField();
    name.text = 'DA橙子';
    name.size = 28;
    name.color = '#fff';
    name.x = 180;
    name.y = 12;
    self.addChild(name);

    var lvz = new LTextField();
    lvz.htmlText = '<font size="24" color="#fff">喂养</font><font size="24" color="#ff5aa0"> 1000 </font><font size="24" color="#fff">次</font>';
    lvz.size = 40;
    lvz.color = '#fff';
    lvz.x = 354;
    lvz.y = 30;
    self.addChild(lvz);

    var btn = new LButton(new Zimg([imglist['icons'],607,637,71,87]));
    btn.x = 530;
    btn.y = 0;
    self.addChild(btn);
}

//个人信息-过关红包
function MoneBagItem(){
    base(this,LListChildView,[]);
    var self = this;

    var bg = new Zimg([imglist['icons'],0,854,655,85],12);
    self.addChild(bg);

    var icon = new Zimg([imglist['icons'],657,862,58,70],60,6);
    self.addChild(icon);

    var name = new LTextField();
    name.text = '张三的红包';
    name.size = 26;
    name.color = '#fff';
    name.x = 140;
    name.y = 15;
    self.addChild(name);

    var money = name.clone();
    money.text = '10元';
    money.size = 24;
    money.textAlign = 'center';
    money.color = '#ff5aa0';
    money.x = 210;
    money.y = 50;
    self.addChild(money);

    var btn = new LButton(new Zimg([imglist['icons'],825,425,123,42]));//825,471,124,43
    btn.x = 480;
    btn.y = 18;
    self.addChild(btn);
}
MoneBagItem.prototype.onClick = function(event){
    var self = this;

};

//头像
function Portrait(){
    base(this,LSprite,[]);
    var self = this;
    var cover = new LSprite();
    cover.graphics.drawArc(1,'#f00',[0,0,50,0,Math.PI*2]);
    self.pic = new Zimg([imglist['person']]);
    self.pic.x = -self.pic.getWidth()/2;
    self.pic.y = -self.pic.getHeight()/2;
    self.pic.mask = cover;
    self.addChild(self.pic);
}










