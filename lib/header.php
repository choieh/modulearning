<?php
include '../lib/global.php';
include '../lib/dbConnect.php';
include '../lib/function.php';
include '../lib/passwordHash.php';

session_set_cookie_params(0, "/", "." . $_siteURL);
ini_set('session.gc_maxlifetime', 28800);
ini_set('session.cache_limiter', 'nocache, must-revalidate-revalidate');
session_start();

function preventXSS($str)
{
    if (gettype($str) == "array") {
        foreach ($str as $key => $value) {
            $str[$key] = preg_replace("/'|\"|<|>/", "x", $value);
        }
    } else {
        $str = preg_replace("/'|\"|<|>/", "x", $str);
    }
    return $str;
}


