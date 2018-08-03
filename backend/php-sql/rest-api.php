<?php

/**
 * @author Banksy Kit <thangbkits@gmail.com>
 * @copyright KIT Tech 2018
 * @package banksykit
 * 
 * 
 * Created using Ionic App Builder
 * http://codecanyon.net/item/ionic-mobile-app-builder/15716727
 */


/** CONFIG:START **/
$config["host"] 		= "localhost" ; 		//host
$config["user"] 		= "root" ; 		//Username SQL
$config["pass"] 		= "" ; 		//Password SQL
$config["dbase"] 		= "db_banksykit" ; 		//Database
$config["utf8"] 		= true ; 		//turkish charset set false
$config["timezone"] 		= "Asia/Jakarta" ; 		// check this site: http://php.net/manual/en/timezones.php
$config["abs_url_images"] 		= "http://domain.com/apps/banksykit//media/image/" ; 		//Absolute Images URL
$config["abs_url_videos"] 		= "http://domain.com/apps/banksykit//media/media/" ; 		//Absolute Videos URL
$config["abs_url_audios"] 		= "http://domain.com/apps/banksykit//media/media/" ; 		//Absolute Audio URL
$config["abs_url_files"] 		= "http://domain.com/apps/banksykit//media/file/" ; 		//Absolute Files URL
$config["image_allowed"][] 		= array("mimetype"=>"image/jpeg","ext"=>"jpg") ; 		//whitelist image
$config["image_allowed"][] 		= array("mimetype"=>"image/jpg","ext"=>"jpg") ; 		
$config["image_allowed"][] 		= array("mimetype"=>"image/png","ext"=>"png") ; 		
$config["file_allowed"][] 		= array("mimetype"=>"text/plain","ext"=>"txt") ; 		
$config["file_allowed"][] 		= array("mimetype"=>"","ext"=>"tmp") ; 		
/** CONFIG:END **/

date_default_timezone_set($config['timezone']);
if(isset($_SERVER["HTTP_X_AUTHORIZATION"])){
	list($_SERVER["PHP_AUTH_USER"],$_SERVER["PHP_AUTH_PW"]) = explode(":" , base64_decode(substr($_SERVER["HTTP_X_AUTHORIZATION"],6)));
}
$rest_api=array("data"=>array("status"=>404,"title"=>"Not found"),"title"=>"Error","message"=>"Routes not found");

/** connect to mysql **/
$mysql = new mysqli($config["host"], $config["user"], $config["pass"], $config["dbase"]);
if (mysqli_connect_errno()){
	die(mysqli_connect_error());
}


if(!isset($_GET["json"])){
	$_GET["json"]= "route";
}
if((!isset($_GET["form"])) && ($_GET["json"] == "submit")) {
	$_GET["json"]= "route";
}

if($config["utf8"]==true){
	$mysql->set_charset("utf8");
}

$get_dir = explode("/", $_SERVER["PHP_SELF"]);
unset($get_dir[count($get_dir)-1]);
$main_url = "http://" . $_SERVER["HTTP_HOST"] . implode("/",$get_dir)."/";


switch($_GET["json"]){	// TODO: -+- route
	case "route":		$rest_api=array();
		$rest_api["site"]["name"] = "banksyKit" ;
		$rest_api["site"]["description"] = "First app" ;
		$rest_api["site"]["imabuilder"] = "rev18.07.25" ;

		break;
	// TODO: -+- submit

	case "submit":
		$rest_api=array();

		$rest_api["methods"][0] = "POST";
		$rest_api["methods"][1] = "GET";
		switch($_GET["form"]){
		}


	break;

}


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Authorization');
if (!isset($_GET["callback"])){
	header('Content-type: application/json');
	if(defined("JSON_UNESCAPED_UNICODE")){
		echo json_encode($rest_api,JSON_UNESCAPED_UNICODE);
	}else{
		echo json_encode($rest_api);
	}

}else{
	if(defined("JSON_UNESCAPED_UNICODE")){
		echo strip_tags($_GET["callback"]) ."(". json_encode($rest_api,JSON_UNESCAPED_UNICODE). ");" ;
	}else{
		echo strip_tags($_GET["callback"]) ."(". json_encode($rest_api) . ");" ;
	}

}