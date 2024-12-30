<?php
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    echo "<h1>Database connection successful.</h1>";
} else {
    echo "<h1>Database connection failed.</h1>";
}
?>