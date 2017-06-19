var stage,touchPointIDList = [],drawImgLayer,dotIndex = 0;

var imglist = {};

function main(){
    //全屏操作
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    //添加舞台
    stage = new LSprite();
    addChild(stage);

    addChild(new FPS());

    //添加加载层
    var loadinglayer = new LoadingSample1();
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
            drawInit();
        }
    );
}
function drawInit(){
    var bg = new Zimg([imglist['bg-draw']]);
    stage.addChild(bg);

    var cover = new LSprite();
    cover.x = 50;
    cover.y = 180;
    cover.graphics.drawRect(2,'#fff',[0,0,650,780]);

    photo = new LSprite();
    photo.img = new Zimg([imglist['photo']]);
    photo.img.x = -photo.img.getWidth()/2;
    photo.img.y = -photo.img.getHeight()/2;
    photo.addChild(photo.img);
    photo.x = 375;
    photo.y = 570;
    photo.mask = cover;
    stage.addChild(photo);

    drawImgLayer = new LSprite();
    //drawImgLayer.alpha = 0.3;
    stage.addChild(drawImgLayer);

    showImgPic = new LSprite();
    //showImgPic.mask = cover;
    stage.addChild(showImgPic);

    var drawLayer = new LSprite();
    drawLayer.graphics.drawRect(0,'#f00',[50,180,650,780]);
    stage.addChild(drawLayer);
    drawLayer.addEventListener(LMouseEvent.MOUSE_DOWN,addTouchPointID);
    drawLayer.addEventListener(LMouseEvent.MOUSE_MOVE,addTouchPointID);
    drawLayer.addEventListener(LMouseEvent.MOUSE_UP,removeTouchPointID);

    var brush = new Brush();
    stage.addChild(brush);
}
function addTouchPointID(e){
    //event.preventDefault();
    var f = false;
    for(var i=0;i<touchPointIDList.length;i++){
        if(touchPointIDList[i].touchPointID == e.touchPointID){
            touchPointIDList[i] = e;
            f = true;
            break;
        }
    }
    if(!f)touchPointIDList.push(e);
    draw();
}
function removeTouchPointID(e){
    //for(var i=0;i<touchPointIDList.length;i++){
    //    if(touchPointIDList[i].touchPointID == e.touchPointID){
    //        touchPointIDList.splice(i,1);
    //        break;
    //    }
    //}
    //drawEnd();
}
function draw(){
    if(touchPointIDList.length == 1){
        var e = touchPointIDList[0];
        drawImg(e);
    }else{
        console.log(2)
    }
}

function drawEnd(){
    if(touchPointIDList.length == 1){
        var bitmapData = new LBitmapData(null, 0, 0, 700, 960);
        bitmapData.draw(drawImgLayer);
        var img = new LBitmap(bitmapData);
        showImgPic.addChild(img);
        drawImgLayer.removeAllChild();
    }else{
        console.log(2)
    }

}

function drawImg(e){
    var dot = new ZRimg([imglist['icons'],80*dotIndex,0,80,80],-40,-40);
    dot.x = e.selfX;
    dot.y = e.selfY;
    drawImgLayer.addChild(dot);
}
