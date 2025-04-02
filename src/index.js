import { sendHelpMessage, sendIdMessage, sendSettingMessage, sendStartMessage } from "./tech";
import { sendMessage, answerCallbackQuery } from "./utils";

export default {
	async fetch(request, env) {
		if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

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
		return await sendStartMessage(chatId, message, env);
	} else if (text === '/help') {
		return await sendHelpMessage(chatId, env);
	} else if (text === '/settings') {
		return await sendSettingMessage(chatId, env);
	} else if (text === '/id') {
		return await sendIdMessage(message, env);
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
