const fs = require('fs');
const mysql = require('mysql');
const readline = require('readline');
const path = require('path');

// Create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'questions'
});

// Connect to the database
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to the MySQL server');

  try {
    // Create a readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Prompt for the file path
    rl.question('Enter the file path: ', (filePath) => {
      rl.close();

      // Resolve the absolute file path
      const absoluteFilePath = path.resolve(filePath.replace(/\//g, "\\"));


      // Read the file
      const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');

      const lines = fileContent.split('\n');

      let question = '';
      let options = [];
      let correctAnswer = '';

      lines.forEach((line) => {
        if (line.startsWith('Q:')) {
          // Found a question
          question = line.slice(2).trim();
        } else if (line.startsWith('Options:')) {
          // Found options
          options = line.slice(8).split(',').map(option => option.trim());
        } else if (line.startsWith('Correct Answer:')) {
          // Found correct answer
          correctAnswer = line.slice(15).trim();

          // Store the question and options in the "questions" table
          const insertQuestionQuery = `INSERT INTO questions (id, Questions, A, B, C, D) VALUES (NULL, ?, ?, ?, ?, ?)`;
          const values = [question, options[0], options[1], options[2], options[3]];

          connection.query(insertQuestionQuery, values, (error, questionResult) => {
            if (error) throw error;
            console.log('Question inserted successfully');

            // Get the inserted question's ID
            const questionId = questionResult.insertId;

            // Store the correct answer in the "correct_answers" table
            const insertAnswerQuery = `INSERT INTO correct_answers (id, correct_Answer, question_id) VALUES (NULL, ?, ?)`;
            const answerValues = [correctAnswer, questionId];

            connection.query(insertAnswerQuery, answerValues, (error) => {
              if (error) throw error;
              console.log('Correct answer inserted successfully');
            });
          });
        }
      });

      // Close the database connection
      connection.end();
    });
  } catch (err) {
    console.error('An error occurred:', err);
    connection.end();
  }
});
