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
