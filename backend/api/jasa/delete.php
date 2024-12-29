<?php
include_once '../../config/database.php'; // Perbaiki jalur ini
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "DELETE FROM services WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":id", $data->id);

if($stmt->execute()) {
    echo json_encode(array("message" => "Service was deleted."));
} else {
    echo json_encode(array("message" => "Unable to delete service."));
}
?>