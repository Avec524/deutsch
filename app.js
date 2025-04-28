document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = document.getElementById('user-input').value.trim();
  if (!userMessage) return;

  const chatBox = document.getElementById('chat-box');
  const userDiv = document.createElement('div');
  userDiv.textContent = `Вы: ${userMessage}`;
  chatBox.appendChild(userDiv);

  document.getElementById('user-input').value = '';

  // Симуляция ответа ассистента
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.textContent = 'Ассистент: Отлично! Продолжим изучать немецкий!';
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}
