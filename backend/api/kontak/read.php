<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM contacts";
$stmt = $db->prepare($query);
$stmt->execute();

$contacts = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $contact_item = array(
        "id" => $id,
        "whatsapp" => $whatsapp,
        "phone" => $phone,
        "email" => $email,
        "instagram" => $instagram,
        "tiktok" => $tiktok,
        "website" => $website,
        "address" => $address,
        "googleMapLink" => $googleMapLink,
        "googleMapEmbed" => $googleMapEmbed
    );

    array_push($contacts, $contact_item);
}

echo json_encode($contacts);
?>