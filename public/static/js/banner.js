function show()
{
	var i = 0;
	timer = setInterval(function(){
		left = -i*440;
		$(".slider-img").animate({'left':left+"px"});
		$(".slider-btn").children().attr('class','');
		$(".slider-btn").children().eq(i).attr('class','cur');
		i++;
		if(i==4){
      		i=0;
    	}

	},2000);

	// for (var i = 0; i < $(".slider-btn").children().length; i++) {
	// 	$(".slider-btn").children().eq(i).on('click',function(){
	// 		alert(i);
	// 	});
	// }
	$(".slider-btn").children().on('click',function(){
			$(".slider-btn").children().attr('class','');
			i = $(this).index();
			$(".slider-btn").children().eq(i).attr('class','cur');
			left = -i*440;
			$(".slider-img").animate({'left':left+"px"});
			});
}
show();