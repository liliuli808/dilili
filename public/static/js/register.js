//ע���ύ��ť
var doregister = $("input[name=doregister]");
//����
var repassword = $("input[name=repassword]");
//�ظ�����
var rerpassword = $("input[name=rerpassword]");
//�ֻ�����
var telnum = $("input[name=telnum]");
//�û���
var ruser = $("input[name=rusername]");
//������֤��
var btnSendCode = $("input[name=btnSendCode]");
//����
var flag = false;
//ע������
var rebody = $("#register_body");
//ע������
var retitle = $("#register_title");
//n
var n = 60;
//������֤��
btnSendCode.click(function(){
  ruser.next().attr('style','color:red');
if($("input[name=telnum]").val() == '')
{
  $("#errorspan").html('����Ϊ��');
  $("input[name=telnum]").focus();
  return;
}
var paramrs = {"telnum": $("input[name=telnum]").val()};
btnSendCode.attr('value','60�������');
btnSendCode.attr('disabled','disabled');
$.post(
  "index/auth/docode",
  paramrs
  );
     timer = setInterval (function(){
            n--;
            btnSendCode.attr('value',n+'�������');
            if(n == 0)
            {
              n=60;
              clearInterval(timer);
              btnSendCode.attr('value','���·�����֤��');
              btnSendCode.attr('disabled',false);
            }
      }, 1000);
});

//��֤�û���
function checkuser()
{
  var uPattern = /^[a-zA-Z0-9_-]{8,16}$/;
  var paramars = { "username":$("input[name=rusername]").val() };
  if(!uPattern.test(ruser.val())){
          ruser.next().html('�û�������Ϊ8-16���ַ�');
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
        ruser.next().html('�û�����ռ��');
        ruser.next().attr('style','color:red');
        ruser.focus();
         flag1 = false;
      }else{
        ruser.next().html('��ϲ��,�û�������ʹ��');
        ruser.next().attr('style','color:green');
         flag1 = true;
      }
      }
    );
}
ruser.blur(function(){
  checkuser();
  });
//��֤����
function checkpwd()
{
  var pPattern = /^[0-9]{6,10}/;
  if(repassword.val().length <8 || repassword.val().length > 13 )
  {
            repassword.next().html('����8λ');
            repassword.next().attr('style','color:red');
            flag2 = false;
  }else
  {
        repassword.next().html('��ϲ��,�������ʹ��');
        repassword.next().attr('style','color:green');
         flag2 = true;
  }
}

function checkrpwd()
{
  if(rerpassword.val() != repassword.val()){
          rerpassword.next().html("�������벻ͬ");
          rerpassword.next().attr('style','color:red');
           flag3 = false;
  }else
  {
        rerpassword.next().html('��ϲ��,�������ʹ��');
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
            telnum.next().html('�ֻ�λ������');
            telnum.next().attr('style','color:red');
             flag4 = false;
  }else{
        telnum.next().html('��ϲ��,�ֻ��ſ���ʹ��');
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
                    rebody.after("<img  src='/static/img/success.png' style='margin:0 auto;position:relative;left:233px'/><div><span style='position:relative;left:233px;font-size:30px;color:green'>ע��ɹ�</span></div><span id='timeoutbb' style='position:relative;left:233px;font-size:20px;'>5���������ת</span>");
                      var n = 5;
                      setInterval(function(){
                        n--;
                        $("#timeoutbb").html(n+"���������ת");
                      if(n <= 1)
                      {
                         location.href = '/index';
                      }
                      },1000);
            }
            else{
                  rebody.children().attr('style','display:none');
                  rebody.after("<img  src='/static/img/error.png' style='margin:0 auto;position:relative;left:233px'/><div><span style='position:relative;left:233px;font-size:30px;color:red'>ע��ʧ��</span></div><span id='timeoutbb' style='position:relative;left:233px;font-size:20px;'>5���������ת</span><div><span style='position:relative;left:233px;font-size:30px;color:red'>"+data.msg+"</span></div>");
                    var n = 5;
                    setInterval(function(){
                      n--;
                      $("#timeoutbb").html(n+"���������ת");
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