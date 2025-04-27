const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const chatBox = document.getElementById('chat-box');

let chatHistory = [];

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage(msg, 'user');
  userInput.value = '';
  chatHistory.push(`User: ${msg}`);

  const payload = {
    message: msg,
    history: chatHistory.join('\n')
  };

  try {
    const res = await fetch('https://<YOUR_N8N_DOMAIN>/webhook/sprechenbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    const reply = data.botResponse || 'Entschuldigung, ein Fehler ist aufgetreten.';
    appendMessage(reply, 'bot');
    chatHistory.push(`Bot: ${reply}`);
  } catch (err) {
    appendMessage('Fehler beim Senden der Nachricht.', 'bot');
    console.error(err);
  }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
