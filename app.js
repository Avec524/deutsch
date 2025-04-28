const webhookUrl = 'https://your-n8n-domain.com/webhook/german-assistant'; // поменяй на свой настоящий URL!

function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (!userInput.trim()) return;

  addMessage('Вы', userInput);

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      body: {
        message: userInput,
        user_id: "user-1"  // Пока фиксированный ID пользователя, можно улучшить
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    const botReply = data.reply || "Извините, произошла ошибка.";
    addMessage('Ассистент', botReply);
  })
  .catch(error => {
    console.error('Ошибка:', error);
    addMessage('Ошибка', 'Не удалось получить ответ от сервера.');
  });

  document.getElementById('userInput').value = '';
}

function addMessage(sender, text) {
  const chatbox = document.getElementById('chatbox');
  const message = document.createElement('p');
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatbox.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight;
}
