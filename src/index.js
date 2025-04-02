export default {
	async fetch(request, env) {
		if (!env.BOT_TOKEN) {
			return new Response('Missing BOT_TOKEN', { status: 500 });
		}

		const data = await request.json();
		if (data.message) {
			return await processMessage(data.message, env);
		} else if (data.callback_query) {
			return await processQuery(data.callback_query, env);
		}

		return new Response('OK');
	}
};

async function processMessage(message, env) {
	const chatId = message.chat.id;
	const text = message.text;

	if (text === '/start') {
		return await sendStartMessage(chatId, env);
	} else if (text === '/help') {
		return await sendHelpMessage(chatId, env);
	}

	return sendMessage(chatId, 'Я не розумію цю команду.', env);
}

async function processQuery(query, env) {
	const chatId = query.message.chat.id;
	const data = query.data;

	await answerCallbackQuery(query.id, env);

	if (data === 'help') {
		return await sendHelpMessage(chatId, env);
	}

	return sendMessage(chatId, 'Невідома дія.', env);
}

async function answerCallbackQuery(callbackId, env) {
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

async function sendStartMessage(chatId, env) {
	const keyboard = {
		inline_keyboard: [
			[{ text: 'Допомога', callback_data: 'help' }],
			[{ text: 'Сайт', url: 'https://fluxie.pp.ua' }]
		]
	};

	return sendMessage(chatId, 'Привіт! Виберіть опцію:', env, keyboard);
}

async function sendHelpMessage(chatId, env) {
	return sendMessage(chatId, 'Це бот Флюксі. Він open-source! Сайт: https://fluxie.pp.ua', env);
}

async function sendMessage(chatId, text, env, replyMarkup = null) {
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
