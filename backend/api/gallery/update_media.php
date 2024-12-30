<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$id = $data->id ?? null;
$title = $data->title ?? null;
$description = $data->description ?? null;
$type = $data->type ?? null;

$query = "UPDATE media SET title=:title, description=:description, type=:type WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":id", $id);
$stmt->bindParam(":title", $title);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":type", $type);

if($stmt->execute()) {
    echo json_encode(array("message" => "Media was updated."));
} else {
    echo json_encode(array("message" => "Unable to update media."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>