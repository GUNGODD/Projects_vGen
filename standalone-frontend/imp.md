calculateTypingDelay(message) {
      const typingSpeed = 50; // Adjust the typing speed as needed
      const baseDelay = 1000; // Adjust the base delay as needed
      const additionalDelay = message.length * typingSpeed; // Calculate additional delay based on message length
      return baseDelay + additionalDelay;
    }



    // Calculate delay based on user message length
      const messageLength = userMessage.length;
      const delay = messageLength * 50; // Adjust the delay factor as needed
  
      // Add delay before processing the user message
      setTimeout(() => {
        fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: JSON.stringify({ message: userMessage }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(r => r.json())
          .then(r => {
            let botMsg = { name: "Phebee", message: r.answer };
            this.messages.pop(); // Remove the typing message
            this.messages.push(botMsg);
  
            // Add delay and typing effect before updating the chat text
            setTimeout(() => {
              this.updateChatText(chatbox)
              textField.value = '233'
            }, this.calculateTypingDelay(botMsg.message));
  
          }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = '344'
          });
      }, delay);
    }
  