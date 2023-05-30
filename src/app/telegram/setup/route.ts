import { telegramUrl } from '@/lib/telegramApi';

export const revalidate = 0;

/**
 * Sets the webhook for the bot.
 * Doesn't need to be called manually, building the project will do it automatically.
 */
export async function GET() {
    if (process.env.NODE_ENV === 'development')
        return new Response('Cannot set webhook in development mode');

    const result = await fetch(telegramUrl + 'setWebhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: process.env.NEXTAUTH_URL + 'telegram/webhook',
            secret_token: process.env.TELEGRAM_SECRET,
            allowed_updates: ['message'],
            drop_pending_updates: true,
        }),
    }).catch((err) => {
        console.error('Failed to register a webhook', err);
        return new Response('Failed to register a webhook', { status: 500 });
    });

    const text = await result.text();
    console.log('Registering webhook result:', text);
    return new Response(text);
}
