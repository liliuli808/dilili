// JavaScript Document
document.write("<link rel=\"stylesheet\" href=\"/Style/bootstrap/css/bootstrap.min.css\"\/>");
document.write("<link rel=\"stylesheet\" href=\"/Style/css/master.css\"\/>");
document.write("<link rel=\"stylesheet\" href=\"/Style/css/font-awesome.min.css\"\/>");
document.write('<script type="text/javascript" src="' + '/Style/js/main.js' + '"><\/script>');
jQuery(function () {
    jQuery(".leftnav li .opennavbtn").toggle(function () {
        jQuery(this).parent().find(".navsonbox").show();
    }, function () {
        jQuery(this).parent().find(".navsonbox").hide();
    });

    $(function(){
        UsersignIn();        //用户签到
        ChecksignIn();       //检查是否签到
    });


    /**
     * UsersignIn
     * 用户签到
     * @return void
     * @created time :2016-05-15 14:55
     */
    function UsersignIn(){
        var $btn = $('#btn-sign-user'), sHTML = $(".riseinfo_box"),info, $sCredits = $("#user_credits");
        info = function(text) {
            sHTML.find("span").html(text);
            sHTML.fadeIn(200);
            window.setTimeout(function(){
                sHTML.fadeOut();
            }, 1500);
        };
        $btn.bind({
            click: function(){
                var url = "/Index/sign_in.html?type=0",data;
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    contentType:"application/json",
                    success: function(json) {
                        if(json.code == "200" && json.data.state > 0 ){
                            $btn.removeClass('primary').addClass('success').html('<i class="icon icon-check-circle"></i>已签到');
                            $sCredits.text(json.data.extcredits1);
                            if(json.data.state == "1" ){
                                sHTML.width(220);
                            }else if( json.data.state == "2" ){
                                $sCredits.text(json.data.extcredits1);
                            }
                            info(json.msg);
                        }
                        else{
                            sHTML.width(220);
                            info(json.msg);
                        } 
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        info("网络异常请刷新");
                    }
                });
            }   
        });
    }


    /**
     * ChecksignIn
     * 检查是否签到
     * @return void
     * @created time :2016-05-15 14:55
     */
    function ChecksignIn()
    {
        var $btn = $('#btn-sign-user'), sHTML = $(".riseinfo_box"),info,$sCredits = $("#user_credits"),$sLevel_tips = $("#user_level_tips");
        
        if(typeof UID == 'undefined') UID = 0;
        var url = "/Index/sign_in.html?type=1&uid="+UID,data;
        
        info = function(text) {
            sHTML.find("span").html(text);
            sHTML.fadeIn(200);
            window.setTimeout(function(){
                sHTML.fadeOut();
            }, 1500);
        };

        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            contentType:"application/json",
            success: function(json) {
                if(json.code == "200" && json.data.state > 0 ) {
                    $btn.removeClass('primary').addClass('success').html('<i class="icon icon-check-circle"></i>已签到');
                }else if(json.code == "200" && json.data.state == "0" ) {
                    $btn.html('<i class="icon icon-check-circle"></i>签到');
                    if(json.data.extcredits1  == null){
                        $sCredits.text("0");
                        $sLevel_tips.attr("title","0% - 当前总经验值：0 / 下一级所需总经验值：100");
                    }
                    else{
                        $sCredits.text(json.data.extcredits1);
                    }
                }
                else{
                    sHTML.width(220);
                    info(json.msg);
                } 
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("网络异常请刷新");
                //info("网络异常请刷新");
            }
        });
    }

});

if(!window["Util"]){window["Util"] = {}; }


/**
 * 公共函数
 */
Util.Common = {
    getQueryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
            //用法
            //var param = Util.common.getQueryString("a");
    },
    getPathname:function(){
        var pathname = window.location.pathname;
        return pathname.replace('/','');
    },
    getPageName:function(){
        var pagename = Util.Common.getPathname();
        return pagename.replace('.html','');
    }
    
    
}

