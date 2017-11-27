//注册提交按钮
var doregister = $("input[name=doregister]");
//密码
var repassword = $("input[name=repassword]");
//重复密码
var rerpassword = $("input[name=rerpassword]");
//手机号码
var telnum = $("input[name=telnum]");
//用户名
var ruser = $("input[name=rusername]");
//发送验证码
var btnSendCode = $("input[name=btnSendCode]");
//旗子
var flag = false;
//注册主体
var rebody = $("#register_body");
//注册内容
var retitle = $("#register_title");
//n
var n = 60;
//发送验证码
btnSendCode.click(function(){
  ruser.next().attr('style','color:red');
if($("input[name=telnum]").val() == '')
{
  $("#errorspan").html('不能为空');
  $("input[name=telnum]").focus();
  return;
}
var paramrs = {"telnum": $("input[name=telnum]").val()};
btnSendCode.attr('value','60秒后重试');
btnSendCode.attr('disabled','disabled');
$.post(
  "index/auth/docode",
  paramrs
  );
     timer = setInterval (function(){
            n--;
            btnSendCode.attr('value',n+'秒后重试');
            if(n == 0)
            {
              n=60;
              clearInterval(timer);
              btnSendCode.attr('value','重新发送验证码');
              btnSendCode.attr('disabled',false);
            }
      }, 1000);
});

//验证用户名
function checkuser()
{
  var uPattern = /^[a-zA-Z0-9_-]{8,16}$/;
  var paramars = { "username":$("input[name=rusername]").val() };
  if(!uPattern.test(ruser.val())){
          ruser.next().html('用户名长度为8-16个字符');
          ruser.next().attr('style','color:red');
          ruser.focus();
          flag1 = false;
          return;
  }
      $.post(
      "index/auth/check_user",
      paramars,
      function(data)
      {
      if(data.status){
        ruser.next().html('用户名已占用');
        ruser.next().attr('style','color:red');
        ruser.focus();
         flag1 = false;
      }else{
        ruser.next().html('恭喜啦,用户名可以使用');
        ruser.next().attr('style','color:green');
         flag1 = true;
      }
      }
    );
}
ruser.blur(function(){
  checkuser();
  });
//验证密码
function checkpwd()
{
  var pPattern = /^[0-9]{6,10}/;
  if(repassword.val().length <8 || repassword.val().length > 13 )
  {
            repassword.next().html('最少8位');
            repassword.next().attr('style','color:red');
            flag2 = false;
  }else
  {
        repassword.next().html('恭喜啦,密码可以使用');
        repassword.next().attr('style','color:green');
         flag2 = true;
  }
}

function checkrpwd()
{
  if(rerpassword.val() != repassword.val()){
          rerpassword.next().html("两次密码不同");
          rerpassword.next().attr('style','color:red');
           flag3 = false;
  }else
  {
        rerpassword.next().html('恭喜啦,密码可以使用');
        rerpassword.next().attr('style','color:green');
         flag3 = true;
  }
}
repassword.blur(function(){
  checkpwd();
});
rerpassword.blur(function(){
  checkrpwd();
  });

function checktel()
{
  var mPattern = /^((1[0-9][0-9]))\d{8}$/;
  if(!mPattern.test(telnum.val()))
  {
            telnum.next().html('手机位数不对');
            telnum.next().attr('style','color:red');
             flag4 = false;
  }else{
        telnum.next().html('恭喜啦,手机号可以使用');
        telnum.next().attr('style','color:green');
        flag4 = true;
  }
}
telnum.blur(function(){
  checktel();
});



    doregister.on('click',function(){
      var paramrs = {
      "username" : $("input[name=rusername]").val(),
      "password": $("input[name=repassword]").val(),
      "tel":$("input[name=telnum]").val(),
      "yzm":$("input[name=yzm]").val(),
    };
            
  if(flag1&&flag2&&flag4&&flag4)
    {
         $.post(
         "index/auth/doregister",
          paramrs,
          function(data)
          {
            if(data.status)
            {
                    rebody.children().attr('style','display:none');
                    rebody.after("<img  src='/static/img/success.png' style='margin:0 auto;position:relative;left:233px'/><div><span style='position:relative;left:233px;font-size:30px;color:green'>注册成功</span></div><span id='timeoutbb' style='position:relative;left:233px;font-size:20px;'>5秒后立即跳转</span>");
                      var n = 5;
                      setInterval(function(){
                        n--;
                        $("#timeoutbb").html(n+"秒后立即跳转");
                      if(n <= 1)
                      {
                         location.href = '/index';
                      }
                      },1000);
            }
            else{
                  rebody.children().attr('style','display:none');
                  rebody.after("<img  src='/static/img/error.png' style='margin:0 auto;position:relative;left:233px'/><div><span style='position:relative;left:233px;font-size:30px;color:red'>注册失败</span></div><span id='timeoutbb' style='position:relative;left:233px;font-size:20px;'>5秒后立即跳转</span><div><span style='position:relative;left:233px;font-size:30px;color:red'>"+data.msg+"</span></div>");
                    var n = 5;
                    setInterval(function(){
                      n--;
                      $("#timeoutbb").html(n+"秒后立即跳转");
                      if(n <= 1)
                      {

                         location.href = '/index';
                      }
                    },1000);
            }
          }
        );
    }  
    });