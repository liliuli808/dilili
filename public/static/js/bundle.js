!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,exports,t){"use strict";window.BiliCm={env:"ENV_PRO",installed:!1},window.BiliCm.installed||(t(1),t(3),t(4),window.ad_rp=window.BiliCm.base=window.BiliCm.Base=t(5),window.BiliCm.Core=t(7),function($,e){e.BiliCm.installed=!0,e.BiliCm.Base.init(),$(function(){e.BiliCm.Core.init()})}(jQuery,window))},function(e,exports,t){"use strict";var n=t(2);e.exports=n},function(e,exports){"use strict";e.exports={API_BILIBILI_HOSTNAME:"//api.bilibili.com",DATA_BILIBILI_HOSTNAME:"//data.bilibili.com",CM_BILIBILI_HOSTNAME:"//cm.bilibili.com",MAIN_HOSTNAME:"www.bilibili.com",PGC_HOSTNAME:"bangumi.bilibili.com",VEDIO_URL_REG:/www\.bilibili\.com\/video\/av/i,BASE_AD_IMG:"//static.hdslb.com/images/base/web_banner_logo.png",ADOBE_SHOCKWAVE_URL:"//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash",GOOGLE_AD_JS_URL:"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",CM_AJAX_TIMEOUT:3e4}},function(module,exports){"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};"object"!==_typeof(window.JSON)&&(window.JSON={}),function(){function f(e){return e<10?"0"+e:e}function this_value(){return this.valueOf()}function quote(e){return rx_escapable.lastIndex=0,rx_escapable.test(e)?'"'+e.replace(rx_escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,i,r,a,o,s=gap,d=t[e];switch(d&&"object"===("undefined"==typeof d?"undefined":_typeof(d))&&"function"==typeof d.toJSON&&(d=d.toJSON(e)),"function"==typeof rep&&(d=rep.call(t,e,d)),"undefined"==typeof d?"undefined":_typeof(d)){case"string":return quote(d);case"number":return isFinite(d)?String(d):"null";case"boolean":case"null":return String(d);case"object":if(!d)return"null";if(gap+=indent,o=[],"[object Array]"===Object.prototype.toString.apply(d)){for(a=d.length,n=0;n<a;n+=1)o[n]=str(n,d)||"null";return r=0===o.length?"[]":gap?"[\n"+gap+o.join(",\n"+gap)+"\n"+s+"]":"["+o.join(",")+"]",gap=s,r}if(rep&&"object"===("undefined"==typeof rep?"undefined":_typeof(rep)))for(a=rep.length,n=0;n<a;n+=1)"string"==typeof rep[n]&&(i=rep[n],r=str(i,d),r&&o.push(quote(i)+(gap?": ":":")+r));else for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(r=str(i,d),r&&o.push(quote(i)+(gap?": ":":")+r));return r=0===o.length?"{}":gap?"{\n"+gap+o.join(",\n"+gap)+"\n"+s+"}":"{"+o.join(",")+"}",gap=s,r}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(e,t,n){var i;if(gap="",indent="","number"==typeof n)for(i=0;i<n;i+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!==("undefined"==typeof t?"undefined":_typeof(t))||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(e,t){var n,i,r=e[t];if(r&&"object"===("undefined"==typeof r?"undefined":_typeof(r)))for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(i=walk(r,n),void 0!==i?r[n]=i:delete r[n]);return reviver.call(e,t,r)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()},function(e,exports){"use strict";!function($,e){var t=function(e,t){var n;return function(){function i(){e.apply(r,a),n=null}var r=this,a=arguments;n&&clearTimeout(n),n=setTimeout(i,t||100)}};jQuery.fn[e]=function(n){return n?this.on("resize",t(n)):this.trigger(e)}}(jQuery,"smartresize")},function(e,exports,t){"use strict";var n=t(1),i=t(6);e.exports=function($,e,t,n,i,r){var a={_list:[],_log:[],_cached:[],_loadTs:i.getNowTs(),_getNowTs:function(){return(new Date).getTime()},_getDataHostname:function(){return n["DATA_BILIBILI_HOSTNAME"]},_getCmHostname:function(){return n["CM_BILIBILI_HOSTNAME"]},_getWebAdLogUrl:function(){return this._getDataHostname()+"/v/web/web_cm_event"},_getApiPvUrl:function(){return this._getCmHostname()+"/cm/api/apidata/pc"},_getFeesUrl:function(){return this._getCmHostname()+"/cm/api/fees/pc"},_getShowContentUrl:function(){return this._getCmHostname()+"/cm/api/receive/content/pc"},_getClickContentUrl:function(){return this._getCmHostname()+"/cm/api/receive/content/pc/clk"},_getFeesSyncUrl:function(){return this._getCmHostname()+"/cm/api/fees/pc/sync"},_getFeesSyncUrlv2:function(){return this._getCmHostname()+"/cm/api/fees/pc/sync/v2"},_checkAd:function(e){return!(!e["is_ad_loc"]||!e["ad_cb"])},_genReqOpsSe:function(t,n,i,r,a){var o=this;return{uploads:[{a:t.src_id||"",b:t.server?t.server:"bilibili",c:t.is_ad?1:0,d:t.area||"",e:t.ad_cb||"",f:n||"",g:1,h:t.pos_num,i:a||e.__GetCookie&&e.__GetCookie("DedeUserID")||"",j:i||"",k:o._getNowTs(),l:r||t.resource_id||"",m:o._loadTs,n:$.isNumeric(t.server_type)?t.server_type:"",o:t.id||""}]}},_genReqOpsPro:function(t,n,i){var r=this;return{uploads:[{src_id:t.src_id||"",ad_server:t.server?t.server:"bilibili",is_ad:t.is_ad?1:0,area:t.area||"",ad_cb:t.ad_cb||"",event:n||"",is_visible:1,idx:t.pos_num,mid:e.__GetCookie&&e.__GetCookie("DedeUserID"),client_version:i||"",ts:r._getNowTs(),resource_id:t.resource_id&&$.isNumeric(t.resource_id)?t.resource_id:"",load_ts:r._loadTs||"",server_type:$.isNumeric(t.server_type)?t.server_type:"",id:t.id||""}]}},_genReqDataParams:function(e,t,n,i,r){var a=this,o=a._genReqOpsSe(e,t,n,i,r),s=function(e){for(var t=[],n=0,i=e["uploads"].length;n<i;n++){var r=e["uploads"][n],a=[];for(var o in r)a.push(o+"|"+r[o]);t.push(a.join(","))}return t.join("||")};return s(o)||""},_genReqGetOps:function(e,t,n,i){var r=this;return{url:e+"?msg="+encodeURIComponent(r._genReqDataParams(t,n,i))+"&ts="+r._getNowTs(),type:"GET",dataType:"json",xhrFields:{withCredentials:!0},success:function(e){},error:function(e){}}},_genReqPostOps:function(e,t,n,i){var r=this,a=JSON.stringify(r._genReqOpsPro(t,n,i));return{url:e,type:"POST",data:$.browser.msie&&parseInt($.browser.version,10)<=9?{message:a}:a,headers:{"Content-Type":"application/json"},contentType:"application/json",dataType:"json",xhrFields:{withCredentials:!0},success:function(e){},error:function(e){}}},_sendTposReq:function(e){var t=this,n=!!e&&e["show_url"]||"";if(!n)return!1;var i=new Image(1,1);i.onload=i.onerror=function(){i=null},i.src=t._repMacroArgs(n,!!e&&e["request_id"]||"")},_genLogReqOps:function(t){var n=function(e){return e===r?"":"boolean"==typeof e?e?1:0:"number"==typeof e?e?1:0:e?1:0};return{log_name:t["log_name"],page_ref:e.encodeURIComponent(e.location.href),resource_id:t["resource_id"],src_id:t["src_id"]!==r?t["src_id"]:"",is_cm_loc:n(t["is_ad_loc"]),is_cm:n(t["is_ad"]),event:t["event"]!==r?t["event"]:"",ts:t["ts"]}},_colWebAdLog:function(e,t){try{i.adJsonp({url:e,data:t})}catch(n){}},_sendWebLogPv:function(){var t=this,n=e.location,i=n.hostname,r=n.pathname;if("www.bilibili.com"===i){var a={log_name:"pv",ts:t._getNowTs()};if("/"===r||"/index.html"===r)return t._colWebAdLog(t._getWebAdLogUrl(),t._genLogReqOps($.extend({},a,{resource_id:"29"})));if(/^(\/video\/av)/i.test(r))return t._colWebAdLog(t._getWebAdLogUrl(),t._genLogReqOps($.extend({},a,{resource_id:encodeURIComponent([124,126].join(";"))})))}},_showCmReport:function(e){var t=this,n=$.extend({},e.data,{ts:t._getNowTs(),_:parseInt(1e6*Math.random(),10)});i.adPostJSONLite(t._genReqPostOps(t._getFeesUrl(),n,"show",e.version||"")),t._colWebAdLog(t._getWebAdLogUrl(),t._genLogReqOps($.extend({},n,{log_name:"eventlog",event:"show"}))),!!n&&t._sendTposReq(n),t._list.splice(t._list.indexOf(e),1)},_showContentReport:function(e){var t=this,n=$.extend({},e.data,{ts:t._getNowTs(),_:parseInt(1e6*Math.random(),10)});i.adPostJSONLite(t._genReqPostOps(t._getShowContentUrl(),n,"show",e.version||"")),t._list.splice(t._list.indexOf(e),1)},_resetSyncUrlTs:function(e){var t=this,n="",i=/ts=\d{13}/gi,r=$(e),a="a"!==e.tagName.toLowerCase()?$("a",r):r;return!!a.length&&(n=a.attr("href")||null,void(n&&i.test(n)&&a.attr("href",n.replace(i,"ts="+t._getNowTs()))))},_hitCmReport:function(e){var t=this,n=$.extend({},e.data,{ts:t._getNowTs(),_:parseInt(1e6*Math.random(),10)}),r="click_test_3";n&&126===+n["resource_id"]&&(n["url"].indexOf("i8952")>-1&&(r="click_test_async_3"),n["url"].indexOf("i8953")>-1&&(r="click_test_sync_3")),i.adPostJSONLite(t._genReqPostOps(t._getFeesUrl(),n,r,e.version||"")),i.adPostJSONLite(t._genReqPostOps(t._getFeesUrl(),n,"click",e.version||"")),t._colWebAdLog(t._getWebAdLogUrl(),t._genLogReqOps($.extend({},n,{log_name:"eventlog",event:"click"})))},_hitContentReport:function(e){var t=this,n=$.extend({},e.data,{ts:t._getNowTs(),_:parseInt(1e6*Math.random(),10)});i.adPostJSONLite(t._genReqGetOps(t._getClickContentUrl(),n,"click",e.version||""))},_repMacroArgs:function(t,n,i,r){var a=e.__GetCookie||null;return i=i||a&&a("DedeUserID")||"",r=r||a&&a("buvid3")||"",t=t?t.replace("__MID__",i).replace("__BUVID__",r).replace("__REQUESTID__",n):""},_bindEvent:function(){var n=this,i=$(t),r=$(e);i.on("add.BiliCm",function(e,t){n.add(t.elem,t.data)}),i.on("send.BiliCm",function(e,t){n.send(t.event,t.data,t.version)}),r.on("scroll.BiliCm",function(){n._filter()})},_checkHttps:function(e){return e.replace(/^http:\/\//i,"//")},_genSyncParams:function(t,n,i,r){var a=this,o=e.__GetCookie&&e.__GetCookie("DedeUserID")||"";return"msg="+encodeURIComponent(a._genReqDataParams(t,r,i,n,o))+"&ts="+a._getNowTs()},_getSyncUrl:function(e,t,n){var i=this,r=e["url"]||"",a="javascript:void(0);";if(!r)return a;if(!i._checkAd(e))return i._checkHttps(r);try{return i._getFeesSyncUrlv2()+"?"+i._genSyncParams(e,t,n,"click_sync_3")}catch(o){return i._checkHttps(r)}},_send:function(e,t,n){var r=this,a=!e||"show"!==e&&"click"!==e?r._getApiPvUrl():r._getFeesUrl(),o=$.extend({},t,{ts:r._getNowTs(),_:parseInt(1e6*Math.random(),10)});return("click"!==e||!r._checkAd(o))&&(i.adPostJSONLite(r._genReqPostOps(a,o,e,n)),void(e&&r._colWebAdLog(r._getWebAdLogUrl(),r._genLogReqOps($.extend({},o,{log_name:"eventlog",event:e})))))},_filter:function(){var e=this;for(var t in e._list)e._list.hasOwnProperty(t)&&e._watch(e._list[t])},_watch:function(t){var n=this,i=$(e),r=$(t.el),a=t.data,o=t.height=t.height||r.height(),s=t.top=t.top||r.offset()&&r.offset().top,d=i.scrollTop(),c=d+i.height(),l=!!a.server||t.img[0]&&t.img[0].complete;s+Math.floor(o/2)>d&&s+Math.floor(o/2)<c&&l&&(a["is_ad_loc"]?a.focus?a.show&&n._showCmReport(t):n._showCmReport(t):a.focus?a.show&&n._showContentReport(t):n._showContentReport(t))},_add:function(t,n){var r=this,a=n["resource_id"]||$(t).attr("data-loc-id")||$("[data-loc-id]",t).attr("data-loc-id"),o={el:t,locid:a,id:n.id||"",request_id:n.request_id||"",creative_id:n.creative_id||"",src_id:n.src_id||"",data:n?n["resource_id"]?n:$.extend(n,{resource_id:a?+a:""}):null,img:$("img",t)},s=o.id+"|"+o.request_id+"|"+o.creative_id+"|"+o.src_id+"|"+o.locid;try{!n["resource_id"]||23!==+n["resource_id"]&&29!==+n["resource_id"]&&124!==+n["resource_id"]&&126!==+n["resource_id"]||r._colWebAdLog(r._getWebAdLogUrl(),r._genLogReqOps($.extend({},n,{log_name:"apidata",ts:r._getNowTs()}))),n&&n.is_ad_loc&&i.adPostJSONLite(r._genReqPostOps(r._getApiPvUrl(),n,"apidata"))}catch(d){}if(n.is_ad&&n.is_ad_loc||$("img[img-ad]",t).remove(),r._log.indexOf(s)===-1){var c=e.navigator.userAgent.match(/iPad/i)?"touchstart":"click",l=$(t)||null;if(r._log.push(s),r._list.push(o),n.focus&&(n.trigger=function(){r._filter()}),r._checkAd(n))return!1;l&&l.on(c,function(e){n["is_ad_loc"]?(r._resetSyncUrlTs(e.currentTarget),r._hitCmReport(o)):r._hitContentReport(o)})}},_checkedRepeat:function(e){for(var t=this._cached,n=0,i=t.length;n<i;n++)if(t[n]===e)return!0;return!1},_insertFlag:function(e){return this._cached.push(e),!0},_sendApidataData:function(e,t,n){var r=this,a=$.extend({},e,{resource_id:t||"",ts:r._getNowTs(),_:parseInt(1e6*Math.random(),10)});return i.adPostJSONLite(r._genReqPostOps(r._getApiPvUrl(),a,"apidata",n)),!0},_sendShowData:function(e,t,n){var i=this,r=null,a=[e.id,e.request_id,e.creative_id,e.src_id,t||""].join("|");return!i._checkedRepeat(a)&&(r={data:$.extend({},e,{resource_id:t||""}),version:n},e["is_ad_loc"]?i._showCmReport(r):i._showContentReport(r),i._insertFlag(a))},_sendClickData:function(e,t,n){var i=this,r={data:$.extend({},e,{resource_id:t||""}),version:n};return!i._checkAd(e)&&(e["is_ad_loc"]?i._hitCmReport(r):i._hitContentReport(r),!0)},_reset:function(){var e=this;e._list=[],e._log=[],e._cached=[],e._loadTs=i.getNowTs()},_init:function(){var e=this,t=function n(){e._filter(),setTimeout(function(){n()},2e3)};e._sendWebLogPv(),e._bindEvent(),t()}};return{sendApidataData:function(e,t,n){return a._sendApidataData(e,t,n)},sendShowData:function(e,t,n){return a._sendShowData(e,t,n)},sendClickData:function(e,t,n){return a._sendClickData(e,t,n)},send:function(e,t,n){return a._send(e,t,n)},add:function(e,t){return a._add(e,t)},formatCmSyncUrl:function(e,t,n){return this.getSyncUrl(e,t,n)},getSyncUrl:function(e,t,n){return a._getSyncUrl(e,t,n)},init:function(){return a._init()},reset:function(){return a._reset()}}}(jQuery,window,document,n,i)},function(e,exports,t){"use strict";var n=t(1);e.exports=function($,e,t,n){return{getNowTs:function(){return Date.now?Date.now():(new Date).getTime()},adJsonp:function(e){if(e.url){var t={type:"GET",url:e.url,dataType:"jsonp",data:e.data,success:e.success||function(e){},error:e.error||function(e){}};e.callback&&(t.callback=e.callback),this.sendReq(t)}},sendReq:function(t){var i=function(e){e&&!e["timeout"]&&n&&n["CM_AJAX_TIMEOUT"]&&(e["timeout"]=n["CM_AJAX_TIMEOUT"]),$.ajax(e)};try{if(t&&t.data&&t.data.ids&&/124/.test(t.data.ids)){var r=function(t){i({url:n["DATA_BILIBILI_HOSTNAME"]+"/v/web/web_cm_event",dataType:"jsonp",type:"GET",data:{log_name:t["log_name"],page_ref:e.encodeURIComponent(e.location.href),resource_id:"124,126,130",src_id:"125,127,131"},success:function(){},error:function(){}})},a=$.extend({},t,{beforeSend:function(){return r({log_name:"apidata-request-beforeSend"}),!0},success:function(){var e=Array.prototype.slice.call(arguments);r({log_name:"apidata-request-success"}),t.success.apply(t,e)},error:function(){var e=Array.prototype.slice.call(arguments);r({log_name:"apidata-request-error"}),t.error.apply(t,e)},complete:function(){r({log_name:"apidata-request-complete"})}});return r({log_name:"apidata-request-before"}),i(a)}}catch(o){}return i(t)},adPostJSONLite:function(e,t){$.browser.msie&&parseInt($.browser.version)<=9?(e.data.script="script",e.callback=t&&t.callback?t.callback:null,this.adPostJSON(e)):this.sendReq(e)},adPostJSON:function(n){var i=e.location.href||"",r=function(n,i){e.Bilibili&&(e.Bilibili.interface_domain=n),t.domain=i};i.match(/\.bilibili\.tv/)?r("interface.bilibili.tv","bilibili.tv"):i.match(/\.bilibili\.com/)?r("interface.bilibili.com","bilibili.com"):r("interface.bilibili.cn","bilibili.cn");var a=n.callback||"_jsonpCallback_"+(new Date).getTime(),o=$('<iframe name="frm'+a+'" id="frm'+a+'" style="visibility:hidden; width:1px; height:1px"></iframe>').appendTo("body"),s=$('<form action="'+n.url+'" enctype="application/x-www-form-urlencoded" method="POST" target="frm'+a+'"></form>').appendTo("body");"undefined"==typeof n.data&&(n.data={}),n.data[n.jsonpCallback||"callback"]=a;for(var d in n.data)$('<input type="hidden" name="'+d+'" />').appendTo(s).val(n.data[d]);e[a]=function(e){"function"==typeof n.success&&n.success(e),"function"==typeof n.complete&&n.complete(e),o.remove(),s.remove()},s.submit()}}}(jQuery,window,document,n)},function(e,exports,t){"use strict";var n=t(1),i=t(6),r=t(8),a=t(9);e.exports=function($,e,t,n,i,r,a,o){var s=e.BiliCm||{},d={0:[40,42,44],1:[151,152,153],3:[243,245,247],129:[249,251,253],4:[255,257,259],36:[261,263,265],160:[273,275,277],5:[267,269,271],119:[285,287,289],155:[279,281,283]},c={124:["arc",51,".ad-fl",4993155050],126:["arc",46,".ad-fr",6469888252],130:["arc",3,".ad-e1",8033278259]},l={banner:{wide:{width:1160,height:96},thin:{width:980,height:80}},arc:{wide:{".ad-e1":{width:870,height:72},".ad-fl":{width:468,height:60},".ad-fr":{width:468,height:60}},thin:{".ad-e1":{width:690,height:56},".ad-fl":{width:468,height:60},".ad-fr":{width:468,height:60}}}},u={indexAd1:1630,indexAd2:1630,indexAd3:2,indexAd4:3,indexAd5:4,partitionAd1:11,partitionAd2:11,partitionAd3:12,partitionAd4:13,partitionAd5:14,secondPartitionAd1:11,secondPartitionAd2:11,rankAd1:1626,rankAd2:1626,rankAd3:136,rankAd4:138,topicAd1:132,topicAd2:134,topicAd3:1628},_={1:"1578",13:"1614",3:"1582",129:"1586",4:"1590",36:"1594",160:"1602",119:"1610",155:"1606",5:"1598"};return function(){var t=s&&s.Base||{},r={_adCache:{},_getScreenType:function(){return $("body").hasClass("widescreen")?"wide":"thin"},_isWideScreen:function(){return!!$("body").hasClass("widescreen")},_getResLocsUrl:function(){return n["API_BILIBILI_HOSTNAME"]+"/x/web-show/res/locs"},_getKeys:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t},_winSmartSize:function(t){var n=this;$(e).smartresize(function(){$.isFunction(t)&&t.call(n)})},_sendAdData:function(e,n){return t&&$.isFunction(t.add)&&t.add(e,n)},_newAdAjaxs:function(e,t,n){for(var r=this,a=[],o=0,s=e.length;o<s;o++)a.push(e[o]);return i.adJsonp({url:r._getResLocsUrl(),data:{pf:0,ids:a.sort(function(){return 1}).join(","),jsonp:"jsonp"},success:function(i,a,o){i&&0===i.code?!!t&&$.isFunction(t)&&t.call(r,i,n):r._errorHandle(e,1)},error:function(t,n,i){r._errorHandle(e,2)}})},_createBannerAd:function(e){var t=$('<span style="display: none; overflow: hidden; border-radius: 5px; position: relative;"><a target="_blank"><img style="width: 100%; height: 100%;" /><img img-ad src="'+n["BASE_AD_IMG"]+'" style="width:32px;height:20px;position:absolute;left:2px;bottom:2px;" /></a></span>'),i=t.find("a"),r=t.find("a img:eq(0)");return t.attr({"data-loc-id":e||"","data-ad-type":"banner"}),{bannerWrp:t,bannerLink:i,bannerImg:r}},_resetBannerSize:function(e,t){var n=this,i={display:"block"},r=n._adCache,a=e["banner"][n._getScreenType()],o=function(e){return!!e&&(e.bannerLink.data("target-url")?e.bannerWrp.css($.extend({width:a["width"],height:a["height"],visibility:"visible"},t||{},i)):e.bannerWrp.css($.extend({width:a["width"],height:"1px",margin:"0 auto",visibility:"hidden"},i)),void e.bannerWrp.show())};for(var s in r)o(r[s])},_createBannerTpl:function(e,t){for(var n=this,i=n._adCache||(n._adCache={}),r=0,a=e.length;r<a;r++){var o=n._createBannerAd(e[r]||"");t&&o.bannerWrp.css(t),i["bannerAd_"+e[r]]=o}},_mainBannerRender:function(t,n,i){var r=this,a=e.localStorage||null,o=a&&a.getItem("killSideBarAd");if(parseInt(o)+864e5>(new Date).getTime())return!1;var s=r["_adCache"]["bannerAd_"+(n||t["resource_id"])]||null;return!!s&&(s["bannerLink"].css({display:"block"}).attr({"data-target-url":t.url||"",href:t.url?i&&$.isFunction(i.getSyncUrl)?i.getSyncUrl(t,n||t["resource_id"]):t.url:"javascript: void(0);"}),s["bannerImg"].attr({src:t.pic||t.litpic||""}),s["bannerWrp"].attr({"data-id":t.id,"data-name":t.name||""}).show(),s["bannerWrp"])},_mainSuccessHandle:function(e,t){var n=this,i=e.data||{};for(var r in i){var a=i[r]&&i[r][0];if(a)if(a){var o=$.extend(a,{loc_id:+r,resource_id:+r}),s=n._mainBannerRender(o,r,t)||null;s&&n._sendAdData(s,o)}else n._errorHandle([r],0)}},_errorHandle:function(e,t){for(var n=this,i=$(document),r=0,a=e.lenth;r<a;r++){var o=n["_adCache"]["bannerAd_"+e[r]]||null;o&&o["bannerWrp"]&&o["bannerWrp"].attr({"data-error-type":t}),i.trigger("adLoadError",{"data-loc-id":e[r],"data-error-type":t})}},_vedioSuccessHandle:function(e,t,i){var r=this,a=e.data,o=function(e,t,i,a,o){try{var s=t[0],d=t[1],c=t[2],l=$(c);if(l.html(""),i["is_ad_loc"]&&1!==i.area)return i.server="google",l.css({"text-align":"center",display:"block"}).html('<script async src="'+n["GOOGLE_AD_JS_URL"]+'"></script><ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="ca-pub-7192215716035284" data-ad-slot="'+t[3]+'"></ins> <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>').show(),!0;if($(c+" #a_ds_"+d).remove(),"img"===a){var u=i["url"]?o&&$.isFunction(o.getSyncUrl)?o.getSyncUrl(i,e):i["url"]:"javascript: void(0);";126===+e&&i["url"].indexOf("i8952")>-1&&(u=i["url"]);var _=['<a id="a_ds_'+d+'" data-id="'+(i["id"]||"")+'" data-loc-id="'+(e||"")+'" href="'+u+'" data-target-url="'+(i["url"]||"")+'" target="_blank" style="display: block; position: relative;">','<img src="'+i["pic"]+'" border="0" />',"</a>"];i.is_ad_loc&&i.is_ad&&_.splice(-1,0,'<img img-ad src="'+n["BASE_AD_IMG"]+'" style="width:32px;height:20px;position:absolute;left:2px;bottom:2px;">'),l.html(_.join("")),r._sendAdData(l.find("a[data-loc-id]"),i)}else l.html('<embed id="a_ds_'+d+'" wmode="opaque" pluginspage="'+n["ADOBE_SHOCKWAVE_URL"]+'" allowscriptaccess="none" rel="noreferrer" src="'+(isWide?i["pic"]:i["pic"])+'" type="application/x-shockwave-flash" allowfullscreen="true" quality="high">');l.attr({"b-stat":s+c,"b-stat-v":i["url"]||""}).css({overflow:"hidden",position:"relative",height:i["url"]?"auto":"1px",visibility:i["url"]?"visible":"hidden"}),l.show()}catch(f){}};if($.isPlainObject(a))for(var s in a)if(a.hasOwnProperty(s)){var d=t[s]||null,c=a[s]&&a[s][0]||null;d&&c&&o(s,d,c,"img",i)}},_resetVedioBanner:function(e,t){var n=this;for(var i in e){var r=e[i],a=r[2],o=t[r[0]][n._getScreenType()][a],s=$(a).find("a[data-loc-id]");s.data("target-url")?s.find("img").attr({width:o["width"],height:o["height"]}):s.find("img").attr({width:o["width"],height:1})}},_bindEvent:function(){$(e).on("onNavigatorChange",function(){})},_genBanner:function(e){var t=this,n=e.ids||[],i=e.callback||function(){},r=$.extend(e.initStyle||{},{overflow:"hidden"}),a=e.adsSize||a,o=e.resize||!0,s=e.cmBase||{};t._createBannerTpl(n,r),t._newAdAjaxs(n,function(e){t._mainSuccessHandle(e,s),$.isFunction(i)&&i.call(t,t["_adCache"]),o&&t._resetBannerSize(a,r)}),o&&t._winSmartSize(function(){t._resetBannerSize(a,r)})},_init:function(r,o,s,d,c){var l=this,u=[],_=e.location,f=_.pathname,p=_.hostname,h=/^\/video\/(douga|music|dance|game|technology|life|ent|kichiku|fashion)\.html$/,g=/^\/video\/av/gi,m=/^\/video\//i,v=/^\/topic\/[^i]/,b=/^(\/blackboard\/)/i,w=/^(\/video\/av)/i,y=$(".header .num .m-i.on").attr("data-tid"),x=$("#home-app"),S=$("#channel-app"),A={adsSize:c,resize:!0,cmBase:t};if(o.partitionAd1=o.partitionAd2=s[y],l._bindEvent(),p===n["MAIN_HOSTNAME"])if("/"===f||"/index.html"===f){if(x.length)return!1;u=[r[0][0],r[0][1],r[0][2]];var O=[{idx:0,locId:u[0]},{idx:2,locId:u[1]},{idx:4,locId:u[2]}],C=null,I=null,T=[500,500,500,1e3,1e3,1e3,2e3,2e3,2e3,3e3,5e3,8e3,1e4,1e4,1e4],k=function(e,t,n){for(var i=0,r=n.length;i<r;i++)e.eq(n[i]["idx"]).after(t["bannerAd_"+n[i]["locId"]]["bannerWrp"])},L=function N(){var t,n,r=$(".container-row").not("#b_tag_promote");try{n=e.indexNav&&e.indexNav.localDataName?e.indexNav.localDataName:"index_user_setting",t=e.ChatGetSettings&&$.isFunction(e.ChatGetSettings)?JSON.parse(e.ChatGetSettings(n)||"{}"):null}catch(a){t=null}if(C&&r.length>=5&&(e.biliLoginStatus&&!e.biliLoginStatus.isLogin||e.biliLoginStatus&&e.biliLoginStatus.isLogin&&t&&t.expires>i.getNowTs()))return k(r,C,O);var o=T.shift()||null;o&&(clearTimeout(I),I=setTimeout(function(){N()},o))};A["ids"]=u,A["initStyle"]={margin:"0 auto 10px",position:"relative",top:"-10px"},A["callback"]=function(e){C=$.extend({},e)},l._genBanner(A),L()}else if(h.test(f)&&r[e.tid]){if(S.length)return!1;u=[r[e.tid][0],r[e.tid][1],r[e.tid][2]];var O=[{idx:0,locId:u[0]},{idx:2,locId:u[1]},{idx:4,locId:u[2]}];A["ids"]=u,A["initStyle"]={margin:"0 auto 10px",position:"relative",top:"-10px"},A["callback"]=function(e){setTimeout(function(){for(var t=$(".container-top-wrapper"),n=$(".container-row").not("#b_tag_promote"),i=0,r=O.length;i<r;i++){var a=e["bannerAd_"+O[i]["locId"]]["bannerWrp"];0===i?t.after(a):1===i?n.eq(O[i]["idx"]).after(a):2===i&&(n.length-1>3?n.eq(O[i]["idx"]).after(a):n.last().after(a))}},0)},l._genBanner(A)}else{if(!h.test(f)&&!g.test(f)&&m.test(f))return!1;if("/ranking"===f||"/ranking_beta"===f){u=[o.rankAd3,o.rankAd4];var O=[{idx:0,locId:u[0]},{idx:0,locId:u[1]}];A["ids"]=u,A["initStyle"]={margin:"20px auto"},A["callback"]=function(e){setTimeout(function(){for(var t=$("body > .b-page-body"),n=O.length-1;n>=0;n--)t.eq(0).after(e["bannerAd_"+O[n]["locId"]]["bannerWrp"])},0)},l._genBanner(A)}else if(v.test(f)){u=[o.topicAd1,o.topicAd2];var O=[{idx:0,locId:u[0]},{idx:0,locId:u[1]}];A["ids"]=u,A["initStyle"]={margin:"20px auto"},A["resize"]=!1,A["callback"]=function(e,t){setTimeout(function(){for(var t=$("body > .b-page-body"),n=O.length-1;n>=0;n--)t.eq(0).after(e["bannerAd_"+O[n]["locId"]]["bannerWrp"])},0)},l._genBanner(A)}else if(b.test(f)&&"1"===e.__pageType){u=[o.topicAd1,o.topicAd2];var O=[{idx:0,locId:u[0]},{idx:0,locId:u[1]}];A["ids"]=u,A["initStyle"]={margin:"20px auto"},A["resize"]=!1,A["callback"]=function(e,t){setTimeout(function(){for(var t=$("body .box-body"),n=O.length-1;n>=0;n--)t.eq(0).after(e["bannerAd_"+O[n]["locId"]]["bannerWrp"])},0)},l._genBanner(A)}else if(w.test(f))return u=l._getKeys(d),l._newAdAjaxs(u,function(e){l._vedioSuccessHandle(e,d,t),l._resetVedioBanner(d,c)}),l._winSmartSize(function(){l._resetVedioBanner(d,c)}),!0}else p===n["PGC_HOSTNAME"]&&a.mainAd(t)},_reset:function(e,n,i,r,a){var o=this;t.reset(),o._init(e,n,i,r,a)}};return{init:function(){return r._init(d,u,_,c,l)},reset:function(){return r._reset(d,u,_,c,l)}}}()}(jQuery,window,document,n,i,r,a)},function(e,exports){"use strict";e.exports=function(e,t){return{isWebp:function(){try{return 0==t.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}catch(e){return!1}}(),setSrc:function(e){var t=this._urlFormat(e);e=t?t:e;var n="",i=e.match(/_(\d+)x(\d+)./),r=e.indexOf("/bfs/")!=-1,a=e.indexOf(".gif")!=-1,o=e.indexOf(".webp")!=-1;return!this.isWebp||!r||a||o?e.replace(/^http:/i,""):(n=null===i?e+"@.webp":e.substring(0,e.lastIndexOf("_"))+"@"+i[1]+"w_"+i[2]+"h.webp",n.replace(/^http:/i,""))},_urlFormat:function(t){var n=/\/\d+?_\d+?\/bfs/,i=t.replace(n,"/bfs"),r=e.RegExp;if(!n.test(t))return!1;var a=/\/(\d+?)_(\d+?)\/bfs\/\w+?\/.+?(\.\w{3,4})/;a.exec(t);return i+"_"+r.$1+"x"+r.$2+r.$3}}}(window,document)},function(e,exports,t){"use strict";function n(e,t){var n=m["home"][b()]||{},i={display:"block"};t?e.css($.extend({width:n["width"],height:n["height"],margin:"0px auto 50px",visibility:"visible"},i)):e.css($.extend({width:n["width"],height:"1px",margin:"0px auto",visibility:"hidden"},i))}function i(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}function r(e,t,n){e=e.data||e,t=t||e["resource_id"]||"";var i=e["url"]||"",r=i?n&&$.isFunction(n.getSyncUrl)?n.getSyncUrl(e,t):i:"javascript: void(0);";return'<a data-name="'+e.name+'" href="'+r+'" data-target-url="'+i+'" target="_blank" style="display:block; position:relative;" rel="nofollow">'+(e.is_ad_loc&&e.is_ad?'<img src="'+_["BASE_AD_IMG"]+'" style="width:32px;height:20px;margin-right:5px;position:absolute;bottom:2px;left:2px;" />':"")+'<img src="'+(e.pic||"")+'" alt="'+e.name+'" style="width:100%;height:100%;" /></a>'}function a(e,t){if(e&&!h[e.request_id+e.src_id+e.creative_id]&&($.isFunction(t.send)&&(h[e.request_id+e.src_id+e.creative_id]=e,t.send("show",e)),e.show_url)){var n=new Image(1,1);n.onload=n.onerror=function(){n=null},n.src=e.show_url}}function o(e,t){e&&$.isFunction(t.send)&&t.send("click",e)}function s(e){clearTimeout(p),p=setTimeout(function(){$("div[data-loc-id], span[data-loc-id]").each(function(t,n){var i=$(n),r=$(window),o=$(n).data("loc-id"),s=window.adDatasLoc[o],d=i.height(),c=i.offset().top>0?i.offset().top:n.offsetTop,l=r.scrollTop(),u=l+r.height();c>l-d/2&&c+d/2<u&&a(s,e)})},0)}function d(e,t){f.adJsonp({url:_["API_BILIBILI_HOSTNAME"]+"/x/web-show/res/locs",data:{pf:0,ids:e&&e.idObj||"",jsonp:"jsonp"},success:function(n){0!==n.code||i(n.data)||t(n.data,e)},error:function(){return!1}})}function c(e,t){var i=t.cmBase||{};m["home"][b()];for(var a in e){var o=e[a]&&e[a][0]||null,d=null;if(o){if(o["resource_id"]=parseInt(a,10),window.adDatasLoc[a]=o,d=$("div[data-loc-id="+a+"]"),d.length||(d=$("span[data-loc-id="+a+"]")),!d.length)return!1;d.css({overflow:"hidden","border-radius":"5px",position:"relative"}).attr({"data-id":o.id}).html(r({data:o,type:window.tid||23},parseInt(a,10),i)),n(d,!!o.url),d.show();try{o.is_ad_loc&&i&&$.isFunction(i.send)&&i.send("",o)}catch(c){}}}s(i)}function l(e,t){var n=t.cmBase||{};m["play"]["f-wide"],m["play"]["e-wide"];for(var i in e){var a=e[i][0],o=null;if(a){if(a["resource_id"]=parseInt(i,10),window.adDatasLoc[i]=a,o=$("div[data-loc-id="+i+"]"),o.length||(o=$("span[data-loc-id="+i+"]")),!o.length)return!1;o.css({overflow:"hidden"}).attr({"data-id":a.id}).html(r({data:a,type:""},parseInt(i,10),n)),a.url||o.css({height:"1px"}),o.show();try{a.is_ad_loc&&n&&$.isFunction(n.send)&&n.send("",a)}catch(d){}}}s(n)}function u(e){e=e||window.BiliCm&&window.BiliCm.Base||{};var t=window.tid,i=null,r=$(window),a=window.location.pathname,u=["13","23","11","167"];if(u.indexOf(t)>-1)i=g[t],i&&d({idObj:i,cmBase:e},c);else if(/^\/33\//.test(a))i=g["bm"],i&&d({idObj:i,cmBase:e},c);else{var _=$(".movie_head");if(_&&_.length&&_.attr("style"))return!1;try{var f=a.substr(1).split("/")[0];"anime"!==f&&"movie"!==f||($(".ad-fl").length||$(".ad-fr").length||$(".ad-e1").length)&&(i=g[f],i&&d({idObj:i,cmBase:e},l))}catch(p){}}r.resize(function(t){var i=$("body").hasClass("widescreen"),r=$("div[data-loc-id]").length?$("div[data-loc-id]"):$("span[data-loc-id]"),a=$(".couplet"),o=$(window).width(),d=(o-1160)/2-118-20,c=(o+1160)/2+20,l=(o-980)/2-118-20,u=(o+980)/2+20,_=r.not(".topic-preview-wrapper,.couplet,.ad-fl,.ad-fr,.ad-e1");$.each(_,function(e,t){n($(t),!!$(t).find("a[data-target-url]").data("target-url"))}),i?(a.eq(0).css("left",d+"px"),a.eq(1).css("left",c+"px")):(a.eq(0).css("left",l+"px"),a.eq(1).css("left",u+"px")),s(e)}),r.on("scroll",function(){s(e)}),$(document).on("click","li[data-loc-id], div[data-loc-id], span[data-loc-id]",function(t){var n=$(this).data("loc-id"),i=window.adDatasLoc[n];o($.extend({},window.adDatasLoc[n],{src_id:v[n],resource_id:i&&i["resource_id"]?i["resource_id"]:n}),e)})}var _=t(1),f=t(6),p=(t(8),null),h={},g={13:"291,293,295",23:"405,412,417",11:"406,413,418",bm:"403,414,415",167:"1923,1922,1921",anime:"124,126,130",movie:"124,126,130"},m={home:{wide:{width:1160,height:96},thin:{width:980,height:80}},play:{"f-wide":{width:468,height:60},"e-wide":{width:870,height:72}}},v={395:"397",118:"120",112:"114",106:"108"};window.adDatasLoc=window.adDatasLoc||{};var b=function(){return $("body").hasClass("widescreen")?"wide":"thin"};e.exports.mainAd=function(e){
return $(function(){u(e)}),!0}}]);