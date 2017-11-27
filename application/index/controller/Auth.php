<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\User;
use yzm\Ucpaas;

class Auth extends Controller
{
	public function register()
	{
			return $this->fetch();
	}

	public function check_user()
	{
		$result = User::where('username',input('post.username'))->select();
		if($result)
		{
			return json(['status'=>1 ]);
		}else
		{
			return json(['status'=> 0]);
		}
	}


	public function docode()
	{
		$get = input('post.telnum');
		//dump($get);die;
		$options['accountsid']='78a7d4a4f321235d9050a06e6f8b82fe'; 
        $options['token']='f39050a03a25570cb7542ec462605212'; 
        //初始化 
        $ucpass = new Ucpaas($options);
                //随机生成4位验证码
		$authnum = '';
        srand((double)microtime()*1000000);
        for($i=0;$i<4;$i++){
        $randnum=rand(0,9); // 10+26;
        $authnum.=$randnum;
        }
        //短信验证码（模板短信）,默认以65个汉字（同65个英文）为一条（可容纳字数受您应用名称占用字符影响），超过长度短信平台将会自动分割为多条发送。分割后的多条短信将按照具体占用条数计费。
        $appId = "5996001b4d89485da54e1d093cad1e5e";  
        $to = $get;
        $templateId = "134239";
        $param=$authnum;
        $ucpass->templateSMS($appId,$to,$templateId,$param);
        setcookie('yzm', $param, time()+6000);
	}

	public function doregister()
	{
		if(isset($_COOKIE["yzm"]))
		{
			$yzm = $_COOKIE["yzm"];
		}
		if(input('post.yzm') != '1234')
		{
			return json(['status'=>0 , 'msg' => '验证码错误']);
		}
		$data = [
			'username' => input('post.username'),
			'password' => md5(input('post.password')),
			'tel' => input('post.tel'),
			'nickname'=>input('post,username')
		];
		$result = User::create($data);

			if ($result) {
				session('user',$result);
				return json(['status'=>1 , 'msg' => '注册成功' , 'redirect_url' => url('index/index/index')]);
			} else {
				return json(['status'=>0 , 'msg' => '注册失败']);
			}
		}
	}
