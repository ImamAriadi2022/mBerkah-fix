<?php
include_once '../../config/database.php'; // Perbaiki jalur ini
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$title = $_POST['title'];
$description = $_POST['description'];
$image = file_get_contents($_FILES['image']['tmp_name']);

$query = "INSERT INTO services SET title=:title, description=:description, image=:image";
$stmt = $db->prepare($query);

$stmt->bindParam(":title", $title);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":image", $image, PDO::PARAM_LOB);

if($stmt->execute()) {
    echo json_encode(array("message" => "Service was created."));
} else {
    echo json_encode(array("message" => "Unable to create service."));
}
?>