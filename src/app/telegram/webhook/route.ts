import { TelegramUpdate, callApi } from '@/lib/telegramApi';
import { ListenerModel } from '@/models/Listener';
import { NextRequest } from 'next/server';
import { handleListener, handleNotListener } from './utils';

/**
 * Handles a POST request to the webhook
 * @returns a 401 response if the secret token is incorrect, a 200 response otherwise
 */
export async function POST(request: NextRequest): Promise<Response> {
    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secretToken !== process.env.TELEGRAM_SECRET) {
        console.log('Wrong secret token');
        return new Response('Unauthorized', { status: 401 });
    }

    const { message } = (await request.json()) as TelegramUpdate;

    if (!message || !message.text) {
        console.log('Message does not contain text, ignoring');
        return new Response('Message does not contain text, ignoring');
    }
    if (message.chat.type !== 'private') {
        console.log('Message not in private chat, replying');
        await callApi('sendMessage', {
            chat_id: message.chat.id,
            text: 'This bot only works in private chat',
        });
        console.log('Chat notified that bot only works in private chat');
        return new Response('Message not in private chat');
    }

    const listener = await ListenerModel.findOne({
        telegramId: message.chat.id,
    });

    if (listener) {
        console.log('Listener found');
        await handleListener(message, listener);
    } else {
        console.log('Listener not found');
        await handleNotListener(message);
    }

    return new Response('OK');
}
