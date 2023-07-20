<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'questions';

// Message variables
$message = '';
$importStatus = '';

// Check if the form is submitted
if (isset($_POST['submit'])) {
  // Create a database connection
  $conn = mysqli_connect($host, $username, $password, $database);
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  // Check if a file is selected
  if (!empty($_FILES['file']['name'])) {
    $filePath = $_FILES['file']['tmp_name'];

    // Read the file content
    $fileContent = file_get_contents($filePath);

    $lines = explode("\n", $fileContent);

    $question = '';
    $options = [];
    $correctAnswer = '';

    foreach ($lines as $line) {
      if (strpos($line, 'Q:') === 0) {
        // Found a question
        $question = trim(substr($line, 2));
      } elseif (strpos($line, 'Options:') === 0) {
        // Found options
        $options = array_map('trim', explode(',', substr($line, 8)));
      } elseif (strpos($line, 'Correct Answer:') === 0) {
        // Found correct answer
        $correctAnswer = trim(substr($line, 15));

        // Store the question and options in the "questions" table
        $insertQuestionQuery = "INSERT INTO questions (Questions, A, B, C, D) VALUES ('$question', '$options[0]', '$options[1]', '$options[2]', '$options[3]')";
        mysqli_query($conn, $insertQuestionQuery);

        // Get the inserted question's ID
        $questionId = mysqli_insert_id($conn);

        // Store the correct answer in the "correct_answers" table
        $insertAnswerQuery = "INSERT INTO correct_answers (correct_Answer, question_id) VALUES ('$correctAnswer', $questionId)";
        mysqli_query($conn, $insertAnswerQuery);
      }
    }

    // Close the database connection
    mysqli_close($conn);

    $message = 'Data imported successfully.';
    $importStatus = 'success';
  } else {
    $message = 'Please select a file.';
    $importStatus = 'error';
  }
}

?>

<!DOCTYPE html>
<html>
<head>
  <title>File Upload</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>File Upload</h1>
    <?php if (!empty($message)) { ?>
      <div class="<?php echo $importStatus; ?>"><?php echo $message; ?></div>
    <?php } ?>
    <form method="POST" enctype="multipart/form-data">
      <input type="file" name="file">
      <button type="submit" name="submit">Upload</button>
    </form>
  </div>
</body>
</html>
