<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
use app\index\controller\Index;
use app\index\model\Video;
use app\index\model\Tag;


class Movie extends Controller
{
	public function index()
	{
		$data = Db::table('danmu_type')->select();
        $list = Index::getTree($data);
        $this->assign('data',$list);
		 return $this->fetch();
	}


	public function eur_miv()
	{
		$data = Db::table('danmu_type')->select();
        $list = Index::getTree($data);
        $this->assign('data',$list);
		return $this->fetch();
	}

	public function jp_miv()
	{
		$data = Db::table('danmu_type')->select();
        $list = Index::getTree($data);
        $this->assign('data',$list);
		return $this->fetch();
	}

	public function cn_miv()
	{
		$data = Db::table('danmu_type')->select();
        $list = Index::getTree($data);
        $this->assign('data',$list);
		return $this->fetch();
	}

	public function getTag()
	{
		$tid = input('post.tid');
		$tag = Video::alias('v')->where('tid',$tid)->join('danmu_tag t','t.vid=v.vid')->field('tagname')->select();
		// $tag = array_flip(array_flip($tag));
		$tag = array_unique($tag);
		$tag = array_values($tag);
		return json($tag);
	}

	public function getElemnt()
	{
		$tagname = input('post.tagname');
		if($tagname)
		{
			$video = Tag::alias('t')->where('tagname',$tagname)->join('danmu_video v','t.vid=v.vid')->select();
			$video = array_unique($video);
			$video = array_values($video);
		}else
		{
			$tid = input('post.tid');
			$video = Video::where('tid',$tid)->limit(0,4)->select();
		}
		return json(['video'=>$video]); 
	}

	public function getAll()
	{
		$tid = input('post.tid');
		$video = Video::where('tid',$tid)->limit(0,20)->select();
		return json($video);
	}
}