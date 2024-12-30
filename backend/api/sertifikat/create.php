<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

// Periksa apakah data dikirim sebagai form-data atau JSON
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name ?? null;
    $description = $data->description ?? null;
    $image = $data->image ?? null;
} else {
    $name = $_POST['name'] ?? null;
    $description = $_POST['description'] ?? null;
    $image = file_get_contents($_FILES['image']['tmp_name']) ?? null;
}

$query = "INSERT INTO sertifikat SET name=:name, description=:description, image=:image";
$stmt = $db->prepare($query);

$stmt->bindParam(":name", $name);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":image", $image);

if($stmt->execute()) {
    echo json_encode(array("message" => "Sertifikat was created."));
} else {
    echo json_encode(array("message" => "Unable to create sertifikat."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>