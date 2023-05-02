export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
} as const;

export function getLocalizedString(
    localizedString: LocalizedString | LocalizedStringObject,
    locale: Locale
): string {
    if (localizedString instanceof Map)
        return (
            localizedString.get(locale) ??
            localizedString.get(i18n.defaultLocale) ??
            'MISSING STRING'
        );
    return (
        localizedString[locale] ??
        localizedString[i18n.defaultLocale] ??
        'MISSING STRING'
    );
}

export type Locale = (typeof i18n)['locales'][number];

export type LocalizedString = Map<Locale, string>;

export type LocalizedStringObject = { [locale in Locale]: string };
