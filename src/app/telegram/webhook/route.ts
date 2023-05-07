import { telegramUrl } from '@/utils/server/telegramUrl';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    if (
        request.headers.get('X-Telegram-Bot-Api-Secret-Token') !==
        process.env.TELEGRAM_SECRET
    )
        return new Response('Unauthorized', { status: 401 });
    const { message } = await request.json();
    await fetch(telegramUrl + 'sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: message.chat.id,
            text: `Hello, World!\n\nYou said: ${message.text}`,
        }),
    });
    return new Response('OK');
}
