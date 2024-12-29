<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

// Periksa apakah data dikirim sebagai form-data atau JSON
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $data = json_decode(file_get_contents("php://input"));
} else {
    $data = (object) $_POST;
}

$history = $data->history ?? null;
$employees = $data->employees ?? null;
$location = $data->location ?? null;
$google_map_link = $data->google_map_link ?? null;
$google_map_embed = $data->google_map_embed ?? null;
$id = $data->id ?? null;

$query = "UPDATE tentang SET history=:history, employees=:employees, location=:location, google_map_link=:google_map_link, google_map_embed=:google_map_embed WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":history", $history);
$stmt->bindParam(":employees", $employees);
$stmt->bindParam(":location", $location);
$stmt->bindParam(":google_map_link", $google_map_link);
$stmt->bindParam(":google_map_embed", $google_map_embed);
$stmt->bindParam(":id", $id);

if($stmt->execute()) {
    echo json_encode(array("message" => "Tentang was updated."));
} else {
    echo json_encode(array("message" => "Unable to update tentang."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>