<?php
namespace app\index\model;
use think\Model;

class Video extends Model
{
	public function danmu()
	{
		return $this->hasMany('Danmu','video_id','vid');
	}

	public function tag()
	{
		return $this->hasMany('Tag','vid','vid');
	}
}
