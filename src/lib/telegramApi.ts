export const telegramUrl =
    'https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/';

export async function callApi(method: string, content: any) {
    const result = await fetch(telegramUrl + method, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
        next: {
            revalidate: 0,
        },
    });
    console.log(`Called ${method} on telegram. Response:`, await result.text());
    return result;
}
