<?php

include $_SERVER['DOCUMENT_ROOT'].'/lib/global.php';
include $_SERVER['DOCUMENT_ROOT'].'/lib/dbConnectNew.php';
include $_SERVER['DOCUMENT_ROOT'].'/lib/function.php';
include $_SERVER['DOCUMENT_ROOT'].'/lib/passwordHash.php';

//session_set_save_handler ("sess_open", "sess_close", "sess_read", "sess_write_renew", "sess_destroy", "sess_gc");
session_set_cookie_params( 0, "/", ".".$_siteURL );
ini_set('session.gc_maxlifetime', 28800);
ini_set('session.cache_limiter' ,'nocache, must-revalidate-revalidate');
session_start();
//header('P3P: CP="NOI CURa ADMa DEVa TAIa OUR DELa BUS IND PHY ONL UNI COM NAV INT DEM PRE"');

//security func
function preventXSS($str){
    if(gettype($str)=="array"){
        foreach($str as $key => $value){
            $str[$key]=preg_replace("/'|\"|<|>/","x",$value);
        }
    } else {
        $str=preg_replace("/'|\"|<|>/","x",$str);
    }
    return $str;
}

