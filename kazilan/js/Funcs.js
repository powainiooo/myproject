//加载层
var LoadingDoufen = (function(){
    function LoadingDoufen() {
        base(this,LSprite,[]);
        var s = this;

        s.bgpic = new LBitmap(new LBitmapData(loadinglist["L_bg"]));
        s.addChild(s.bgpic);

        s.logo = new LBitmap(new LBitmapData(loadinglist["L_logo"]));
        s.logo.x = (LGlobal.width - s.logo.getWidth())/2;
        s.logo.y = 350 - s.logo.getHeight()/2;
        s.addChild(s.logo);

        s.progressbg = new LBitmap(new LBitmapData(loadinglist["L_icons"],0,0,470,16));
        s.progressbg.x = (LGlobal.width - s.progressbg.getWidth())/2;
        s.progressbg.y = 650;
        s.addChild(s.progressbg);

        s.cover = new LSprite();
        s.cover.graphics.drawRect(0,"#F00",[0,0,0,16]);
        s.cover.x = s.progressbg.x;
        s.cover.y = 650;

        s.progressline = new LBitmap(new LBitmapData(loadinglist["L_icons"],0,37,470,16));
        s.progressline.x = (LGlobal.width - s.progressline.getWidth())/2;
        s.progressline.y = 650;
        s.progressline.mask = s.cover;
        s.addChild(s.progressline);

        s.snail = new LBitmap(new LBitmapData(loadinglist["L_icons"],485,0,98,55));
        s.snail.x = s.progressbg.x-38;
        s.snail.y = 650-14;
        s.addChild(s.snail);

        s.start = s.progressbg.x-38;

        var txt = new LTextField();
        txt.text = loadingTXT;
        txt.color = loading_COLOR;
        txt.size = 30;
        txt.textAlign = "center";
        txt.x = LGlobal.width/2;
        txt.y = 890;
        s.addChild(txt);
    }
    LoadingDoufen.prototype.setProgress = function(value){
        var s = this;
        s.cover.graphics.clear();
        s.cover.graphics.drawRect(0,"#F00",[0,0,470*(value/100),16]);

        s.snail.x = s.start+s.progressline.getWidth()*(value/100);
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

function Brush(){
    base(this,LSprite,[]);
    var self = this;
    self.x = 60;
    self.y = 1085;
    var bg = new Zimg([imglist['icons'],641,0,630,252]);
    self.addChild(bg);

    self.sLayer = new LSprite();
    self.sLayer.x = 315;
    self.sLayer.y = 290;
    self.addChild(self.sLayer);

    self.btnArr = [];
    for(var i=0;i<8;i++){
        self.btnArr[i] = new ZRimg([imglist['icons'],80*i,80,68,266],-34,-266);
        self.btnArr[i].rotate = 30*i;
        self.btnArr[i].scaleX = 0.8;
        self.btnArr[i].scaleY = 0.8;
        self.btnArr[i].index = i;
        self.sLayer.addChild(self.btnArr[i]);
        self.btnArr[i].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
            self.setRotating(this.sp.index);
            dotIndex = this.sp.index;
        })
    }
    self.btnArr[0].scaleX = 1;
    self.btnArr[0].scaleY = 1;

}
Brush.prototype.setRotating = function(index){
    var self = this;
    var angle = -30*index;
    for(var j=0;j<8;j++){
        self.btnArr[j].scaleX = 0.8;
        self.btnArr[j].scaleY = 0.8;
    }
    self.btnArr[index].scaleX = 1;
    self.btnArr[index].scaleY = 1;
    LTweenLite.to(self.sLayer,0.3,{rotate:angle,ease:LEasing.None.easeIn});
};