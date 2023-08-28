// Fetch and display quiz data
fetch('api/retrieve.php')
    .then(response => response.json())
    .then(data => {
        const quizContainer = document.getElementById('quizContainer');
        
        data.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            
            // Create elements for question text
            const questionText = document.createElement('p');
            questionText.textContent = question.question_text;
            
            // Create elements for question image (if available)
            if (question.image_path) {
                const questionImage = document.createElement('img');
                questionImage.src = question.image_path;
                // You can add more styling to the image here
                questionDiv.appendChild(questionImage);
            }
            
            // Create elements for code snippet (if available)
            if (question.code_snippet) {
                const codeSnippet = document.createElement('pre');
                const code = document.createElement('code');
                code.textContent = question.code_snippet;
                codeSnippet.appendChild(code);
                // You can add more styling for code snippet here
                questionDiv.appendChild(codeSnippet);
            }
            
            // Create elements for options
            const optionsList = document.createElement('ul');
            optionsList.classList.add('options');
            question.options.forEach(option => {
                const optionItem = document.createElement('li');
                optionItem.textContent = option.option_text;
                optionsList.appendChild(optionItem);
            });
            
            questionDiv.appendChild(questionText);
            questionDiv.appendChild(optionsList);
            
            quizContainer.appendChild(questionDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// Implement AJAX upload functionality
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', () => {
    const formData = new FormData();
    formData.append('docFile', fileInput.files[0]);
    
    fetch('api/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        // Refresh the page or update the UI as needed
    })
    .catch(error => console.error('Error uploading file:', error));
});
