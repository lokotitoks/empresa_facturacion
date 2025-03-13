<?php
$servername = "localhost";
$username = "compumun_pruebatec1";
$password = "pruebatec1";
$dbname = "compumun_pruebatec1";
//echo "conn exitosa";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>