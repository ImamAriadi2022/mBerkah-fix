<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$id = $data->id ?? null;
$status = $data->status ?? null;

$query = "UPDATE art_registrations SET status=:status WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":id", $id);
$stmt->bindParam(":status", $status);

if($stmt->execute()) {
    echo json_encode(array("message" => "Registration status was updated."));
} else {
    echo json_encode(array("message" => "Unable to update registration status."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>