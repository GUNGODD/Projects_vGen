step 1.{
  
	 create the database , 
	table1 =>  questions (will contain the questions and related questions_optoins)
	table2 => answers ( will contian the correct_answers and then conncet this table with the questions table 
				in order to check the valid answers and all )

	table3 => Studnets ( this table will consists of student_id , Student_name, Student_pass , 



	1.Database ()
	#Mysql

	-- Create the database (change 'your_database_name' to your desired database name)
CREATE DATABASE your_database_name;

-- Use the database
USE your_database_name;

-- Create the 'students' table
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (email),
  UNIQUE (username)
);

-- Create the 'questions' table
CREATE TABLE questions (
  question_id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL
);

-- Create the 'correct_answers' table
CREATE TABLE correct_answers (
  answer_id INT AUTO_INCREMENT PRIMARY KEY,
  correct_option ENUM('A', 'B', 'C', 'D') NOT NULL,
  question_id INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

-- Create the 'quizzes' table
CREATE TABLE quizzes (
  quiz_id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_name VARCHAR(100) NOT NULL,
  start_time DATETIME,
  end_time DATETIME
);

-- Create the 'quiz_attempts' table
CREATE TABLE quiz_attempts (
  attempt_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT,
  completion_status ENUM('in_progress', 'completed') DEFAULT 'in_progress',
  start_time DATETIME,
  end_time DATETIME,
  responses JSON,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

/// smaple questions 

-- Insert data into the 'questions' table
INSERT INTO questions (question, option_a, option_b, option_c, option_d)
VALUES
  ('What is the capital of France?', 'Paris', 'London', 'Berlin', 'Rome'),
  ('Which planet is closest to the Sun?', 'Venus', 'Mars', 'Jupiter', 'Mercury'),
  ('What is the chemical symbol for water?', 'W', 'A', 'H2O', 'O2'),
  ('Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo');

-- Insert data into the 'correct_answers' table
INSERT INTO correct_answers (correct_option, question_id)
VALUES
  ('A', 1), -- For question_id = 1, the correct option is 'A' (Paris)
  ('D', 2), -- For question_id = 2, the correct option is 'D' (Mercury)
  ('C', 3), -- For question_id = 3, the correct option is 'C' (H2O)
  ('A', 4); -- For question_id = 4, the correct option is 'A' (Leonardo da Vinci)

-- Insert data into the 'quizzes' table
INSERT INTO quizzes (quiz_name, start_time, end_time)
VALUES
  ('General Knowledge Quiz 1', '2023-07-20 09:00:00', '2023-07-20 10:00:00'),
  ('Science Quiz 1', '2023-07-21 14:30:00', '2023-07-21 15:30:00');







///backup db

<?php
// connecting php with DB

$host = "localhost";
$username = "root";
$password = "";
$Database = "online_quiz";


$conn = mysqli_connect($host, $username, $password, $Database);
 $result = $conn->query("SELECT * From questions ");

 ?>

 <?php while ($data = $results->fetch_assoc()) : ?>
      <?php print_r($data); ?>
      <?php endwhile; ?>







