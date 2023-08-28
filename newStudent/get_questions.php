<?php
require 'database.php';

// Fetch questions along with images and options from the database
$query = "
    SELECT q.id, q.question_text, q.image, o.id as option_id, o.option_text, o.is_correct
    FROM questions q
    LEFT JOIN options o ON q.id = o.question_id
    ORDER BY q.id, o.id
";

$result = $conn->query($query);
if ($result) {
    $questions = [];
    while ($row = $result->fetch_assoc()) {
        $questionId = $row['id'];
        if (!isset($questions[$questionId])) {
            $questions[$questionId] = [
                'id' => $row['id'],
                'question_text' => $row['question_text'],
                'image' => $row['image'],
                'options' => []
            ];
        }

        if ($row['option_id']) {
            $questions[$questionId]['options'][] = [
                'id' => $row['option_id'],
                'option_text' => $row['option_text'],
                'is_correct' => $row['is_correct']
            ];
        }
    }

    // Convert image data to base64 encoding
    foreach ($questions as &$question) {
        if ($question['image']) {
            $question['image'] = base64_encode($question['image']);
        }
    }

    echo json_encode(array_values($questions));
} else {
    echo json_encode(['error' => 'Failed to fetch questions.']);
}

$conn->close();
?>






