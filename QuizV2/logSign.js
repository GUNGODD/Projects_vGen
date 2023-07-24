// Function to handle signup form submission
function handleSignup(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
    
      // Send the form data to the server using fetch or XMLHttpRequest
      // Adjust the URL based on your server endpoint for signup
      fetch('signup.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server (e.g., show success message, redirect, etc.)
        console.log(data);
        // You can add code here to handle the server response
      })
      .catch(error => {
        // Handle errors (e.g., show error message to the user)
        console.error('Error:', error);
      });
    }
    
    // Function to handle login form submission
    function handleLogin(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
    
      // Send the form data to the server using fetch or XMLHttpRequest
      // Adjust the URL based on your server endpoint for login
      fetch('login.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server (e.g., show success message, redirect, etc.)
        console.log(data);
        // You can add code here to handle the server response
      })
      .catch(error => {
        // Handle errors (e.g., show error message to the user)
        console.error('Error:', error);
      });
    }
    
    // Add event listeners to the forms
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (signupForm) {
      signupForm.addEventListener('submit', handleSignup);
    }
    
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
    