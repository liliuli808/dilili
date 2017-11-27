var calUtil = {
  //当前日历显示的年份
  showYear:2015,
  //当前日历显示的月份
  showMonth:1,
  //当前日历显示的天数
  showDays:1,
  eventName:"load",
  //初始化日历
  init:function(signList,s=''){
    calUtil.setMonthAndDay();
    if (typeof(s) == 'undefined'){
    }else{
      signList.splice('','',s);
    }
    calUtil.draw(signList);
    calUtil.bindEnvent(signList);
  },
  draw:function(signList){
    //绑定日历
    //alert(signList.length);
    console.log(signList);
    if(signList.length > 21){
      //alert(21);
      $("#sign_note").empty();
      $("#sign_note").html('<button class="sign_contener" type="button"><i class="fa fa-calendar-check-o" aria-hidden="true"></i>&nbsp;已达标，获取1次抽奖</button>');
    }
    var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,signList);
    $("#calendar").html(str);
    //绑定日历表头
    var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";
    $(".calendar_month_span").html(calendarName);  
  },
  //绑定事件
  bindEnvent:function(signList){
    // //绑定上个月事件
    // $(".calendar_month_prev").click(function(){
    //   //ajax获取日历json数据
    //   //var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];
    //   calUtil.eventName="prev";
    //   calUtil.init(signList);
    // });
    // //绑定下个月事件
    // $(".calendar_month_next").click(function(){
    //   //ajax获取日历json数据
    //   //var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];
    //   calUtil.eventName="next";
    //   calUtil.init(signList);
    // });
    
    $(".calendar_record").click(function(){
      //ajax获取日历json数据
      //alert(typeof(signList)+"yxy");
      //var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];
      //var tmp = {"signDay":$(this).html()};
      //if (typeof(signList) == 'undefined'){
        //不做处理
      //}else{
      //  signList.splice('','',tmp);
      //  console.log(signList);
      //  calUtil.init(signList);
     // }
     //alert($(this).html());
    // var tmp = {"signDay":$(this).html()};
    // calUtil.init(signList,tmp);
     
      
      
    });
  },
  //获取当前选择的年月
  setMonthAndDay:function(){
    switch(calUtil.eventName)
    {
      case "load":
        var current = new Date();
        calUtil.showYear=current.getFullYear();
        calUtil.showMonth=current.getMonth() + 1;
        break;
      case "prev":
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)-1;
        if(calUtil.showMonth==0)
        {
            calUtil.showMonth=12;
            calUtil.showYear-=1;
        }
        break;
      case "next":
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)+1;
        if(calUtil.showMonth==13)
        {
            calUtil.showMonth=1;
            calUtil.showYear+=1;
        }
        break;
    }
  },
  getDaysInmonth : function(iMonth, iYear){
   var dPrevDate = new Date(iYear, iMonth, 0);
   return dPrevDate.getDate();
  },
  bulidCal : function(iYear, iMonth) {
   var aMonth = new Array();
   aMonth[0] = new Array(7);
   aMonth[1] = new Array(7);
   aMonth[2] = new Array(7);
   aMonth[3] = new Array(7);
   aMonth[4] = new Array(7);
   aMonth[5] = new Array(7);
   aMonth[6] = new Array(7);
   var dCalDate = new Date(iYear, iMonth - 1, 1);
   var iDayOfFirst = dCalDate.getDay();
   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
   var iVarDate = 1;
   var d, w;
   aMonth[0][0] = "日";
   aMonth[0][1] = "一";
   aMonth[0][2] = "二";
   aMonth[0][3] = "三";
   aMonth[0][4] = "四";
   aMonth[0][5] = "五";
   aMonth[0][6] = "六";
   for (d = iDayOfFirst; d < 7; d++) {
    aMonth[1][d] = iVarDate;
    iVarDate++;
   }
   for (w = 2; w < 7; w++) {
    for (d = 0; d < 7; d++) {
     if (iVarDate <= iDaysInMonth) {
      aMonth[w][d] = iVarDate;
      iVarDate++;
     }
    }
   }
   return aMonth;
  },
  ifHasSigned : function(signList,day){
   var signed = false;
   $.each(signList,function(index,item){
    if(item.signDay == day) {
     signed = true;
     return false;
    }
   });
   return signed ;
  },
  drawCal : function(iYear, iMonth ,signList) {
   var myMonth = calUtil.bulidCal(iYear, iMonth);
   var htmls = new Array();
   htmls.push("<div class='sign_main' id='sign_layer'>");
   htmls.push("<div class='sign_succ_calendar_title'>");
   //htmls.push("<div class='calendar_month_next'>下月</div>");
   //htmls.push("<div class='calendar_month_prev'>上月</div>");
   htmls.push("<div class='calendar_month_span'></div>");
   htmls.push("</div>");
   htmls.push("<div class='sign_equal' id='sign_cal'>");
   htmls.push("<div class='sign_row'>");
   htmls.push("<div class='th_1 bold'>" + myMonth[0][0] + "</div>");
   htmls.push("<div class='th_2 bold'>" + myMonth[0][1] + "</div>");
   htmls.push("<div class='th_3 bold'>" + myMonth[0][2] + "</div>");
   htmls.push("<div class='th_4 bold'>" + myMonth[0][3] + "</div>");
   htmls.push("<div class='th_5 bold'>" + myMonth[0][4] + "</div>");
   htmls.push("<div class='th_6 bold'>" + myMonth[0][5] + "</div>");
   htmls.push("<div class='th_7 bold'>" + myMonth[0][6] + "</div>");
   htmls.push("</div>");
   var d, w;
   for (w = 1; w < 6; w++) {
    htmls.push("<div class='sign_row'>");
    for (d = 0; d < 7; d++) {

     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
     console.log("001:"+ifHasSigned);
     if(ifHasSigned && typeof(myMonth[w][d]) != 'undefined'){
      htmls.push("<div class='td_"+d+" on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</div>");
     } else {
      htmls.push("<div class='td_"+d+" calendar_record'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</div>");
     }
    }
    htmls.push("</div>");
   }
   htmls.push("</div>");
   htmls.push("</div>");
   htmls.push("</div>");
   return htmls.join('');
  }
};