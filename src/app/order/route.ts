import { NextRequest } from 'next/server';
import {
    checkTime,
    getCartString,
    getContactString,
    getValuesFromRequest,
    notifyListeners,
    validateCaptcha,
} from './utils';

/**
 * Order request handler.
 */
export async function POST(request: NextRequest): Promise<Response> {
    console.log('Order request received');

    const checkTimeResult = checkTime();
    if (checkTimeResult instanceof Response) return checkTimeResult;

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
