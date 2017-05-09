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

//分享弹层
function shareInit(){
    sharelayer = new LSprite();
    stage.addChild(sharelayer);
    sharelayer.graphics.drawRect(0,"#000",[0,0,640,960],true,"rgba(0,0,0,0.5)");

    var pic = new LBitmap(new LBitmapData(imglist["share"]));
    pic.x = 350;
    pic.y = 50;
    pic.scaleX = 0.5;
    pic.scaleY = 0.5;
    sharelayer.addChild(pic);

    sharelayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        stage.removeChild(sharelayer);
    });
}
