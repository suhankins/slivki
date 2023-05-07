import { sendMessage, telegramUrl } from '@/lib/telegramApi';
import { ListenerModel } from '@/models/Listener';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    if (
        request.headers.get('X-Telegram-Bot-Api-Secret-Token') !==
        process.env.TELEGRAM_SECRET
    )
        return new Response('Unauthorized', { status: 401 });
    const { message } = await request.json();
    if (!message || !message.text || message.chat.type !== 'private') {
        return new Response('OK');
    }
    const text: string = message.text;
    if (
        text.trim().toLowerCase() === 'unsubscribe' &&
        (await ListenerModel.findById(message.chat.id)) !== null
    ) {
        await ListenerModel.findByIdAndDelete(message.chat.id);
        sendMessage(message.chat.id, 'You have been unsubscribed');
        return new Response('OK');
    }
    if (text !== process.env.TELEGRAM_PASSWORD) {
        sendMessage(message.chat_id, 'Wrong password');
        return new Response('OK');
    }

    try {
        await ListenerModel.create({ _id: message.chat.id });
        await fetch(telegramUrl + 'ReplyKeyboardMarkup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keyboard: [
                    {
                        text: 'Unsubscribe',
                    },
                ],
                is_persistent: true,
            }),
        });
    } catch (e) {
        await sendMessage(
            message.chat.id,
            'You are already in the club, buddy!'
        );
    }
    return new Response('OK');
}
