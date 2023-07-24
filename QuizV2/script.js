document.addEventListener('DOMContentLoaded', () => {
  const questionNumberElement = document.getElementById('question-number');
  const questionElement = document.getElementById('question');
  const choice1Element = document.getElementById('choice1-text');
  const choice2Element = document.getElementById('choice2-text');
  const choice3Element = document.getElementById('choice3-text');
  const choice4Element = document.getElementById('choice4-text');
  const questionContainerElement = document.getElementById('question-container');
  const nextButton = document.getElementById('next-btn');
  const previousButton = document.getElementById('previous-btn');

  let currentQuestionIndex = 0;
  let quizQuestions = [];

  // Function to show the current question on the page
  function showQuestion(questionIndex) {
    const currentQuestion = quizQuestions[questionIndex];

    questionNumberElement.textContent = `Question ${questionIndex + 1} of ${quizQuestions.length}`;

    // Use innerHTML to preserve line breaks in the question text
    questionElement.innerHTML = currentQuestion.question.replace(/\n/g, '<br>');

    choice1Element.innerHTML = currentQuestion.option_a;
    choice2Element.innerHTML = currentQuestion.option_b;
    choice3Element.innerHTML = currentQuestion.option_c;
    choice4Element.innerHTML = currentQuestion.option_d;

    // Display the code snippet in the desired format
    const codeSnippetElement = document.getElementById('code-snippet');
    codeSnippetElement.innerHTML = currentQuestion.code_snippet.replace(/\n/g, '<br>');
  }

  // Function to fetch quiz questions from the PHP backend
  function fetchQuizQuestions() {
    fetch('fetch_questions.php') // Adjust the URL based on the PHP file location
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        quizQuestions = data;
        showQuestion(currentQuestionIndex);
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
        // Optionally, you can handle the error here, such as showing an error message to the user
      });
  }

  // Next button click event
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizQuestions.length) {
      // Quiz finished
      // You can add code to handle quiz submission here
      return;
    }
    showQuestion(currentQuestionIndex);
    previousButton.disabled = false ; // Enable the "Previous" button after navigating to the next question
    if (currentQuestionIndex === quizQuestions.length - 1) {
      nextButton.textContent = 'Finish';
    }
  });
  
  // Previous button click event
  previousButton.addEventListener('click', () => {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
    nextButton.textContent = 'Next';
    if (currentQuestionIndex === 0) {
      previousButton.disabled = true;
    }
  });

  // Fetch quiz questions when the page loads
  fetchQuizQuestions();
});
