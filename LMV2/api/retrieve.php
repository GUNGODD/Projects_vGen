<?php
include('db_connection.php');

try {
    $selectQuestionsSql = "SELECT * FROM questions";
    $result = $conn->query($selectQuestionsSql);

    $questions = array();
    while ($row = $result->fetch_assoc()) {
        // Fetch options for the current question (implement your option retrieval logic here)
        // Build the $questions array
        // Implement these parts based on your database structure and option retrieval
        $options = fetchOptionsForQuestion($row['id']); // Implement this function

        $questions[] = array(
            'id' => $row['id'],
            'question_text' => $row['question_text'],
            'image_path' => $row['image_path'],
            'code_snippet' => $row['code_snippet'],
            'options' => $options
        );
    }

    header('Content-Type: application/json');
    echo json_encode($questions);
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array('error' => 'An error occurred while retrieving data.'));
}
?>
