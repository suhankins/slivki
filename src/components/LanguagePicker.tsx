import { Locale, i18n } from '@/lib/i18n-config';

export function LanguagePicker({
    selectedLang,
    setLang,
}: {
    selectedLang: Locale;
    setLang: (lang: Locale) => void;
}) {
    const languages = i18n.locales;
    return (
        <select
            className="select"
            onChange={(event) => {
                setLang(event.target.value as Locale);
            }}
        >
            {languages.map((lang) => (
                <option selected={lang === selectedLang}>{lang}</option>
            ))}
        </select>
    );
}
