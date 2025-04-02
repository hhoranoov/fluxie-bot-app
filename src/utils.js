// Функція надсилання повідомлення
export async function sendMessage(chatId, text, env, replyMarkup = null) {
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    ...(replyMarkup && { reply_markup: replyMarkup })
  };

  return fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

// Функція відповіді callback
export async function answerCallbackQuery(callbackId, env) {
  const body = {
    callback_query_id: callbackId,
    show_alert: false
  };

  return fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).catch(error => console.error('Error answering callback query:', error));
}
