import { Locale, i18n } from '@/lib/i18n-config';
import Link from 'next/link';

export function LanguagePickerViewer({
    selectedLang,
}: {
    selectedLang: Locale;
}) {
    const languages = i18n.locales;
    return (
        <div className="dropdown-end dropdown ml-auto">
            <label tabIndex={0} className="btn-ghost btn m-1">
                {selectedLang}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box bg-base-100 p-2 uppercase text-neutral shadow"
            >
                {languages.map(
                    (locale) =>
                        locale !== selectedLang && (
                            <li>
                                <Link href={`/${locale}`}>{locale}</Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}
