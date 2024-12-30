<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM reviews";
$stmt = $db->prepare($query);
$stmt->execute();

$reviews = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $review_item = array(
        "id" => $id,
        "title" => $title,
        "value" => $value,
        "description" => $description
    );

    array_push($reviews, $review_item);
}

echo json_encode($reviews);
?>