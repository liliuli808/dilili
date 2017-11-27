
$("#upload_head").on("change",function(e){
	file = e.target.files[0];
  url = URL.createObjectURL(file);
  $("#newimg").attr('src',url);
  $("input[name=uploadbtn]").show();
  //$("#uploadimg").submit();
});



  
