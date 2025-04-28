document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = document.getElementById('user-input').value;
  if (!userMessage) return;

  // Добавляем сообщение пользователя в чат
  const chatBox = document.getElementById('chat-box');
  const userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = `Вы: ${userMessage}`;
  chatBox.appendChild(userMessageDiv);

  // Очищаем поле ввода
  document.getElementById('user-input').value = '';

  // Здесь будет добавлена логика для обработки сообщения через AI
  // Для примера просто имитируем ответ ассистента
  const botMessageDiv = document.createElement('div');
  botMessageDiv.textContent = `Ассистент: Привет! Давай продолжим изучать немецкий.`;
  chatBox.appendChild(botMessageDiv);

  // Прокручиваем чат до последнего сообщения
  chatBox.scrollTop = chatBox.scrollHeight;
}


