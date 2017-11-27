
    //-----------用户登录     
        //第三方登录
        //点击刷新验证码
        function refreshVerify() {
            var ts = Date.parse(new Date())/1000;
            $("#verify_img").attr("src", "/captcha?id="+ts);
        }
     // var rinput=$("input");
     //用户名
      var rusername=$("input[name=username]");
    //用户密码
      var rpassword=$("input[name=password]");
    //验证码
      var rVerify=$("input[name=verify]");

      var login = $("#denglu");
      //非空状态检测

      rusername.on("blur",function(){
          if(rusername.val().length !=0){
              rusername.next().html("OK");
              rusername.next().attr("style" ,"color:green");
              flag1 = true;
          }else{
              rusername.next().html("不能为空");
              rusername.next().attr("style" ,"color:red");
              flag1 = false;
          }
      });

      rpassword.on("blur",function(){
          if(rpassword.val() ==''){
              rpassword.next().html("密码不能为空");
              rpassword.next().attr("style" ,"color:red");
              rpassword.focus();
              flag2 = false;
          }else{
              rpassword.next().html("输入正确");
              rpassword.next().attr("style" ,"color:green");
              flag2 = true;
          }
      });

      rVerify.on("blur",function(){
          if(rVerify.val() ==''){
              rVerify.next().html("验证码不能为空");
              rVerify.next().attr("style" ,"color:red");
              rVerify.focus();
              flag3 = false;
          }else{
              rVerify.next().html("输入正确");
              rVerify.next().attr("style" ,"color:green");
              flag3= true;
          }
      });


        //登录验证
        login.on('click',function(){
            var username=$("input[name=username]").val();
            var password=$("input[name=password]").val();
            var verify=$("input[name=verify]").val();
            if($('#zidong').is(':checked')) 
            {
              var zidonglogin=1;
            }
            var loginbo = $("#login_body");
            var params = {
              "username":username,
              "password":password,
              "verify":verify,
              "zidonglogin":zidonglogin
            }
           
            if(flag1 && flag2 && flag3){
            $.post("/index/login/dologin",params,function(data){

              if(data.status){

                    loginbo.children().attr('style','display:none');
                    loginbo.after("<img  src='/static/img/success.png' style='margin:0 auto;position:relative;left:233px'/><div><span style='position:relative;left:233px;font-size:30px;color:green'>登陆成功</span></div><span id='timeouve' style='position:relative;left:233px;font-size:20px;'>5秒后立即跳转</span>");
                      var n = 5;
                      setInterval(function(){
                        n--;
                        $("#timeouve").html(n+"秒后立即跳转");
                      if(n <= 1)
                      {
                         location.href = '/';
                      }
                      } ,1000);
                              
              }else{
                loginbo.children().attr('style','display:none');
                 loginbo.after("<img  src='/static/img/error.png' style='margin:0 auto;position:relative;left:233px'/><div><span style='position:relative;left:233px;font-size:30px;color:red'>登陆失败</span></div><span id='timeouver' style='position:relative;left:233px;font-size:20px;'>5秒后立即跳转</span><div><span style='position:relative;left:233px;font-size:30px;color:red'>"+data.msg+"</span></div>");
                    var n = 5;
                    setInterval(function(){
                      n--;
                      $("#timeouve").html(n+"秒后立即跳转");
                      if(n <= 1)
                      {

                         //location.href = '/';
                      }
                    },1000);
              }
            });
          }
        });
