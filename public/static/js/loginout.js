   var firm = $("#firm");
        //利用对话框返回的值 （true 或者 false）  
      		firm.on('click',function(){

      		$.post("/index/login/loginout",function(data){
              $("#loginout").slideDown();
                var n = 5;
                      setInterval(function(){
                        n--;
                        $("#timeouver").html(n+"秒后立即跳转");
                      if(n <= 1)
                      {
                        $("#loginout").slideUp();
                         location.href = '/';
                      }
                      } ,1000);
            });

      		});
            // alert("点击了确定");
      
 
  
    