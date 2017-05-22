//加载层
var LoadingDoufen = (function(){
    function LoadingDoufen() {
        base(this,LSprite,[]);
        var s = this;

        s.graphics.drawRect(0,"#ffff00",[0,0,750,1125],true,"#ffff00");

        s.line1 = new LSprite();
        s.line1.pic = new LBitmap(new LBitmapData(loadinglist['L_line']));
        s.line1.pic.x = -10;
        s.line1.pic.y = -55;
        s.line1.addChild(s.line1.pic);
        s.line1.x = 200;
        s.line1.y = 520;
        s.line1.rotate = -45;
        s.addChild(s.line1);
        LTweenLite.to(s.line1,0.3,{rotate:-30,loop:true,ease:LEasing.None.easeIn}).to(s.line1,0.3,{rotate:-45,loop:true,ease:LEasing.None.easeIn});

        s.line2 = new LSprite();
        s.line2.pic = new LBitmap(new LBitmapData(loadinglist['L_line']));
        s.line2.pic.x = -10;
        s.line2.pic.y = -55;
        s.line2.addChild(s.line2.pic);
        s.line2.x = 230;
        s.line2.y = 520;
        s.line2.rotate = 45;
        s.addChild(s.line2);
        LTweenLite.to(s.line2,0.3,{rotate:30,loop:true,ease:LEasing.None.easeIn}).to(s.line2,0.3,{rotate:45,loop:true,ease:LEasing.None.easeIn});


        s.pic = new LBitmap(new LBitmapData(loadinglist['L_loading']));
        s.pic.x = 94;
        s.pic.y = 500;
        s.addChild(s.pic);

        s.circle = new LSprite();
        s.circle.pic = new LSprite();
        s.circle.pic.graphics.drawArc(0,'#fff',[0,0,55,0,2*Math.PI],true,"#fff100");
        s.circle.addChild(s.circle.pic);
        s.circle.x = 212;
        s.circle.y = 562;
        s.circle.scaleX = 0.55;
        s.circle.scaleY = 0.55;
        s.addChild(s.circle);
        LTweenLite.to(s.circle,0.5,{scaleX:1,scaleY:1,loop:true,ease:LEasing.None.easeInOut}).to(s.circle,0.5,{scaleX:0.55,scaleY:0.55,loop:true,ease:LEasing.None.easeInOut});

        s.circle2 = new LSprite();
        s.circle2.pic = new LSprite();
        s.circle2.pic.graphics.drawArc(0,'#fff',[0,0,37,0,2*Math.PI],true,"#231815");
        s.circle2.addChild(s.circle2.pic);
        s.circle2.x = 212;
        s.circle2.y = 562;
        s.circle2.scaleX = 0.2;
        s.circle2.scaleY = 0.2;
        s.addChild(s.circle2);
        LTweenLite.to(s.circle2,0.6,{scaleX:1,scaleY:1,loop:true,ease:LEasing.None.easeInOut}).to(s.circle2,0.4,{scaleX:0.65,scaleY:0.65,loop:true,ease:LEasing.None.easeInOut}).to(s.circle2,0.4,{scaleX:1,scaleY:1,loop:true,ease:LEasing.None.easeInOut}).to(s.circle2,0.6,{scaleX:0.2,scaleY:0.2,loop:true,ease:LEasing.None.easeInOut});

        s.txt = new LTextField();
        s.txt.text = '0%';
        s.txt.color = '#000';
        s.txt.x = (LGlobal.width - s.txt.getWidth())/2;
        s.txt.y = 660;
        s.txt.size = 28;
        s.addChild(s.txt);
    }
    LoadingDoufen.prototype.setProgress = function(value){
        var s = this;
        s.txt.text = parseInt(value)+'%';
        s.txt.x = (LGlobal.width - s.txt.getWidth())/2;
    };
    return LoadingDoufen;
})();

//移动
function objMove(opts){
    var option = {
        dis:150,
        type:'fade',
        direc:'in',
        t:0.5,
        delay:0,
        ei:'Cubic',
        em:'easeOut'
    };
    var self = this;
    for(var p in opts){
        if(option[p]!='undefined'){
            option[p] = opts[p];
        }
    }
    if(option.direc == 'in'){
        switch (option.type){
            case 'down':
                self.y = self.y - option.dis;
                LTweenLite.to(self,option.t,{alpha:1,y:self.y+option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'up':
                self.y = self.y + option.dis;
                LTweenLite.to(self,option.t,{alpha:1,y:self.y-option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'left':
                self.x = self.x + option.dis;
                LTweenLite.to(self,option.t,{alpha:1,x:self.x-option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'right':
                self.x = self.x - option.dis;
                LTweenLite.to(self,option.t,{alpha:1,x:self.x+option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'fade':
                LTweenLite.to(self,option.t,{alpha:1,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'scaleL2S':
                var sx = self.scaleX;
                var sy = self.scaleY;
                self.scaleX = sx+0.4;
                self.scaleY = sy+0.4;
                LTweenLite.to(self,option.t,{scaleX:sx,scaleY:sy,alpha:1,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'scaleS2L':
                var sx = self.scaleX;
                var sy = self.scaleY;
                self.scaleX = sx-0.4;
                self.scaleY = sy-0.4;
                LTweenLite.to(self,option.t,{scaleX:sx,scaleY:sy,alpha:1,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
        }
    }else if(option.direc == 'out'){
        switch (option.type){
            case 'down':
                LTweenLite.to(self,option.t,{alpha:0,y:self.y+option.dis,delay:option.delay,ease:LEasing[option.ei][option.em],onComplete:function(){
                    self.y -=  option.dis;
                }});
                break;
            case 'up':
                LTweenLite.to(self,option.t,{alpha:0,y:self.y-option.dis,delay:option.delay,ease:LEasing[option.ei][option.em],onComplete:function(){
                    self.y +=  option.dis;
                }});
                break;
            case 'left':
                LTweenLite.to(self,option.t,{alpha:0,x:self.x-option.dis,delay:option.delay,ease:LEasing[option.ei][option.em],onComplete:function(){
                    self.x +=  option.dis;
                }});
                break;
            case 'right':
                LTweenLite.to(self,option.t,{alpha:0,x:self.x+option.dis,delay:option.delay,ease:LEasing[option.ei][option.em],onComplete:function(){
                    self.x -=  option.dis;
                }});
                break;
            case 'fade':
                LTweenLite.to(self,option.t,{alpha:0,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
        }
    }
    setTimeout(function(){
        if(opts.callback!=undefined) opts.callback();
    },(option.t+option.delay)*1000)
}
//普通图片
function Zimg(imgData,x,y){
    base(this,LBitmap,[]);
    var self = this;
    self.x = x==null?0:x;
    self.y = y==null?0:y;
    if(imgData.length == 1){
        self.bitmapData = new LBitmapData(imgData[0]);
    }else{
        self.bitmapData = new LBitmapData(imgData[0],imgData[1],imgData[2],imgData[3],imgData[4]);
    }
}
//旋转图片
function ZRimg(imgData,rx,ry){
    base(this,LSprite,[]);
    var self = this;
    if(arguments.length == 1){
        self.img = new LBitmap(new LBitmapData(imgData[0]));
    }else{
        self.img = new LBitmap(new LBitmapData(imgData[0],imgData[1],imgData[2],imgData[3],imgData[4]));
    }
    self.img.x = rx;
    self.img.y = ry;
    self.addChild(self.img);
}

//闪烁
function ZBlink(time){
    var self = this;
    var t = time==null?1:time;
    LTweenLite.to(self,t,{alpha:1,loop:true,ease:LEasing.None.easeIn}).to(self,t,{alpha:0,loop:true,ease:LEasing.None.easeIn});
}

//点击提示
function ClickHint(x,y,color){
    base(this,LSprite,[]);
    var self = this;
    self.x = x;
    self.y = y;
    self.graphics.drawArc(0,'#000',[0,0,8,0,Math.PI*2],true,color);
    self.graphics.drawArc(4,color,[0,0,16,0,Math.PI*2]);
    self.graphics.drawRect(0,color,[-30,-30,60,60]);
}

//第5屏框
function P5content(pos,pos2,rect,index){
    base(this,LSprite,[]);
    var self = this;

    self.lineL = new LSprite();
    self.lineL.graphics.drawRect(0,'#221814',[0,0,3,-rect[3]],true,'#221814');
    self.lineL.x = rect[0];
    self.lineL.y = rect[1]+rect[3];
    self.lineL.scaleY = 0;
    self.addChild(self.lineL);

    self.lineB = new LSprite();
    self.lineB.graphics.drawRect(0,'#221814',[0,0,rect[2],3],true,'#221814');
    self.lineB.x = rect[0];
    self.lineB.y = rect[1]+rect[3];
    self.lineB.scaleX = 0;
    self.addChild(self.lineB);

    self.lineR = new LSprite();
    self.lineR.graphics.drawRect(0,'#221814',[0,0,3,rect[3]],true,'#221814');
    self.lineR.x = rect[0]+rect[2];
    self.lineR.y = rect[1];
    self.lineR.scaleY = 0;
    self.addChild(self.lineR);

    self.lineT = new LSprite();
    self.lineT.graphics.drawRect(0,'#221814',[0,0,-rect[2],3],true,'#221814');
    self.lineT.x = rect[0]+rect[2];
    self.lineT.y = rect[1];
    self.lineT.scaleX = 0;
    self.addChild(self.lineT);

    self.picArr = [];
    for(var i=0;i<4;i++){
        self.picArr[i] = new Zimg([imglist['p6_'+index+(4-i)]],pos[0],pos[1]);
        self.picArr[i].alpha = 0;
        self.addChild(self.picArr[i]);
    }

    if(index == 1){
        self.info = new Zimg([imglist['icons'],750,313,297,141],pos2[0],pos2[1]);
    }else if(index == 2){
        self.info = new Zimg([imglist['icons'],1057,316,240,128],pos2[0],pos2[1]);
    }else if(index == 3){
        self.info = new Zimg([imglist['icons'],758,457,280,124],pos2[0],pos2[1]);
    }
    self.info.alpha = 0;
    self.addChild(self.info);
    self.index = index;
}
P5content.prototype.move = function(){
    var self = this;
    if(self.index == 2){
        objMove.call(self.picArr[0],{type:'down',dis:200});
        objMove.call(self.picArr[1],{type:'down',delay:0.2,dis:200});
        objMove.call(self.picArr[2],{type:'down',delay:0.4,dis:200});
        objMove.call(self.picArr[3],{type:'down',delay:0.6,dis:200});
    }else{
        objMove.call(self.picArr[0],{type:'left',dis:200});
        objMove.call(self.picArr[1],{type:'left',delay:0.2,dis:200});
        objMove.call(self.picArr[2],{type:'left',delay:0.4,dis:200});
        objMove.call(self.picArr[3],{type:'left',delay:0.6,dis:200});
    }
    LTweenLite.to(self.lineB,0.5,{scaleX:1,delay:1,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.lineL,0.5,{scaleY:1,delay:1,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.lineT,0.5,{scaleX:1,delay:1,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.lineR,0.5,{scaleY:1,delay:1,ease:LEasing.Cubic.easeOut});
    if(self.index == 1){
        objMove.call(self.info,{type:'up',ei:'Back',dis:30,delay:1.3});
    }else if(self.index == 2){
        objMove.call(self.info,{type:'left',ei:'Back',dis:30,delay:1.3});
    }else{
        objMove.call(self.info,{type:'left',ei:'Back',dis:50,delay:1.3});
    }

};


//切换点击LOGO
function ClickLogo(index,x,y,callback){
    base(this,LSprite,[]);
    var self = this;
    self.x = x;
    self.y = y;
    switch (index){
        case 2:
            self.pic1 = new Zimg([imglist['icons'],769,1330,73,73]);
            self.btn = new LButton(new Zimg([imglist['icons'],847,1317,73,87],80,-14));
            break;
        case 3:
            self.pic1 = new Zimg([imglist['icons'],256,828,73,74]);
            self.btn = new LButton(new Zimg([imglist['icons'],428,0,72,87],80,-14));
            break;
        case 4:
            self.pic1 = new Zimg([imglist['icons'],350,14,73,73]);
            self.btn = new LButton(new Zimg([imglist['icons'],582,270,73,87],80,-14));
            break;
        case 5:
            self.pic1 = new Zimg([imglist['icons'],256,752,73,73]);
            self.btn = new LButton(new Zimg([imglist['icons'],428,0,72,87],80,-14));
            break;
        case 6:
            self.pic1 = new Zimg([imglist['icons'],28,1397,73,73]);
            self.btn = new LButton(new Zimg([imglist['icons'],582,270,73,87],80,-14));
            break;
        case 7:
            self.pic1 = new Zimg([imglist['icons'],1307,1414,74,75]);
            self.btn = new LButton(new Zimg([imglist['icons'],582,270,73,87],80,-14));
            break;
        case 8:
            self.pic1 = new Zimg([imglist['icons'],381,1270,73,74]);
            self.btn = new LButton(new Zimg([imglist['icons'],582,270,73,87],80,-14));
            break;
    }
    self.addChild(self.pic1);
    self.addChild(self.btn);
    self.canClick = false;
    self.btn.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(self.canClick){
            callback();
        }
    });
}
ClickLogo.prototype.move = function(){
    var self = this;
    self.canClick = true;
    ZBlink.call(self.btn,0.6);
};


//爪子
function Claw(){
    base(this,LSprite,[]);
    var self = this;
    self.x = 375;

    self.RL = new LSprite();
    self.RL.y = -800;
    self.addChild(self.RL);

    self.chicken = new ZRimg([imglist['icons'],750,1141,190,169],-85,-84);
    self.chicken.x = 0;
    self.chicken.y = 980;
    self.chicken.alpha = 0;
    self.RL.addChild(self.chicken);

    self.left = new ZRimg([imglist['icons'],1003,710,65,126],-60,-8);
    self.left.x = -30;
    self.left.y = 900;
    self.RL.addChild(self.left);

    self.right = new ZRimg([imglist['icons'],1070,710,65,126],-8,-8);
    self.right.x = 30;
    self.right.y = 900;
    self.RL.addChild(self.right);

    self.L = new LSprite();
    self.L.graphics.drawRect(0,'#fff',[-5,0,10,900],true,'#fff');
    self.L.graphics.drawArc(0,'#fff',[0,900,60,0,Math.PI*2],true,'#fff');
    self.L.graphics.drawArc(0,'#fff',[0,900,15,0,Math.PI*2],true,'#000');
    self.RL.addChild(self.L);
}
Claw.prototype.move = function(){
    var self = this;
    self.tmove = LTweenLite.to(self,1,{rotate:15,loop:true,ease:LEasing.None.easeIn}).to(self,2,{rotate:-15,loop:true,ease:LEasing.None.easeIn}).to(self,1,{rotate:0,loop:true,ease:LEasing.None.easeIn})
};
Claw.prototype.catch = function(func){
    var self = this;
    LTweenLite.remove(self.tmove);
    self.rotate = 0;
    self.left.rotate = 10;
    self.right.rotate = -10;
    LTweenLite.to(self,1.5,{y:700,ease:LEasing.Cubic.easeOut,onComplete:function(){
        self.left.rotate = 0;
        self.right.rotate = 0;
        self.chicken.alpha = 1;
        func();
    }}).to(self,2,{y:0,ease:LEasing.Cubic.easeOut,onComplete:function(){
        stage.removeChild(page8Layer);
        page8Layer = null;
        page82Init();
    }});
};

//显示标题
function Txtframe(txt,x,y){
    base(this,LSprite,[]);
    var self = this;
    self.x = x;
    self.y = y;

    self.cover = new LSprite();
    self.cover.graphics.drawRect(0,'#fff',[-307,0,614,64]);
    self.cover.scaleX = 0;
    self.pic = new Zimg([imglist['icons'],671,1421,614,64],-307,0);
    self.pic.mask = self.cover;
    self.addChild(self.pic);

    self.left = new LSprite();
    self.left.graphics.beginPath();
    self.left.graphics.lineCap("round");
    self.left.graphics.lineStyle(4,"#fff");
    self.left.graphics.moveTo(0,-32);
    self.left.graphics.lineTo(0,32);
    self.left.graphics.stroke();
    self.left.y = 32;
    self.left.scaleY = 0;
    self.addChild(self.left);

    self.right = self.left.clone();
    self.addChild(self.right);

    self.circle = new LSprite();
    self.circle.graphics.drawArc(0,'#fff',[0,0,6,0,Math.PI*2],true,'#fff');
    self.circle.y = 32;
    self.circle.scaleX = 0;
    self.circle.scaleY = 0;
    self.addChild(self.circle);

    self.txt = txt;
    self.content = new LTextField();
    self.content.text = '';
    self.content.size = 38;
    self.content.color = '#fff';
    self.content.x = -self.content.getWidth()/2;
    if(LGlobal.android){
        self.content.y = (64-self.content.getHeight())/2;
    }else{
        self.content.y = 4;
    }
    self.content.font = '微软雅黑';
    self.content.weight = "bolder";
    self.addChild(self.content);
}
Txtframe.prototype.move = function(){
    var self = this;
    LTweenLite.to(self.circle,0.1,{scaleX:1,scaleY:1,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.circle,0.2,{scaleX:0,scaleY:0,delay:0.1,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.left,0.2,{scaleY:1,delay:0.1,ease:LEasing.Cubic.easeOut}).to(self.left,0.4,{x:-310,ease:LEasing.Cubic.easeOut}).to(self.left,0.2,{scaleY:0,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.right,0.2,{scaleY:1,delay:0.1,ease:LEasing.Cubic.easeOut}).to(self.right,0.4,{x:310,ease:LEasing.Cubic.easeOut}).to(self.right,0.2,{scaleY:0,ease:LEasing.Cubic.easeOut});
    LTweenLite.to(self.cover,0.4,{scaleX:1,delay:0.3,ease:LEasing.Cubic.easeOut});

    setTimeout(function(){
        self.content.text = self.txt;
        self.content.x = -self.content.getWidth()/2;
        self.content.speed = 5;
        self.content.wind();
    },1200)
};

function Coin(){
    base(this,LBitmap,[]);
    var self = this;
    self.x = 10 + parseInt(Math.random()*300);
    self.y = -30;
    var type = parseInt(Math.random()*3);
    if(type == 0){
        self.bitmapData = new LBitmapData(imglist['icons'],335,1088,23,24);
    }else if(type == 1){
        self.bitmapData = new LBitmapData(imglist['icons'],364,1090,23,20);
    }else if(type == 2){
        self.bitmapData = new LBitmapData(imglist['icons'],394,1090,24,20);
    }
    fallLayer.addChild(self);
}
Coin.prototype.updates = function(){
    var self = this;
    self.y += 5;
    if(self.y >1125){
        fallLayer.removeChild(self);
    }
};

//向上
function slideUp(func){
    var self = this;
    var sy=0;
    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
        sy=e.selfY;
    });
    self.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){
        event.preventDefault();
    });
    self.addEventListener(LMouseEvent.MOUSE_UP,function(e){
        var ey = e.selfY;
        if(ey>sy+100){
            objMove.call(self,{
                direc:'out',
                callback:function(){
                    stage.removeChild(self);
                    self = null;
                    func();
                }
            });
        }
    });
}