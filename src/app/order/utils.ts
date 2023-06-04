import { CartItem } from '@/components/Cart/CartProvider';
import { getLocalizedString } from '@/lib/i18n-config';
import { callApi } from '@/lib/telegramApi';
import { waysToContact } from '@/lib/waysToContact';
import { CategoryModel } from '@/models/Category';
import { ListenerModel } from '@/models/Listener';
import { mongoose } from '@typegoose/typegoose';
import { NextRequest } from 'next/server';

export async function getCartString(
    cart: CartItem[]
): Promise<string | Response> {
    console.log(`Creating cart string out of ${cart.length} items`);
    let cartString = '';
    let total = 0;
    for (const item of cart) {
        const { selectedSize, categoryId, itemIndex, quantity } = item;
        if (
            typeof selectedSize !== 'number' ||
            typeof categoryId !== 'string' ||
            typeof itemIndex !== 'number' ||
            (typeof quantity !== 'undefined' && // Quantity is optional
                (typeof quantity !== 'number' || quantity < 1)) // But if it's specified, it must be a positive number
        ) {
            console.log(
                'Cart item type check failed\nSelected size: ',
                selectedSize,
                '\nCategory ID: ',
                categoryId,
                '\nItem index: ',
                itemIndex,
                '\nQuantity: ',
                quantity
            );
            return new Response('Invalid cart item', { status: 400 });
        }
        let category;
        try {
            const convertedId = new mongoose.Types.ObjectId(categoryId);
            category = await CategoryModel.findById(convertedId);
        } catch (err) {
            console.error('Error while converting category id', err);
            return new Response('Error while converting category id', {
                status: 400,
            });
        }
        if (!category) {
            console.log(
                'Category with given category ID is not found',
                categoryId
            );
            return new Response('Invalid category in an item', { status: 400 });
        }
        const { name, items, sizes } = category;
        if (!items || !items[itemIndex]) {
            console.log('Item with given itemIndex is not found', itemIndex);
            return new Response('Invalid itemIndex', {
                status: 400,
            });
        }
        if (sizes && sizes.length > 0 && !sizes[selectedSize]) {
            console.log(
                'Size with given selectedSize is not found',
                selectedSize,
                sizes
            );
            return new Response('Invalid selectedSize', {
                status: 400,
            });
        }

        const { name: itemName, price: prices } = items[itemIndex];
        if (!itemName || !prices) {
            console.log(
                "Item either doesn't have a name, a price, or both",
                itemName,
                prices
            );
            return new Response('Invalid item', { status: 400 });
        }
        const price = prices[selectedSize];
        if (!price) {
            console.log(
                'Price with given selectedSize is not found',
                selectedSize,
                prices
            );
            return new Response('Invalid price', { status: 400 });
        }

        cartString += `${getLocalizedString(name, 'ru')}: ${getLocalizedString(
            itemName,
            'ru'
        )}`;
        if (sizes && sizes.length > 0) cartString += `(${sizes[selectedSize]})`;
        cartString += `: ${price} GEL x${quantity ?? 1}\n`;
        total += price * (quantity ?? 1);
        console.log('Item added to cart string');
    }
    if (total < 20) {
        console.log(
            'Total is less than 20 GEL, rejecting order\nTotal: ',
            total
        );
        return new Response('Total is less than 20 GEL', { status: 400 });
    }
    cartString += `Total: ${total} GEL`;
    return cartString;
}

export function getContactString(
    contactInfo: string,
    selectedWayToContact: number
): string | Response {
    console.log('Validating contact info');
    const selectedWay = waysToContact[selectedWayToContact];
    if (!selectedWay) {
        console.log('Invalid selected way to contact');
        return new Response('Invalid selected way to contact', { status: 400 });
    }
    if (selectedWay.validation(contactInfo) !== null) {
        console.log(
            'Contact info validation failed',
            contactInfo,
            selectedWayToContact
        );
        return new Response('Invalid contact info', { status: 400 });
    }
    console.log('Contact info validated');
    return `${selectedWay.name.get('en')}: ${contactInfo}`;
}

export async function getValuesFromRequest(request: NextRequest): Promise<
    | {
          contactInfo: string;
          selectedWayToContact: number;
          cart: CartItem[];
          recaptchaValue: string;
      }
    | Response
> {
    console.log('Getting values from request');
    const json = await request.json().catch((err) => {
        console.error('Error while parsing request body', err);
        return new Response('Error while parsing request body', {
            status: 400,
        });
    });
    const { contactInfo, selectedWayToContact, cart, recaptchaValue } = json;
    if (
        typeof contactInfo !== 'string' ||
        typeof selectedWayToContact !== 'number' ||
        !Array.isArray(cart) ||
        typeof recaptchaValue !== 'string'
    ) {
        return new Response('Request is missing fields', { status: 400 });
    }
    console.log('Values from request received');
    return { contactInfo, selectedWayToContact, cart, recaptchaValue };
}

export async function validateCaptcha(
    recaptchaValue: string
): Promise<Response | void> {
    console.log('Validating captcha');
    const captchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaValue}`,
        }
    ).catch((err) => {
        console.error('Error while validating captcha', err);
        return new Response('Error while validating captcha', { status: 500 });
    });
    if (!captchaResponse || !captchaResponse.ok) {
        console.error('Unknown error while validating captcha');
        return new Response('Error while validating captcha', { status: 500 });
    }
    const captchaResponseJson = await captchaResponse.json();
    if (!captchaResponseJson.success) {
        console.error('Captcha validation failed');
        return new Response('Captcha validation failed', { status: 400 });
    }
    console.log('Captcha validation successful');
}

export async function notifyListeners(
    contactString: string,
    cartString: string
) {
    const listeners = await ListenerModel.find();
    console.log('Sending message to listeners');
    for (const listener of listeners) {
        console.log('Sending message to listener', listener.telegramId);
        const result = await callApi('sendMessage', {
            chat_id: listener.telegramId,
            text: `New order!\n\n${contactString}\n\n${cartString}`,
        }).catch((err) => {
            console.error('Error while sending message to listener', err);
            // TODO: Delete already sent messages?
            return new Response('Error while sending message to listener', {
                status: 500,
            });
        });
        if (!result || !result.ok) {
            console.error('Error while sending message to listener', result);
            // TODO: Delete already sent messages?
            return new Response('Error while sending message to listener', {
                status: 500,
            });
        } else {
            console.log("Message successfully sent to listener's chat");
        }
    }
    console.log('Listeners notified');
}
