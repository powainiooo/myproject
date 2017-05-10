//加载层
var LoadingDoufen = (function(){
    function LoadingDoufen() {
        base(this,LSprite,[]);
        var s = this;

        s.graphics.drawRect(0,"#fff100",[0,0,750,1125],true,"#fff100");

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
function objMove(direc,movedis,movet,easing,easmove){
    var self = this;
    var dis = movedis==null?150:movedis;
    var t = movet==null?0.4:movet;
    var ei = easing==null?'Cubic':easing;
    var em = easmove==null?'easeOut':easmove;
    switch (direc){
        case 'down':
            self.y = self.y - dis;
            LTweenLite.to(self,t,{alpha:1,y:self.y+dis,ease:LEasing[ei][em]});
            break;
        case 'up':
            self.y = self.y + dis;
            LTweenLite.to(self,t,{alpha:1,y:self.y-dis,ease:LEasing[ei][em]});
            break;
        case 'left':
            self.x = self.x + dis;
            LTweenLite.to(self,t,{alpha:1,x:self.x-dis,ease:LEasing[ei][em]});
            break;
        case 'right':
            self.x = self.x - dis;
            LTweenLite.to(self,t,{alpha:1,x:self.x+dis,ease:LEasing[ei][em]});
            break;
    }
}

//震动
function objShake(){
    var self = this;
    var lx = self.x,ly = self.y,disX = 10,disY = 5,t = 0.05;
    LTweenLite.to(self,t,{x:lx+disX,y:ly-disY,ease:LEasing.None.easeIn}).to(self,t*2,{x:lx-disX,y:ly+disY,ease:LEasing.None.easeIn}).to(self,t,{x:lx,y:ly,ease:LEasing.None.easeIn})
}

//缩小到正常
function scaleIn(){
    var self = this;
    var t = 0.4;
    self.scaleX = 1.4;
    self.scaleY = 1.4;
    LTweenLite.to(self,t,{scaleX:1,scaleY:1,alpha:1,ease:LEasing.Cubic.easeOut});
}