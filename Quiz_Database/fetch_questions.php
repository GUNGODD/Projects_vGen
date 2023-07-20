<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "online_quiz";


header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers



// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch quiz questions and options from the 'questions' table
$questionsQuery = "SELECT * FROM questions";
$questionsResult = $conn->query($questionsQuery);

// Store the quiz questions in an array
$quizQuestions = array();
while ($row = $questionsResult->fetch_assoc()) {
    $quizQuestions[] = $row;
}

// Close the connection
$conn->close();

// Return the quiz questions as JSON
header('Content-Type: application/json');
echo json_encode($quizQuestions);
?>
