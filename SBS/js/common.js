//������
/***********************
 �������жϹ��ֹ�������
 ������event
 ���أ����ַ��� 1������ -1������
 *************************/
var scrollFunc=function(e){
    var direct=0;
    var st = $("body").scrollTop();
    e=e || window.event;
    if(e.wheelDelta){//IE/Opera/Chrome
        if(e.wheelDelta>0){//up
            $("#header").removeClass("down");
            $("#showNav").hide();
            $(".head-height").height(205);
        }else if(e.wheelDelta<0){//down
            $("#header").addClass("down");
            $("#showNav").show();
            $(".head-height").height(150);
        }
    }else if(e.detail){//Firefox
        console.log(e.detail);
    }
};
/*ע���¼�*/
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari

$(function(){
    //����˵�
    $("#showNav").on('click',function(){
        $("#header").removeClass("down");
        $("#showNav").hide();
    });

    $("#btn-menu").on('click',function(){
        $(this).toggleClass("btn-menu-close");
        $(".single-header nav ul").slideToggle(200);
        $(".home-header nav ul").slideToggle(200);
    })
});