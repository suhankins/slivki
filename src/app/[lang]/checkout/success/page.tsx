import { getDictionary } from '@/lib/getDictionary';
import { Locale } from '@/lib/i18n-config';

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <>
            <h1 className="text-center text-4xl font-extrabold">
                {dictionary.orderSuccess.thankYou}
            </h1>
            <p className="text-center text-xl">
                {dictionary.orderSuccess.ifWeDontContact}
            </p>
            <div className="flex flex-col items-center md:flex-row">
                <a
                    className="btn-primary btn text-2xl normal-case"
                    href="https://example.com/" // TODO: Replace with real URL
                    target="_blank"
                >
                    Telegram
                </a>
                <div className="divider">or</div>
                <a
                    className="btn-primary btn text-2xl normal-case"
                    href="https://www.instagram.com/slivki_coffee_ge/"
                    target="_blank"
                >
                    Instagram
                </a>
            </div>
        </>
    );
}
