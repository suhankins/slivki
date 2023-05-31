import { LanguagePickerViewer } from '@/components/LanguagePicker/LanguagePickerViewer';
import { Navbar } from '@/components/Navbar';
import { GoBackButton } from '@/components/buttons/GoBackButton';
import { Locale } from '@/lib/i18n-config';
import Link from 'next/link';

export default function Layout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    return (
        <>
            <Navbar>
                <GoBackButton />
                <Link href="/" className="btn-ghost btn text-xl normal-case">
                    Slivki
                </Link>
                <LanguagePickerViewer selectedLang={lang} />
            </Navbar>
            <main className="vertical-list mx-auto w-full max-w-screen-md p-4">
                {children}
            </main>
        </>
    );
}
