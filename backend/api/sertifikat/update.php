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
    $id = $data->id ?? null;
} else {
    $name = $_POST['name'] ?? null;
    $description = $_POST['description'] ?? null;
    $id = $_POST['id'] ?? null;
    $image = isset($_FILES['image']) ? file_get_contents($_FILES['image']['tmp_name']) : null;
}

// Ambil data yang ada di database
$query = "SELECT name, description, image FROM sertifikat WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(":id", $id);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

// Pertahankan nilai yang ada jika tidak ada nilai baru yang diberikan
$name = $name ?? $row['name'];
$description = $description ?? $row['description'];
$image = $image ?? $row['image'];

$query = "UPDATE sertifikat SET name=:name, description=:description, image=:image WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":name", $name);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":image", $image);
$stmt->bindParam(":id", $id);

if($stmt->execute()) {
    echo json_encode(array("message" => "Sertifikat was updated."));
} else {
    echo json_encode(array("message" => "Unable to update sertifikat."));
    print_r($stmt->errorInfo()); 
}
?>