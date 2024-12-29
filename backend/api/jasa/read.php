<?php
include_once '../../config/database.php'; // Perbaiki jalur ini
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, title, description, image FROM services";
$stmt = $db->prepare($query);
$stmt->execute();

$services = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $service_item = array(
        "id" => $id,
        "title" => $title,
        "description" => $description,
        "image" => base64_encode($image)
    );
    array_push($services, $service_item);
}

echo json_encode($services);
?>