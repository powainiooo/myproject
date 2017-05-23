//加载层
var LoadingDoufen = (function(){
    function LoadingDoufen() {
        base(this,LSprite,[]);
        var s = this;

        s.graphics.drawRect(0,"#fff100",[0,0,750,1333],true,"#000");

        s.line = new LBitmap(new LBitmapData(loadinglist["L_line"]));
        s.line.x = -220;
        s.line.y = 400;
        s.addChild(s.line);

        s.cover = new LBitmap(new LBitmapData(loadinglist["L_loading"]));
        s.cover.x = 175;
        s.cover.y = 400;
        s.addChild(s.cover);

        var cover = new LSprite();
        cover.graphics.drawRect(1,'#000',[0,0,400,36],true,'#000');
        cover.x = 175;
        cover.y = 400;
        s.line.mask = cover;

        s.txt = new LTextField();
        s.txt.text = '0%';
        s.txt.color = '#fff';
        s.txt.x = (LGlobal.width - s.txt.getWidth())/2;
        s.txt.y = 460;
        s.txt.size = 28;
        s.addChild(s.txt);
    }
    LoadingDoufen.prototype.setProgress = function(value){
        var s = this;
        s.line.x = -220 + (value/100)*400;
        s.txt.text = parseInt(value)+'%';
        s.txt.x = (LGlobal.width - s.txt.getWidth())/2;
    };
    return LoadingDoufen;
})();

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

//点击效果
function Zclick(callback){
    var t = 0.7;
    var self = this;
    LTweenLite.to(self,t*0.3,{scaleX:1.25,scaleY:0.75,ease:LEasing.None.easeIn}).to(self,t*0.1,{scaleX:0.75,scaleY:1.25,ease:LEasing.None.easeIn}).to(self,t*0.1,{scaleX:1.15,scaleY:0.85,ease:LEasing.None.easeIn}).to(self,t*0.15,{scaleX:0.95,scaleY:1.05,ease:LEasing.None.easeIn}).to(self,t*0.1,{scaleX:1.05,scaleY:0.95,ease:LEasing.None.easeIn}).to(self,t*0.25,{scaleX:1,scaleY:1,ease:LEasing.None.easeIn,onComplete:function(){
        if(callback != null && typeof callback == 'function') callback();
    }})
}