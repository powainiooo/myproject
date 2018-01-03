/*
* msg : 弹窗信息
* callback : 点击确认按钮的回调函数
* */
function showMsg(msg,callback){
    var html = '';
    html += '<div class="alert-frame">' +
        '<div class="alert-content">' +
        '<a href="javascript:;" class="btn-close"><i class="icons icons-close-circle"></i></a>' +
        '<div class="msg">'+msg+'</div>' +
        '<div class="btns"><a href="javascript:;" class="btn btn-confirm btn-auto">确定</a> </div>' +
        '</div></div>';
    $("body").append(html);

    $(".alert-frame .btn-close").on('click',function(){
        $(this).parents('.alert-frame').remove();
    });
    $(".alert-frame .btn-confirm").on('click',function(){
        $(this).parents('.alert-frame').remove();
        if(typeof callback == 'function'){
            callback();
        }
    });
}

function workerMove(){
    var lis = $("#workerList li").clone();
    var lis2 = $("#workerList li").clone();
    $("#workerList ul").append(lis);
    $("#workerList ul").append(lis2);

    var len = $("#workerList li").length;
    var li = $("#workerList li");
    $("#workerList ul").width(len*202);
    setInterval(function(){
        $("#workerList ul").animate({"margin-left":"-202"},2000,'easeInOutQuad',function(){
            $("#workerList ul").css("margin-left","0").append($("#workerList li").eq(0));
        })
    },3000)
}

function proMove(){
    var ww = parseInt($(window).width());
    var proLen = $("#proList li").length;
    $("#proList li").css("width",ww*0.24);
    $("#proList ul").css("width",(ww*0.24+50)*proLen);

    var dis = (ww*0.24+50)*3;
    var moveLen = Math.ceil(proLen/3);
    var moveIndex = 0;
    var ul = $("#proList ul");

    $("#arrowLeftPro").on('click',function(){
        if(moveIndex == 0){
            ul.animate({"margin-left":60},50).animate({"margin-left":50},50);
        }else{
            moveIndex--;
            ul.animate({"margin-left":-moveIndex*dis+50},600,"easeInOutCubic");
        }
    });

    $("#arrowRightPro").on('click',function(){
        if(moveIndex == moveLen-1){
            ul.animate({"margin-left":-moveIndex*dis+40},50).animate({"margin-left":-moveIndex*dis+50},50);
        }else{
            moveIndex++;
            ul.animate({"margin-left":-moveIndex*dis+50},600,"easeInOutCubic");
        }
    });
}

function detailMove(){
    var ww = parseInt($(window).width());
    var detailLen = $("#detailList li").length;
    $("#detailList li").css("width",ww*0.58);
    $("#detailList ul").css("width",(ww*0.58+50)*detailLen);

    var dis = ww*0.58+50;
    var moveLen = detailLen;
    var moveIndex = 0;
    var ul = $("#detailList ul");

    $("#arrowLeftDetail").on('click',function(){
        if(moveIndex == 0){
            ul.animate({"margin-left":ww*0.42+10},50).animate({"margin-left":ww*0.42},50);
        }else{
            moveIndex--;
            ul.animate({"margin-left":ww*0.42-moveIndex*dis+50},600,"easeInOutCubic");
            $("#navBars a").eq(moveIndex).addClass('active').siblings("a").removeClass('active');
        }
    });

    $("#arrowRightDetail").on('click',function(){
        if(moveIndex == moveLen-1){
            ul.animate({"margin-left":ww*0.42-moveIndex*dis+40},50).animate({"margin-left":ww*0.42-moveIndex*dis+50},50);
        }else{
            moveIndex++;
            ul.animate({"margin-left":ww*0.42-moveIndex*dis+50},600,"easeInOutCubic");
            $("#navBars a").eq(moveIndex).addClass('active').siblings("a").removeClass('active');
        }
    });
}

function navMove(){
    $(".navBtn").on('click',function(){
        var current = $(this).parents('.page-frame').attr("id");
        var goto = $(this).data('page');
        $("#"+current).fadeOut(1000);
        $("#"+goto).fadeIn(1000);
    })
}
