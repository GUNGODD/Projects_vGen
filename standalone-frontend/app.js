class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
      chatMessages: document.querySelector('.chatbox__messages')
    };

    this.state = false;
    this.messages = [];
    this.options = [
      { question: "How can I help you?", answer: "I can assist you with any questions you have. How can I assist you today?" },
      { question: "What are your hours of operation?", answer: "I am available 24/7 to help you with your queries." },
      { question: "Do you offer refunds?", answer: "Yes, we have a refund policy. Please provide your order details for further assistance." },
      { question: "How can I help you?", answer: "I can assist you with any questions you have. How can I assist you today?" },
      { question: "What are your hours of operation?", answer: "I am available 24/7 to help you with your queries." },
      { question: "Do you offer refunds?", answer: "Yes, we have a refund policy. Please provide your order details for further assistance." },
      
      // Add more predefined question-answer pairs as needed
    ];
  }

  displayPredefinedQuestions() {
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
  
    this.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.classList.add('option-button');
      optionButton.innerText = option.question;
      optionButton.addEventListener('click', () => this.onOptionButton(option));
  
      // Add hover effect
      optionButton.addEventListener('mouseenter', () => {
        optionButton.classList.add('option-button--hover');
      });
      optionButton.addEventListener('mouseleave', () => {
        optionButton.classList.remove('option-button--hover');
      });
  
      optionsContainer.appendChild(optionButton);
    });
  
    const chatMessages = this.args.chatMessages;
    chatMessages.appendChild(optionsContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  

  toggleState(chatbox) {
    this.state = !this.state;

    if (this.state) {
      chatbox.classList.add('chatbox--active');
    } else {
      chatbox.classList.remove('chatbox--active');
    }
  }

  onOptionButton(option) {
    let msg1 = { name: "User", message: option.question };
    let msg2 = { name: "Phebee", message: option.answer };
  
    this.messages.push(msg1, msg2);
    this.updateChatText();
  }
  

  updateChatText() {
    const chatBox = this.args.chatBox;
    const chatMessages = this.args.chatMessages;
    chatMessages.innerHTML = '';

    this.messages.forEach(message => {
      const messageItem = document.createElement('div');
      messageItem.classList.add('messages__item');

      if (message.name === 'Phebee') {
        messageItem.classList.add('messages__item--operator');
      } else {
        messageItem.classList.add('messages__item--visitor');
      }

      messageItem.textContent = message.message;
      chatMessages.appendChild(messageItem);
    });

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    this.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.classList.add('option-button');
      optionButton.innerText = option.question;
      optionButton.addEventListener('click', () => this.onOptionButton(option));
      optionsContainer.appendChild(optionButton);
    });
    chatMessages.appendChild(optionsContainer);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  display() {
    const { openButton, chatBox } = this.args;

    openButton.addEventListener('click', () => {
      if (!this.state) {
        // Toggle the chatbox state and display predefined questions
        this.toggleState(chatBox);
        this.displayPredefinedQuestions();
      } else {
        this.toggleState(chatBox);
      }
    });
  }
}

const chatbox = new Chatbox();
chatbox.display();
