document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
  
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const promptInput = document.getElementById('prompt');
      const prompt = promptInput.value;
      promptInput.value = '';
  
      const userMessage = document.createElement('div');
      userMessage.classList.add('message', 'user-message');
      userMessage.textContent = `You: ${prompt}`;
      chatBox.appendChild(userMessage);
  
      const response = await fetch('/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }).then(res => res.json());
  
      const krishnaMessage = document.createElement('div');
      krishnaMessage.classList.add('message', 'krishna-message');
      krishnaMessage.textContent = `Madhav: ${response.response}`;
      chatBox.appendChild(krishnaMessage);
  
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  
    async function loadChatHistory() {
      const history = await fetch('/chat-history').then(res => res.json());
      history.forEach(({ prompt, response }) => {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = `You: ${prompt}`;
        chatBox.appendChild(userMessage);
  
        const krishnaMessage = document.createElement('div');
        krishnaMessage.classList.add('message', 'krishna-message');
        krishnaMessage.textContent = `Krishna: ${response}`;
        chatBox.appendChild(krishnaMessage);
      });
  
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    loadChatHistory();
  });
  