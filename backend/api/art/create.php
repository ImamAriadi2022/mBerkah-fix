<?php
include_once '../../config/database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$database = new Database();
$db = $database->getConnection();

$nama = $_POST['nama'] ?? null;
$tempatTanggalLahir = $_POST['tempatTanggalLahir'] ?? null;
$usia = $_POST['usia'] ?? null;
$tinggi = $_POST['tinggi'] ?? null;
$beratBadan = $_POST['beratBadan'] ?? null;
$jenisKelamin = $_POST['jenisKelamin'] ?? null;
$kewarganegaraan = $_POST['kewarganegaraan'] ?? null;
$agama = $_POST['agama'] ?? null;
$status = $_POST['status'] ?? null;
$pendidikan = $_POST['pendidikan'] ?? null;
$pengalaman = $_POST['pengalaman'] ?? null;
$skills = json_encode($_POST['skills'] ?? []);
$foto = isset($_FILES['foto']) ? file_get_contents($_FILES['foto']['tmp_name']) : null;

$query = "INSERT INTO art_registrations SET 
    nama=:nama, 
    tempatTanggalLahir=:tempatTanggalLahir, 
    usia=:usia, 
    tinggi=:tinggi, 
    beratBadan=:beratBadan, 
    jenisKelamin=:jenisKelamin, 
    kewarganegaraan=:kewarganegaraan, 
    agama=:agama, 
    status=:status, 
    pendidikan=:pendidikan, 
    pengalaman=:pengalaman, 
    skills=:skills, 
    foto=:foto";

$stmt = $db->prepare($query);

$stmt->bindParam(":nama", $nama);
$stmt->bindParam(":tempatTanggalLahir", $tempatTanggalLahir);
$stmt->bindParam(":usia", $usia);
$stmt->bindParam(":tinggi", $tinggi);
$stmt->bindParam(":beratBadan", $beratBadan);
$stmt->bindParam(":jenisKelamin", $jenisKelamin);
$stmt->bindParam(":kewarganegaraan", $kewarganegaraan);
$stmt->bindParam(":agama", $agama);
$stmt->bindParam(":status", $status);
$stmt->bindParam(":pendidikan", $pendidikan);
$stmt->bindParam(":pengalaman", $pengalaman);
$stmt->bindParam(":skills", $skills);
$stmt->bindParam(":foto", $foto);

if($stmt->execute()) {
    echo json_encode(array("message" => "Registration was created."));
} else {
    echo json_encode(array("message" => "Unable to create registration."));
    print_r($stmt->errorInfo()); // Tambahkan ini untuk debugging
}
?>