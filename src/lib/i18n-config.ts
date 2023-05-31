export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
} as const;

export function getLocalizedString(
    localizedString: LocalizedString | LocalizedStringObject | null | undefined,
    locale: Locale,
    fallback: boolean = true
): string {
    if (!localizedString) return '';
    if (localizedString instanceof Map)
        return (
            localizedString.get(locale) ||
            (fallback && localizedString.get(i18n.defaultLocale)) ||
            ''
        );
    return (
        localizedString[locale] ||
        (fallback && localizedString[i18n.defaultLocale]) ||
        ''
    );
}

export type Locale = (typeof i18n)['locales'][number];

export type LocalizedString = Map<Locale, string>;

export function newLocalizedString() {
    return new Map<Locale, string>();
}

export function mapToObject(map: LocalizedString): LocalizedStringObject {
    const obj: LocalizedStringObject = {} as any;
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

export type LocalizedStringObject = { [locale in Locale]: string };
