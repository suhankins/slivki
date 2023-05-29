'use client';

import {
    Locale,
    LocalizedString,
    getLocalizedString,
    newLocalizedString,
} from '@/lib/i18n-config';
import { waysToContact } from '@/lib/waysToContact';
import {
    FormEvent,
    FormEventHandler,
    createRef,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { CartContentsContext } from './CartProvider';
import ReCAPTCHA from 'react-google-recaptcha';

export function OrderForm({ lang }: { lang: Locale }) {
    const [selectedWayToContact, setSelectedWayToContact] = useState<number>(0);
    const [contactInfo, setContactInfo] = useState<string>('');
    const recaptchaRef = createRef<ReCAPTCHA>();
    const [error, setError] = useState<LocalizedString | null>(null);
    const cart = useContext(CartContentsContext);

    // Reset contact info when changing way to contact
    useEffect(() => {
        setContactInfo('');
    }, [selectedWayToContact]);

    useEffect(() => {
        setError(waysToContact[selectedWayToContact].validation(contactInfo));
    }, [contactInfo, selectedWayToContact]);

    const totalPrice = useMemo(
        () =>
            cart.reduce(
                (total, item) => total + item.price * (item.quantity ?? 1),
                0
            ),
        [cart]
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            // TODO: Move localization to dictionary
            setError(
                newLocalizedString()
                    .set('en', 'Please complete the reCAPTCHA verification')
                    .set('ru', 'Пожалуйста, пройдите проверку reCAPTCHA')
            );
            return;
        }
        const result = await fetch('/order', {
            method: 'POST',
            body: JSON.stringify({
                contactInfo,
                selectedWayToContact,
                cart,
                recaptchaValue,
            }),
        });
        if (!result.ok) {
            // TODO: Move localization to dictionary
            setError(
                newLocalizedString()
                    .set('en', 'Something went wrong, please try again later')
                    .set(
                        'ru',
                        'Что-то пошло не так. Пожалуйста, попробуйте позже'
                    )
            );
            return;
        }
        // TODO: Add a page for successful order
    };

    if (totalPrice < 20)
        return (
            <div className="alert alert-error">
                <div>
                    <span>
                        Delivery is only available for orders of 20&#8382; or
                        more
                    </span>
                </div>
            </div>
        );
    return (
        <form
            className="flex w-full flex-col items-center gap-2"
            onSubmit={handleSubmit}
        >
            <h1 className="text-xl">How would you like us to contant you?</h1>
            <div className="flex w-full justify-evenly">
                {waysToContact.map((way, index) => (
                    <label
                        className="label cursor-pointer flex-col"
                        key={index}
                    >
                        <p>{getLocalizedString(way.name, lang)}</p>
                        <input
                            type="radio"
                            className="radio-primary radio radio-lg"
                            checked={selectedWayToContact === index}
                            onChange={() => setSelectedWayToContact(index)}
                        />
                    </label>
                ))}
            </div>
            <div className="form-control">
                <label className="input-group">
                    <span>{waysToContact[selectedWayToContact].prefix}</span>
                    <input
                        type="text"
                        placeholder={
                            waysToContact[selectedWayToContact].placeholder
                        }
                        onInput={(e) => setContactInfo(e.currentTarget.value)}
                        value={contactInfo}
                        maxLength={
                            waysToContact[selectedWayToContact].maxLength
                        }
                        minLength={
                            waysToContact[selectedWayToContact].minLength
                        }
                        className="input-bordered input w-full max-w-2xl"
                        required
                    />
                </label>
                <label className="label">
                    <span className="h-6 text-error">
                        {error && getLocalizedString(error, lang)}
                    </span>
                </label>
            </div>
            {waysToContact[selectedWayToContact].warning && (
                <div className="alert alert-warning">
                    <div>
                        <span>
                            {getLocalizedString(
                                waysToContact[selectedWayToContact].warning,
                                lang
                            )}
                        </span>
                    </div>
                </div>
            )}
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                onChange={() => setError(null)}
            />
            <button
                className="btn-success btn-block btn"
                type="submit"
                disabled={!!error}
            >
                Order
            </button>
        </form>
    );
}
