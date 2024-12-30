<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM media";
$stmt = $db->prepare($query);
$stmt->execute();

$media = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $media_item = array(
        "id" => $row['id'],
        "title" => $row['title'],
        "description" => $row['description'],
        "type" => $row['type'],
        "media" => base64_encode($row['media']),
        "thumbnail" => base64_encode($row['thumbnail'])
    );

    array_push($media, $media_item);
}

echo json_encode($media);
?>