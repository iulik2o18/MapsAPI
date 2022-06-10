<?php
include 'connection.php';

$conn = OpenCon();

$sql = "SELECT * from store_location";

$results = mysqli_query($conn, $sql) or die("Error Selecting" . mysqli_error($conn));

$maps_details = array();

while ($row = mysqli_fetch_assoc($results)) {
    $maps_details[] = $row;
}

echo json_encode($maps_details);

CloseCon($conn);
