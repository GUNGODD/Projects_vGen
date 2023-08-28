document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const feedbackElement = document.getElementById('uploadFeedback');
    
    fetch('api/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        feedbackElement.textContent = result;
        feedbackElement.classList.remove('error');
        feedbackElement.classList.remove('success');
        
        if (result.includes('successfully')) {
            feedbackElement.classList.add('success');
            feedbackElement.innerHTML += ' 👍';
        } else {
            feedbackElement.classList.add('error');
            feedbackElement.innerHTML += ' 😞';
        }
        
        // Clear feedback after a few seconds
        setTimeout(() => {
            feedbackElement.textContent = '';
            feedbackElement.classList.remove('error');
            feedbackElement.classList.remove('success');
        }, 5000);
    })
    .catch(error => console.error('Error uploading file:', error));
});
