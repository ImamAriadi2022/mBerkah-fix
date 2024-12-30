<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$title = $data->title ?? null;
$value = $data->value ?? null;
$description = $data->description ?? null;
$id = $data->id ?? null;

$query = "UPDATE reviews SET title=:title, value=:value, description=:description WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":title", $title);
$stmt->bindParam(":value", $value);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":id", $id);

if($stmt->execute()) {
    echo json_encode(array("message" => "Review was updated."));
} else {
    echo json_encode(array("message" => "Unable to update review."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>