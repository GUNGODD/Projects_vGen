<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $student_id = $_POST["student_id"];
    $quiz_id = $_POST["quiz_id"];
    $score = $_POST["score"];
    $completion_status = $_POST["completion_status"];
    $responses = json_encode($_POST["responses"]);

    $sql = "INSERT INTO quiz_attempts (student_id, quiz_id, score, completion_status, responses) VALUES ('$student_id', '$quiz_id', '$score', '$completion_status', '$responses')";

    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
