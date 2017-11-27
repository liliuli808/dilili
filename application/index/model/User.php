<?php
namespace app\index\model;
use think\Model;

class User extends Model
{

	public function video()
	{
		return $this->hasMany('Video','authid','id');
	}
}