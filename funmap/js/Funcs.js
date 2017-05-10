//加载层
var LoadingDoufen = (function(){
    function LoadingDoufen() {
        base(this,LSprite,[]);
        var s = this;

        s.graphics.drawRect(0,"#fff100",[0,0,750,1217],true,"#000");

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

//打字
function typeC(id,callback){
    var arr;
    if(id=='txt1'){
        arr = ['英','雄','，','终','于','找','到','你','了','！','<br>','别','问','我','是','谁','，','带','上','你','的','速','度','与','激','情','，'];
    }else{
        arr = ['马','上','出','发','吧','！'];
    }
    var len = arr.length,htmlArr = [],i=0;
    var s = document.getElementById(id);
    s.style.display =  'block';
    var t = setInterval(function(){
        if(i<len){
            htmlArr.push(arr[i]);
            i++;
            s.innerHTML = htmlArr.join("");
        }else{
            clearInterval(t);
            callback();
        }
    },200)
}

//汽车
function Car(){
    base(this,LSprite,[]);
    var self = this;

    var bg = new LBitmap(new LBitmapData(imglist["car"]));
    self.addChild(bg);

    self.wheel = new LSprite();
    self.wheel.pic = new LBitmap(new LBitmapData(imglist["icons"],0,544,112,112));
    self.wheel.pic.x = -55;
    self.wheel.pic.y = -57;
    self.wheel.addChild(self.wheel.pic);
    self.wheel.x = 163;
    self.wheel.y = 172;
    self.addChild(self.wheel);

    self.wheel2 = self.wheel.clone();
    self.wheel2.x = 588;
    self.wheel2.y = 176;
    self.addChild(self.wheel2);
}
Car.prototype.move = function(){
    var self = this;
    LTweenLite.to(self.wheel,0.4,{rotate:360,loop:true,ease:LEasing.None.easeIn}).to(self.wheel,0,{rotate:0,loop:true,ease:LEasing.None.easeIn});
};