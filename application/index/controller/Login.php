<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use think\Validate;
use app\index\model\User;
use qqlogin\qqconnect\QC;
class Login extends Controller
{

	public function index()
	{
		return $this->fetch();
	}

	//第三方
	public function oauth()
	{
		$qc = new QC();
        return redirect($qc->qq_login());
	}


	public function callback()
	{
		$qc = new QC();
        $access_token = $qc->qq_callback();    // access_token
        $openid =  $qc->get_openid();     // openidmd
        
        $qc = new QC($access_token,$openid);
        $re = $qc->get_user_info();
        $res = User::where('openid',$openid)->find();
       	if(!$res){
       		$data = ['username' => 'qq'.$openid,'password' => 'qq'.$openid,'openid'=>$openid,'nickname'=>$re['nickname'],'img'=>$re['figureurl_qq_1']];
       		$id = User::insertGetId($data);
       		session('user',$data);
       	}else
       	{
       		session('user' ,$res);
       	}
       	$data = session('user');
       	$value = serialize($data);            
		setcookie('login', $value,time()+60*60*24*30,'/');
		$this->redirect('http://www.bb.com/');
	}
	//登录验证
	public function dologin()
	{
		//提交的信息
		//dump(input('post.zidong'));die;

		//自动登录
		// $zidong=0;
		// $zidong=input('post.zidong');
		// if()
		//验证码
		$verify=input('post.verify');
		//检测验证码
		 // if(!captcha_check($verify)){
			// 	return '验证失败';
		 // };
		 //验证用户
		  $info=User::where(['username'=>input('post.username'),'password'=>md5(input('post.password'))])->find();
		  //dump($info);
		  if($info){
		  		//验证成功存入session
		  		$arr = $info->toArray();
		  		session('user' ,$arr);
		  		//echo '登录成功'
		  		if(input('post.zidonglogin') == 1){
		  			$value = serialize($info->toArray());            
			        setcookie('login', $value,time()+60*60*24*30,'/');
		  		}
		  		
		  		return json(['status'=>1 , 'msg' => $info->toArray() , 'redirect_url' => url('/')]);
		  		 
		  }else{

		  	return json(['status'=>0 , 'msg' => '登录失败' , 'redirect_url' => url('index/index/index')]);
		  		// $json=['status'=>1 , 'msg' => '登录成功' , 'redirect_url' => url('index/index/index')];
		  		//  echo json_encode($json);
		  }
	}

	//退出登录
	public function loginOut()
	{
		session('user',null);
		cookie('login', null);
	}
	
}