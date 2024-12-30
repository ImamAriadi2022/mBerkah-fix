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

error_log("Received data: title=$title, value=$value, description=$description"); // Tambahkan log ini

$query = "INSERT INTO reviews SET title=:title, value=:value, description=:description";
$stmt = $db->prepare($query);

$stmt->bindParam(":title", $title);
$stmt->bindParam(":value", $value);
$stmt->bindParam(":description", $description);

if($stmt->execute()) {
    echo json_encode(array("message" => "Review was created."));
} else {
    echo json_encode(array("message" => "Unable to create review."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>