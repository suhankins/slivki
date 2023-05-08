import { callApi } from '@/lib/telegramApi';
import { ListenerModel } from '@/models/Listener';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secretToken !== process.env.TELEGRAM_SECRET)
        return new Response('Unauthorized', { status: 401 });

    const { message } = await request.json();

    if (!message || !message.text) return new Response('OK');

    const chatId = message.chat.id;

    if (message.chat.type !== 'private') {
        console.log('Message sent in a group, ignoring');
        await callApi('sendMessage', {
            chat_id: chatId,
            text: 'This bot only works in private chats',
        });
        return new Response('OK');
    }

    const text: string = message.text;
    if (
        text.trim().toLowerCase() === 'unsubscribe' &&
        (await ListenerModel.findOne({ telegramId: chatId })) !== null
    ) {
        console.log('Unsubscribing');
        await ListenerModel.findOneAndDelete({ telegramId: chatId });
        await callApi('sendMessage', {
            chat_id: chatId,
            text: 'You have been unsubscribed',
        });
        return new Response('OK');
    }

    if (text !== process.env.TELEGRAM_PASSWORD) {
        console.log('Wrong password');
        await callApi('sendMessage', {
            chat_id: chatId,
            text: 'Wrong password',
        });
        return new Response('OK');
    }

    try {
        console.log('Subscribing');
        await ListenerModel.create({ telegramId: chatId });
        await callApi('sendMessage', {
            chat_id: chatId,
            text: 'You have been subscribed',
        });
        await callApi('ReplyKeyboardMarkup', {
            keyboard: [
                {
                    text: 'Unsubscribe',
                },
            ],
            is_persistent: true,
        });
    } catch (e) {
        console.log(e);
        await callApi('sendMessage', {
            chat_id: chatId,
            text: 'You are already subscribed',
        });
    }

    console.log('Done');
    return new Response('OK');
}
