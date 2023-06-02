import { CartViewer } from '@/components/Cart/CartViewer';
import { OrderForm } from '@/components/OrderForm';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <>
            <CartViewer lang={lang} dictionary={dictionary.cartViewer} />
            <OrderForm lang={lang} dictionary={dictionary.orderForm} />
        </>
    );
}
