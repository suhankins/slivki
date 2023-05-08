export const telegramUrl =
    'https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/';

export async function sendMessage(chat_id: string, text: string) {
    const result = await fetch(telegramUrl + 'sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id, text }),
    });
    console.log('Sent message to telegram. Response:', result);
    return result;
}
