// Require the appropriate database library
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

  // Insert data into the "questions" table
  const insertQuestionQuery = `
    INSERT INTO questions (question, A, B, C, D)
    VALUES ('What is the capital of France?', 'Paris', 'London', 'Madrid', 'Berlin')
  `;

  connection.query(insertQuestionQuery, (error, results) => {
    if (error) throw error;
    console.log('Question inserted successfully');

    // Fetch data from the "questions" table
    const fetchQuestionsQuery = 'SELECT * FROM questions';

    connection.query(fetchQuestionsQuery, (error, results) => {
      if (error) throw error;
      console.log('Questions fetched successfully');

      console.log('All questions:');
      console.log(results);

      // Close the database connection
      connection.end();
    });
  });
});
