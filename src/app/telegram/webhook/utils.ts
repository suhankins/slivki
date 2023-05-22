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
            try {
                await callApi('sendMessage', {
                    chat_id: message.chat.id,
                    text: `Error unsubscribing: ${e}`,
                });
            } catch (e) {
                console.error(
                    'Error while sending a message that unsubscription failed!',
                    e
                );
            }
            return;
        }
    }
    try {
        await callApi('sendMessage', {
            chat_id: message.chat.id,
            text: 'You are already subscribed',
        });
        console.log('Already subscribed');
    } catch (e) {
        console.error(
            'Error while sending a message that user is already subscribed!',
            e
        );
    }
}

/**
 * Handles a message from a non-listener
 */
export async function handleNotListener(
    message: TelegramMessage
): Promise<void> {
    if (
        !message.text ||
        message.text.trim() !== process.env.TELEGRAM_PASSWORD
    ) {
        console.log('Wrong password');
        try {
            await callApi('sendMessage', {
                chat_id: message.chat.id,
                text: 'Wrong password',
            });
        } catch (e) {
            console.error(
                'Error while sending a message that password was wrong!',
                e
            );
        }
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
        try {
            await callApi('sendMessage', {
                chat_id: message.chat.id,
                text: `Error subscribing: ${e}`,
            });
        } catch (e) {
            console.error(
                'Error while sending a message that subscription failed!',
                e
            );
        }
    }
}
