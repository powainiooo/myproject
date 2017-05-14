//加载层
var LoadingDoufen = (function(){
    function LoadingDoufen() {
        base(this,LSprite,[]);
        var s = this;

        s.graphics.drawRect(0,"#eee93a",[0,0,750,1125],true,"#eee93a");

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
    }
    LoadingDoufen.prototype.setProgress = function(value){
        var s = this;
    };
    return LoadingDoufen;
})();

//移动
function objMove(opts){
    var option = {
        dis:150,
        type:'fade',
        direc:'in',
        t:0.6,
        delay:1,
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
                LTweenLite.to(self,option.t,{alpha:0,y:self.y+option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'up':
                LTweenLite.to(self,option.t,{alpha:0,y:self.y-option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'left':
                LTweenLite.to(self,option.t,{alpha:0,x:self.x-option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'right':
                LTweenLite.to(self,option.t,{alpha:0,x:self.x+option.dis,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
            case 'fade':
                LTweenLite.to(self,option.t,{alpha:0,delay:option.delay,ease:LEasing[option.ei][option.em]});
                break;
        }
    }
    setTimeout(function(){
        if(opts.callback) opts.callback();
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