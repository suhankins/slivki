import { TelegramMessage, TelegramUpdate, callApi } from '@/lib/telegramApi';
import { ListenerClass, ListenerModel } from '@/models/Listener';
import { NextRequest } from 'next/server';
import { DocumentType } from '@typegoose/typegoose';

export async function POST(request: NextRequest): Promise<Response> {
    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secretToken !== process.env.TELEGRAM_SECRET)
        return new Response('Unauthorized', { status: 401 });

    const { message } = (await request.json()) as TelegramUpdate;

    if (!message || !message.text) return new Response('OK');
    if (checkPrivate(message)) return new Response('OK');

    const listener = await ListenerModel.findOne({
        telegramId: message.chat.id,
    });

    if (listener) await handleListener(message, listener);
    else await handleNotListener(message);

    return new Response('OK');
}

/**
 * Checks if message was sent in private chat, else sends a message that the bot only works in private chat
 * @returns true if message was sent in private chat, false otherwise
 */
function checkPrivate(message: TelegramMessage): boolean {
    if (message.chat.type !== 'private') {
        console.log('Message sent in a group, ignoring');
        callApi('sendMessage', {
            chat_id: message.chat.id,
            text: 'This bot only works in private chat',
        });
        return false;
    }
    console.log('Message sent in private chat');
    return true;
}

async function handleListener(
    message: TelegramMessage,
    listener: DocumentType<ListenerClass>
): Promise<void> {
    console.log('Listener found');
    if (message.text.trim().toLowerCase() === 'unsubscribe') {
        console.log('Unsubscribing');
        try {
            await listener.delete();
            await callApi('sendMessage', {
                chat_id: message.chat.id,
                text: 'You have been unsubscribed',
            });
            console.log('Unsubscribed');
        } catch (e) {
            console.log(e);
            await callApi('sendMessage', {
                chat_id: message.chat.id,
                text: `Error unsubscribing: ${e}`,
            });
        }
    }
}

async function handleNotListener(message: TelegramMessage): Promise<void> {
    console.log('Listener not found');
    if (message.text !== process.env.TELEGRAM_PASSWORD) {
        console.log('Wrong password');
        await callApi('sendMessage', {
            chat_id: message.chat.id,
            text: 'Wrong password',
        });
        return;
    }
    console.log('Password correct');

    try {
        console.log('Subscribing');
        await ListenerModel.create({ telegramId: message.chat.id });
        await callApi('sendMessage', {
            chat_id: message.chat.id,
            text: 'You have been subscribed',
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Unsubscribe',
                        },
                    ],
                ],
                one_time_keyboard: true,
            },
        });
        console.log('Subscribed');
    } catch (e) {
        console.log(e);
        await callApi('sendMessage', {
            chat_id: message.chat.id,
            text: `Error subscribing: ${e}`,
        });
    }
}
