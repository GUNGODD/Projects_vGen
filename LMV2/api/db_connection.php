<?php
class DatabaseConnection {
    private $servername = "localhost";
    private $username = "your_username";
    private $password = "your_password";
    private $dbname = "your_database";
    private $conn;

    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function closeConnection() {
        $this->conn->close();
    }
}

$databaseConnection = new DatabaseConnection();
$conn = $databaseConnection->getConnection();
?>
