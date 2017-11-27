/**
 * 封装ajax的函数
 */

function ajax(obj) { //json {'method':'get/post' , url:'www.baidu.com' ,async:'true' , data:{username:likun,password=123456},success:function(data){打印data}}
    //初使化对象
    var xhr = (function() {
        //让这个函数来实现对象的初使化
        if (typeof(XMLHttpRequest) != 'undefined') {
            //高级浏览器，支持XMLHttpRequest
            return new XMLHttpRequest();
        } else if (typeof(ActiveXObject) != 'undefined') {
            //傻逼浏览器
            var version = ['Microsoft.XMLHTTP', 'MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];

            for (var i = 0; i < version.length; i++) {
                try {
                    return new ActiveXObject(version[i]);
                } catch (e) {
                    //跳过，啥都不处理
                }
            }
        } else {
            throw new Error('浏览器不支持AJAX');
        }
    })();


    //url,避免有些浏览器会缓存URL信息，第一次请求一个地址。第二次请求同样一个地址时
    //不请求，所以我认为为它加上一个随机数，这样就不会出现第二次请求URL地址也相同的情况了
    obj.url = obj.url + '?rand=' + Math.random();


    //处理请求数据,避免数据污染，让每一块相互不影响
    //{username:'likun',password:'123456'}
    //username=likun&password=123456
    obj.data = (function(data) { // usernanme password
        //创建一个数组对象，待会儿这个数组对象来保存数据
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }

        return arr.join('&');
    })(obj.data);


    //方法判断是get还是post
    //如果存在? 则可能前面的url中有参数 index.php?page=1，则需要在index.php?page=1&username=123
    //如果不存在？则拼接?username=123
    if (obj.method === 'get') {
        if (obj.url.indexOf('?') == -1) {
            obj.url += '?' + obj.data
        } else {
            obj.url += '&' + obj.data;
        }
    }

    //异步
    if (obj.async === true) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback();
            }
        };
    }

    //打开xhr.open
    xhr.open(obj.method, obj.url, obj.async);

    if (obj.method === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);
    } else {
        xhr.send(null);
    }

    //同步处理的时候调callback
    if (obj.async === false) {
		
        callback();
		
    }

    //回调方法来处理回调
    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText);
        } else {
            alert('获取数据失败，状态码为' + xhr.status);
        }
    }
}


