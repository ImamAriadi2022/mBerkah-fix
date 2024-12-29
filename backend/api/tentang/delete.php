<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "DELETE FROM tentang WHERE id=:id";
$stmt = $db->prepare($query);

$id = $data->id;
$stmt->bindParam(":id", $id);

if($stmt->execute()) {
    echo json_encode(array("message" => "Tentang was deleted."));
} else {
    echo json_encode(array("message" => "Unable to delete tentang."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>