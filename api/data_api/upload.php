<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'questions';

// Get the file content from the AJAX request
$fileContent = $_POST['fileContent'];

// Create a database connection
$conn = mysqli_connect($host, $username, $password, $database);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

try {
  // Process the file content and insert into the database
  $lines = explode('Q:', $fileContent);

  foreach ($lines as $line) {
    if (!empty($line)) {
      $question = '';
      $options = [];
      $correctAnswer = '';

      $line = 'Q:' . $line;
      $lineSplit = preg_split('/\r\n|\r|\n/', $line);

      foreach ($lineSplit as $element) {
        if (strpos($element, 'Q:') === 0) {
          // Found a question
          $question = trim(substr($element, 2));
        } elseif (strpos($element, 'A)') === 0 || strpos($element, 'B)') === 0 || strpos($element, 'C)') === 0 || strpos($element, 'D)') === 0) {
          // Found options
          $options[] = trim($element);
        } elseif (strpos($element, 'Correct Answer:') === 0) {
          // Found correct answer
          $correctAnswer = trim(substr($element, 15));
        }
      }

      // Store the question and options in the "questions" table
      $insertQuestionQuery = "INSERT INTO questions (id, Questions, A, B, C, D) VALUES (NULL, '$question', '$options[0]', '$options[1]', '$options[2]', '$options[3]')";
      mysqli_query($conn, $insertQuestionQuery);

      // Get the inserted question's ID
      $questionId = mysqli_insert_id($conn);

      // Store the correct answer in the "correct_answers" table
      $insertAnswerQuery = "INSERT INTO correct_answers (id, correct_Answer, question_id) VALUES (NULL, '$correctAnswer', $questionId)";
      mysqli_query($conn, $insertAnswerQuery);
    }
  }

  // Close the database connection
  mysqli_close($conn);

  echo 'Data imported successfully.';
} catch (Exception $e) {
  echo 'An error occurred: ' . $e->getMessage();
}

?>
