import { NextRequest } from 'next/server';
import {
    getCartString,
    getContactString,
    getValuesFromRequest,
    notifyListeners,
    validateCaptcha,
} from './utils';
import { isWorkingHours } from '@/utils/isWorkingHours';

/**
 * Order request handler.
 */
export async function POST(request: NextRequest): Promise<Response> {
    console.log('Order request received');

    if (!isWorkingHours()) {
        return new Response(
            'Online orders are not available outside of working hours',
            { status: 400 }
        );
    }

    const requstHandlingResponse = await getValuesFromRequest(request);
    if (requstHandlingResponse instanceof Response)
        return requstHandlingResponse;

    const { contactInfo, selectedWayToContact, cart, recaptchaValue } =
        requstHandlingResponse;

    const captchaValidationResponse = await validateCaptcha(recaptchaValue);
    if (captchaValidationResponse) return captchaValidationResponse;

    const contactString = getContactString(contactInfo, selectedWayToContact);
    if (contactString instanceof Response) return contactString;

    const cartString = await getCartString(cart);
    if (cartString instanceof Response) return cartString;

    console.log('Order request received', contactString, cartString);
    await notifyListeners(contactString, cartString);

    return new Response('Order request received', { status: 200 });
}
