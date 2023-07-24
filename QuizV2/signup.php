<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $full_name = $_POST["full_name"];
    $email = $_POST["email"];
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Perform basic input validation here if needed

    $sql = "INSERT INTO students (full_name, email, username, password) VALUES ('$full_name', '$email', '$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
