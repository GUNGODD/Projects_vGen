<?php
require 'vendor/autoload.php';
require 'database.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_FILES['docFile']['error'] === UPLOAD_ERR_OK) {
        $docFilePath = 'uploads/' . $_FILES['docFile']['name'];
        move_uploaded_file($_FILES['docFile']['tmp_name'], $docFilePath);

        $phpWord = \PhpOffice\PhpWord\IOFactory::load($docFilePath);
        $questions = [];

        foreach ($phpWord->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                if ($element instanceof \PhpOffice\PhpWord\Element\Text) {
                    $text = $element->getText();
                    // Identify and extract questions, options, and images
                    // ...

                    $questions[] = [
                        'question_text' => $questionText,
                        'image_data' => $imageData,
                        'options' => $options,
                    ];
                }
            }
        }

        // Store extracted data in the database
        foreach ($questions as $questionData) {
            $questionText = $questionData['question_text'];
            $imageData = $questionData['image_data'];
            $options = $questionData['options'];

            // Insert question into the 'questions' table
            $insertQuestionQuery = "INSERT INTO questions (question_text, image) VALUES (?, ?)";
            // Prepare and execute the query
            // ...

            // Get the ID of the inserted question
            $questionId = $conn->insert_id;

            foreach ($options as $optionData) {
                $optionText = $optionData['option_text'];
                $isCorrect = $optionData['is_correct'];

                // Insert option into the 'options' table
                $insertOptionQuery = "INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)";
                // Prepare and execute the query
                // ...
            }
        }

        echo json_encode(['message' => 'Questions uploaded successfully.']);
    } else {
        echo json_encode(['error' => 'Error uploading file.']);
    }
}
?>
