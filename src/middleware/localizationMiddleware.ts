import { i18n, Locale } from '@/lib/i18n-config';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Tries to get the locale from the cookie. If it doesn't exist, it returns the default locale.
 */
function getLocale(request: NextRequest) {
    const prefered = request.cookies.get('language');
    // Check if the cookie is set and if it is a valid locale
    if (
        prefered === undefined ||
        prefered === null ||
        !i18n.locales.includes(prefered.value as Locale)
    ) {
        return i18n.defaultLocale;
    }
    return prefered.value;
}

/**
 * Checks if url we are trying to access has a locale in it. If not, it redirects to the same url with the locale in it.
 */
export function localizationMiddleware(
    request: NextRequest,
    response: NextResponse
) {
    const pathname = request.nextUrl.pathname;
    // If the url starts with /api/ we don't need to do anything
    if (pathname.startsWith('/api/')) return response;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }

    const chosenLocale = pathname.split('/')[1];
    // Setting a cookie if the locale in the url is different from the locale in the cookie
    if (chosenLocale !== getLocale(request))
        response.cookies.set('language', chosenLocale);
    return response;
}
