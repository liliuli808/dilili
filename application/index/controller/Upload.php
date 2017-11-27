<?php

namespace app\index\controller;
use think\Controller;
use app\index\model\Video;
use think\Db;
use app\index\model\Recomend;
use app\index\controller\Base;

class Upload extends Base
{
	public function upload_vid()
	{
        return $this->fetch();
	}

	public function doupload()
	{
		$path = ROOT_PATH .  'public' ;

		if(session('file_path'))
		{
			$path = session('file_path');
		}else
		{
			$path = ROOT_PATH .  'public' .DS .'uploads'. DS . 'vodio'. DS .date('Ymd'). DS .uniqid();
			//$file_path =  DS .'uploads'. DS . 'vodio'. DS .date('Ymd'). DS .uniqid() . DS . $_FILES['file']['name'];
			session('file_path',$path);
		} 
		if(!file_exists($path))
		{
			mkdir($path,0777,true);
		}
		$real_path = $path . DS . uniqid() . $_FILES['file']['name'];
		$pos = strpos($real_path,'uploads');
		$file_path = DS .substr($real_path, $pos);
		$real_path = str_replace('\\', '/', $real_path);
		$file_path = str_replace('\\', '/', $file_path);
		echo $file_path;
		$type = ['video/mp4','video/mkv','video/avi'];

		$imgtype = ['image/jpeg','image/png','image/bmp'];
		if(in_array($_FILES['file']['type'], $type))
		{
			if(move_uploaded_file($_FILES["file"]["tmp_name"], $real_path)){
				
				session('vid_path',$file_path);
			}
		}else if(in_array($_FILES['file']['type'], $imgtype))
		{
			if(move_uploaded_file($_FILES["file"]["tmp_name"], $real_path)){
				
				session('img_path',$file_path);
			}
		}else
		{
			return json(['msg'=>0]);
		}

	}

	public function showtype()
	{
		$cid = input('post.pid');
		session('pid',$cid);
		$cate = Db::table('danmu_type')->select();
		$arr = self::forparent($cate,$cid);
		arsort($arr);
		return json(['data'=>join('-->',$arr)]);
	}

	public  function forparent($cate,$cid){
			$arr = array();
			foreach ($cate as $k => $v) {
				if($v['id'] == $cid)
				{
					$arr[] = $v['name'];
					$arr = array_merge($arr,self::forparent($cate,$v['pid']));
				}
			}
			return $arr;
	}


	public function uploaddb()
	{
		$src = session('vid_path');
		$data = ['src'=>$src,'title'=>input('post.title'),'authid'=>session('user.id'),'tid'=>session('pid'),'img_src'=>session('img_path')];
		$result = Video::insert($data);
		if($result)
		{
			session('file_path',null);
			session('file_path',null);
			return json(['status'=>1]);
		}else
		{
			return json(['status'=>0]);
		}
	}
	
	
}
