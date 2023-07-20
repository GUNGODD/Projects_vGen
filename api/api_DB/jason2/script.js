// script.js

fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    // Use the AJAX data (e.g., populate HTML elements)
    console.log(data);
  })
  .catch(error => {
    console.error('Error retrieving data:', error);
  });
