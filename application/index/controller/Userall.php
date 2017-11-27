<?php

namespace app\index\controller;
use think\Controller;
use app\index\model\User;
use think\Session;
use app\index\controller\Base;
use app\index\model\Sign;
use think\Db;
class Userall extends Base
{
	public function user_info()
	{
		return $this->fetch();
	}

	/*
	*上传头像页面
	*/
	public function upload_head()
	{
		return $this->fetch();
	}


	/*
	*跟新头像
	*/
	public function doupload()
	{
		$file = request()->file('image');// 移动到框架应用根目录/public/uploads/ 目录下
		$info = $file->rule('date')->move(ROOT_PATH . 'public' . DS . 'uploads'. DS . 'imgs');
		$id = session('user.id');
		if($info)
		{
			$result = User::where("id",$id)->update(['img'=>str_replace("\\", "/", '/uploads/imgs/'.$info->getSaveName())]);
			Session::set('user.img',str_replace("\\", "/", '/uploads/imgs/'.$info->getSaveName()));
			$this->redirect('index/userall/upload_head');
		}
	}
	
	/*
	*设置用户资料
	*/
	public function set_user()
	{
		$id = session('user.id');
		$data = User::where("id",$id)->find()->toArray();
		$this->assign('data', $data);
		return $this->fetch();
	}

	/*
	*do设置用户资料
	*/
	public function doset()
	{
		$id = session('user.id');
		$data = ['sex'=>input('post.sex'),'birthday'=>input('post.birthday'),'place'=>input('post.place'),'nickname'=>input('post.nickname'),'blood'=>input('post.blood'),'marry'=>input('post.marry')];
		session('user.nickname',input('post.nickname'));
		$result = User::where("id",$id)->update($data);
	}


	/**
	*用户签到表
	*
	*/
	public function usersign()
	{
		$id = session('user.id');
		$data  = User::alias('u')->join('danmu_sign s','u.id=s.user_id')->where('user_id',$id)->field('signDay')->select();
		return json(["day"=>$data]);
	}


	/**
     * 用户签到情况
     * 
     * @param id
     * @param signDay
     */

	public function sign()
	{	
		$id = session('user.id');
		$flag = User::where('id',$id)->field('lasttime,is_sign')->find();
		$time = strtotime(date("Y-m-d"));
		if($flag['lasttime'] < $time)
		{
			if($flag['is_sign'])
			{
				User::where('id',$id)->update(['is_sign'=>0]);
				User::where('id',$id)->update(['lasttime'=>time()]);
			}
			return json(["status"=>1]);
		}else if($flag['is_sign'] == 0)
		{
			return json(["status"=>1]);
		}else
		{
			return json(["status"=>0]);
		}
	}

	 /**
     * 异步签到
     * 
     * @param id
     * @param signDay
     */

	public function dosign()
	{
		$id = session('user.id');
		User::where('id',$id)->update(['is_sign'=>1]);
		$signDay = input('post.day');
		$data = ['user_id'=>$id,'signDay'=>$signDay];
		Sign::insert($data);
	}


	public function member()
	{
		return $this->fetch();
	}

	/*
	*会员支付事务
	*
	* @param paysum
	* @param id
	*/
	public function paymember()
	{
		$paysum = input('post.sum');
		$id = session('user.id');
		Db::startTrans();
		try{
			$arr = User::where('id',$id)->field('balance')->find();
			$balance = $arr['balance'];
			if($balance < $paysum)
			{
				DB::rollback();
				return json(['status'=>0,'msg'=>'支付失败,余额不足']);
			}
				User::where('id',$id)->update(['is_member'=>1]);
				User::where('id',$id)->setDec('balance',$paysum);
				Db::commit();
				session('user.is_member',1);
				return json(['status'=>1,'msg'=>'支付成功']);
			}catch (\Exception $e) {
				// 回滚事务
				Db::rollback();
				return json(['status'=>0,'msg'=>'支付失败,系统错误']);
			}
	}
}