<?php
class Database {
    private $host = "localhost";
    private $db_name = "terj2475_mberkah";
    private $username = "terj2475_terj2475";
    private $password = "Vcc];6Qh~qZL";
    public $conn;

    // nama db cpanel = terj2475_mberkah
    // nama host = api.mutiaraberkah.my.id (atau localhost)
    // username = terj2475_terj2475
    // password = Vcc];6Qh~qZL

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>