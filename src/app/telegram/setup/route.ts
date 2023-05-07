import { telegramUrl } from '@/utils/server/telegramUrl';

/**
 * Sets the webhook for the bot.
 * Doesn't need to be called manually, building the project will do it automatically.
 */
export async function GET() {
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
    });
    const text = await result.text();
    return new Response(text);
}
