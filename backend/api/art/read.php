<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM art_registrations";
$stmt = $db->prepare($query);
$stmt->execute();

$registrations = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $registration_item = array(
        "id" => $id,
        "nama" => $nama,
        "tempatTanggalLahir" => $tempatTanggalLahir,
        "usia" => $usia,
        "tinggi" => $tinggi,
        "beratBadan" => $beratBadan,
        "jenisKelamin" => $jenisKelamin,
        "kewarganegaraan" => $kewarganegaraan,
        "agama" => $agama,
        "status" => $status,
        "pendidikan" => $pendidikan,
        "pengalaman" => $pengalaman,
        "skills" => json_decode($skills),
        "foto" => base64_encode($foto)
    );

    array_push($registrations, $registration_item);
}

echo json_encode($registrations);
?>