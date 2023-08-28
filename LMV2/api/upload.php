<?php
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['docFile'])) {
    $uploadedFile = $_FILES['docFile'];

    // Check for upload errors
    if ($uploadedFile['error'] === UPLOAD_ERR_OK) {
        // Validate file type and size (implement your validation logic here)

        // Process the uploaded DOC file (implement your processing logic here)
        $fileContent = file_get_contents($uploadedFile['tmp_name']);

        // Extract questions, options, images, and code snippets (implement your extraction logic here)
        $questions = extractQuestions($fileContent); // Implement this function

        if (!empty($questions)) {
            // Start a transaction for database operations
            $conn->begin_transaction();

            try {
                // Store data in the database
                foreach ($questions as $question) {
                    $questionText = $conn->real_escape_string($question['question_text']);
                    $imagePath = $conn->real_escape_string($question['image_path']);
                    $codeSnippet = $conn->real_escape_string($question['code_snippet']);

                    // Insert question
                    $insertQuestionSql = "INSERT INTO questions (question_text, image_path, code_snippet) VALUES ('$questionText', '$imagePath', '$codeSnippet')";
                    $conn->query($insertQuestionSql);
                    $questionId = $conn->insert_id;

                    // Insert options
                    foreach ($question['options'] as $option) {
                        $optionText = $conn->real_escape_string($option['option_text']);
                        $isCorrect = $option['is_correct'] ? 1 : 0;

                        $insertOptionSql = "INSERT INTO options (question_id, option_text, is_correct) VALUES ($questionId, '$optionText', $isCorrect)";
                        $conn->query($insertOptionSql);
                    }
                }

                // Commit the transaction
                $conn->commit();

                echo "Questions and options uploaded successfully";
            } catch (Exception $e) {
                // Rollback the transaction in case of an error
                $conn->rollback();
                echo "Error uploading questions: " . $e->getMessage();
            }
        } else {
            echo "No valid questions found in the uploaded file";
        }
    } else {
        echo "File upload error: " . $uploadedFile['error'];
    }
}
?>
