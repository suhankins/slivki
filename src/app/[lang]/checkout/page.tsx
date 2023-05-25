import { CartViewer } from '@/components/Cart/CartViewer';
import { OrderForm } from '@/components/Cart/OrderForm';
import { Locale } from '@/lib/i18n-config';

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <>
            <CartViewer lang={lang} />
            <OrderForm lang={lang} />
        </>
    );
}
