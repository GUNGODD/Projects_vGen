-- Create the database
CREATE DATABASE  quiz2;

-- Use the database
USE quiz2;

-- Create the login_table to store user login information
CREATE TABLE login_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the quiz table to store questions and related information
CREATE TABLE quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    image_path VARCHAR(255),
    code_snippet TEXT
);

-- Create the quiz_answers table to store correct answers for quiz questions
CREATE TABLE quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correct_answer TEXT NOT NULL
);

-- Create the student_answers table to store answers submitted by students
CREATE TABLE student_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    question_id INT NOT NULL,
    submitted_answer TEXT,
    FOREIGN KEY (student_id) REFERENCES login_table(id),
    FOREIGN KEY (question_id) REFERENCES quiz(id)
);

-- Create the current_loggedin_user table to track currently logged-in users
CREATE TABLE current_loggedin_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_key VARCHAR(100) NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES login_table(id)
);
