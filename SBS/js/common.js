//鼠标滚动
/***********************
 函数：判断滚轮滚动方向
 参数：event
 返回：滚轮方向 1：向上 -1：向下
 *************************/
var scrollFunc=function(e){
    var direct=0;
    var st = $("body").scrollTop();
    e=e || window.event;
    if(e.wheelDelta){//IE/Opera/Chrome
        if(e.wheelDelta>0){//up
            $("#header").removeClass("down");
            $("#showNav").hide();
        }else if(e.wheelDelta<0){//down
            $("#header").addClass("down");
            $("#showNav").show();
        }
    }else if(e.detail){//Firefox
        console.log(e.detail);
    }
};
/*注册事件*/
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari

$(function(){
    //点击菜单
    $("#showNav").on('click',function(){
        $("#header").removeClass("down");
        $("#showNav").hide();
    });
});