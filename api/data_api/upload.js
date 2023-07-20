
const fs = require('fs');
const mysql = require('mysql');

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
    // Read the file
    const fileContent = fs.readFileSync("\\c\\Users\\user\\Documents", 'utf-8');

const lines = fileContent.split('Q:');


    lines.forEach((line) => {
        if(line!=''){


        let question = '';
        let options = [];
        let correctAnswer = '';

    line="Q:"+line;
    line.split('\n').forEach(element => {
        if (element.startsWith('Q:')) {
            // Found a question
            question = element.slice(2).trim();
          } else if (element.startsWith('A)')||element.startsWith('B)')||element.startsWith('C)')||element.startsWith('D)')) {
            // Found options
            options.push(element.trim());
          } else if (element.startsWith('Correct Answer:')) {
            // Found correct answer
            correctAnswer = element.split(":")[1].trim()
        }

    })
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
  } catch (err) {
    console.error('An error occurred:', err);
    connection.end();
  }
});