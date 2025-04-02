import { sendMessage } from "./utils";

// Функція відповіді на команду start
export async function sendStartMessage(chatId, message, env) {
  const firstName = message?.from?.first_name || 'друже';

  const keyboard = {
    inline_keyboard: [
      [
        { text: '❓ Допомога', callback_data: 'help' },
        { text: '🌐 Сайт', url: 'https://fluxie.pp.ua' }
      ]
    ]
  };

  return sendMessage(
    chatId,
    `✨ Вітаю, *${firstName}*!  
Я — *Флюксі*, твій безкоштовний асистент. 🚀  

Ось що я вмію:  
🗨️ Відповідаю на запитання  
🎨 Генерую зображення  
📚 Даю корисні поради  

Вибери опцію нижче, або просто напиши мені щось! 👇`,
    env,
    keyboard
  );
}

// Функція відповіді на команду help
export async function sendHelpMessage(chatId, env) {
  return sendMessage(chatId, '⚙️ В розробці..', env);
}

// Функція відповіді на команду settings
export async function sendSettingMessage(chatId, env) {
  return sendMessage(chatId, '⚙️ В розробці..', env)
}

// Функція для отримання ID користувача або стікера
export async function sendIdMessage(message, env) {
  const chatId = message.chat.id;
  const userId = message?.from?.id;

  if (message.reply_to_message && message.reply_to_message.sticker) {
    const stickerId = message.reply_to_message.sticker.file_id;
    return sendMessage(chatId, `🎭 ID цього стікера:\n\`${stickerId}\``, env);
  }

  return sendMessage(chatId, `🆔 Ваш ID: \`${userId}\``, env);
}
