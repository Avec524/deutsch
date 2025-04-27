const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Вставьте сюда ваш n8n Webhook URL
const webhookUrl = 'https://proggramwertyumer.app.n8n.cloud/webhook-test/sprechenbot';

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';

  // Показываем индикатор «бот печатает…»
  const typingIndicator = appendMessage('bot', 'SprechenBot denkt…', true);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: getHistory() })
    });
    const data = await response.json();

    // Убираем индикатор
    chatBox.removeChild(typingIndicator);

    appendMessage('bot', data.botResponse || 'Entschuldigung, ein Fehler ist aufgetreten.');
  } catch (error) {
    chatBox.removeChild(typingIndicator);
    appendMessage('bot', 'Fehler beim Verbinden mit dem Bot.');
    console.error(error);
  }
});

function appendMessage(sender, text, isIndicator = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);
  messageDiv.textContent = text;
  if (isIndicator) messageDiv.classList.add('typing');
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return messageDiv;
}

function getHistory() {
  return Array.from(chatBox.children)
    .map(div => `${div.classList.contains('user') ? 'User' : 'Bot'}: ${div.textContent}`)
    .join('\n');
}

