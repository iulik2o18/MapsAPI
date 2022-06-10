<?php
function OpenCon()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "test";


$con = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connection failded: %s\n". $con->error);

return $con;
}

function CloseCon($con) {
    $con->close();
}
