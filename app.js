document.addEventListener("DOMContentLoaded", () => {
  const chatInput  = document.getElementById("chat-input");
  const chatButton = document.getElementById("chat-button");
  const chatBox    = document.getElementById("chatbox");

  // URL вашего n8n Webhook
  const webhookUrl = 'https://proggramwertyumer.app.n8n.cloud/webhook-test/german-assistant';

  // Отправка сообщения
  async function sendMessage(message) {
    addMessage("Вы", message, "user-message");
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user123", message })
      });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      addMessage("Ассистент", data.reply, "bot-message");
    } catch (e) {
      console.error(e);
      addMessage("Система", "Ошибка сервера. Попробуйте позже.", "bot-message");
    }
    chatInput.value = "";
  }

  // Добавление сообщения в чат
  function addMessage(sender, text, cssClass) {
    const p = document.createElement("p");
    p.className = cssClass;
    p.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Обработчики событий
  chatButton.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (msg) sendMessage(msg);
  });
  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && chatInput.value.trim()) {
      sendMessage(chatInput.value.trim());
    }
  });
});

