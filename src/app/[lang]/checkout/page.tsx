import { CartViewer } from '@/components/Cart/CartViewer';
import { Navbar } from '@/components/Navbar';
import { GoBackButton } from '@/components/buttons/GoBackButton';
import { Locale } from '@/lib/i18n-config';

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <>
            <Navbar>
                <GoBackButton />
            </Navbar>
            <main className="vertical-list mx-auto w-full max-w-screen-md p-4">
                <CartViewer lang={lang} />
            </main>
        </>
    );
}
