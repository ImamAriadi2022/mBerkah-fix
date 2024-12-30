<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "DELETE FROM sertifikat WHERE id = :id";
$stmt = $db->prepare($query);

$id = $data->id ?? null;

$stmt->bindParam(":id", $id);

if($stmt->execute()) {
    echo json_encode(array("message" => "Sertifikat was deleted."));
} else {
    echo json_encode(array("message" => "Unable to delete sertifikat."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>