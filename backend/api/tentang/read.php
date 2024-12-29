<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM tentang";
$stmt = $db->prepare($query);
$stmt->execute();

$tentang = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $tentang_item = array(
        "id" => $id,
        "history" => $history,
        "employees" => $employees,
        "location" => $location,
        "google_map_link" => $google_map_link,
        "google_map_embed" => $google_map_embed
    );

    array_push($tentang, $tentang_item);
}

echo json_encode($tentang);
?>