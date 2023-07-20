// server.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quiz_db',
});

// Connect to MySQL
connection.connect();

// Retrieve MySQL data
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM quiz_db'; // Modify this query based on your database schema

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving data from MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Convert data to AJAX format (JSON)
      const jsonData = JSON.stringify(results);
      res.send(jsonData);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
