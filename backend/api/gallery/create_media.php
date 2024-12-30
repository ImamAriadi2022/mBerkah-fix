<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$title = $_POST['title'] ?? null;
$description = $_POST['description'] ?? null;
$type = $_POST['type'] ?? null; // 'video' or 'photo'
$media = isset($_FILES['media']) ? file_get_contents($_FILES['media']['tmp_name']) : null;
$thumbnail = isset($_FILES['thumbnail']) ? file_get_contents($_FILES['thumbnail']['tmp_name']) : null;

$query = "INSERT INTO media SET title=:title, description=:description, type=:type, media=:media, thumbnail=:thumbnail";
$stmt = $db->prepare($query);

$stmt->bindParam(":title", $title);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":type", $type);
$stmt->bindParam(":media", $media, PDO::PARAM_LOB);
$stmt->bindParam(":thumbnail", $thumbnail, PDO::PARAM_LOB);

try {
    if($stmt->execute()) {
        echo json_encode(array("message" => "Media was created."));
    } else {
        echo json_encode(array("message" => "Unable to create media."));
        print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
    }
} catch (PDOException $e) {
    echo json_encode(array("message" => "Database error: " . $e->getMessage()));
}
?>