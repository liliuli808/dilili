var submit = $("input[name=profilesubmit]");

submit.on('click',function(){
	var name = $("input[name=name]").val();
	var sex = $("input[name=sex]:checked").val();
	var year  = $("select[name=birthyear]").val();
	var mon = $("select[name=birthmonth]").val();
	var day = $("select[name=birthday]").val();
	var blood = $("select[name=blood]").val();
	var marry = $("select[name=marry]").val();
	var home = $(".prov");
	var proval = home.val();
	var cityval = home.next().val();
	var dist = home.next().next().val();
	var paramrs = {
		"sex":sex,
		"nickname":name,
		"birthday":year+','+mon+','+day,
		"place":proval+','+cityval+','+dist,
		"blood":blood,
		"marry":marry
	};
	$.post(
		'doset',
		paramrs,
		function(data)
		{
			$("input[name=profilesubmit]").after('<div id="success" style="width:100px;height: 22px;background: green;position: relative;bottom: -57px;color: white;line-height: 22px;text-align: center;">修改成功</div>');
			$("#success").fadeOut(2000);
		}
		);
});


