<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM sertifikat";
$stmt = $db->prepare($query);
$stmt->execute();

$sertifikat = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $sertifikat_item = array(
        "id" => $id,
        "name" => $name,
        "description" => $description,
        "image" => base64_encode($image)
    );

    array_push($sertifikat, $sertifikat_item);
}

echo json_encode($sertifikat);
?>