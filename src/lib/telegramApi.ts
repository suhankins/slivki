export const telegramUrl =
    'https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/';

export function sendMessage(chat_id: string, text: string) {
    return fetch(telegramUrl + 'sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id, text }),
    });
}
