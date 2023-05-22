import { TelegramMessage, callApi } from '@/lib/telegramApi';
import { ListenerClass, ListenerModel } from '@/models/Listener';
import { DocumentType } from '@typegoose/typegoose';

/**
 * Handles a message from a listener
 */
export async function handleListener(
    message: TelegramMessage,
    listener: DocumentType<ListenerClass>
): Promise<void> {
    if (!message.text) {
        console.log('No text, ignoring');
        return;
    }
    if (message.text.trim().toLowerCase() === 'unsubscribe') {
        console.log('Unsubscribing');
        try {
            await listener.delete();
            await callApi('sendMessage', {
                chat_id: message.chat.id,
                text: 'You have been unsubscribed',
            });
            console.log('Unsubscribed');
            return;
        } catch (e) {
            console.log(e);
            await callApi('sendMessage', {
                chat_id: message.chat.id,
                text: `Error unsubscribing: ${e}`,
            });
            return;
        }
    }
    await callApi('sendMessage', {
        chat_id: message.chat.id,
        text: 'You are already subscribed',
    });
    console.log('Already subscribed');
}

/**
 * Handles a message from a non-listener
 */
export async function handleNotListener(
    message: TelegramMessage
): Promise<void> {
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
