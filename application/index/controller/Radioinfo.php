<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\Danmu;
use app\index\model\Video;
use app\index\model\User;
use app\index\model\Type;
use app\index\controller\Base;
class Radioinfo extends Base
{

	public function show()
	{
		$vid = $_GET['id'];
		Video::where('vid', $vid)->setInc('count');
		$data = Video::alias('v')->where('vid', $vid)->join('danmu_user u','u.id=v.authid')->select();
		$count = Danmu::where('video_id',$vid)->count('id');
		$this->assign('count',$count);
		$this->assign('data',$data[0]);
		$this->assign('id',$vid);
		return $this->fetch();
	}

	public function query()
	{
		$vid = $_GET['id'];
		$data = Danmu::where('video_id',$vid)->field('text,color,size,position,time')->select();
		$str = '[';	
		foreach ($data as $value) {
		$str .= "'".json_encode($value)."',";
			}
		$str = rtrim($str,',');
		$str .= ']';
		echo $str;
	}

	public function stone()
	{
		$danmu = input('post.danmu');
		$arr = json_decode($danmu,true);
		$arr['video_id'] = $_GET['id'];
		$result = Danmu::insert($arr);
		echo $result;
	}

	 public function fatherTree($arr,$id) {  
        static $Tree = array();  
        foreach($arr as $k=>$v) {   
            if($v['id'] == $id) {  
                $this->fatherTree($arr,$v['pid']);  
                $Tree[] = $v;             
            }  
        } 
        return $Tree;  
      }

      public function navidata()
      {
      	$vid = input('post.vid');
      	$data = Video::where('vid',$vid)->select();
      	$tid = $data[0]['tid'];
		$data = Type::select();
		$arr = $this->fatherTree($data,$tid);
		//array_flip($arr);
		$arr = array_reverse($arr);
		return json(['navidata'=>$arr]);
      }

}