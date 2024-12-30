<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "UPDATE contacts SET whatsapp=:whatsapp, phone=:phone, email=:email, instagram=:instagram, tiktok=:tiktok, website=:website, address=:address, googleMapLink=:googleMapLink, googleMapEmbed=:googleMapEmbed WHERE id=:id";
$stmt = $db->prepare($query);

$stmt->bindParam(":id", $data->id);
$stmt->bindParam(":whatsapp", $data->whatsapp);
$stmt->bindParam(":phone", $data->phone);
$stmt->bindParam(":email", $data->email);
$stmt->bindParam(":instagram", $data->instagram);
$stmt->bindParam(":tiktok", $data->tiktok);
$stmt->bindParam(":website", $data->website);
$stmt->bindParam(":address", $data->address);
$stmt->bindParam(":googleMapLink", $data->googleMapLink);
$stmt->bindParam(":googleMapEmbed", $data->googleMapEmbed);

if($stmt->execute()) {
    echo json_encode(array("message" => "Contact was updated."));
} else {
    echo json_encode(array("message" => "Unable to update contact."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>