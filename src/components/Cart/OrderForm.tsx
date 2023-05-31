'use client';

import { Locale, getLocalizedString } from '@/lib/i18n-config';
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
import { CartActionContext, CartContentsContext } from './CartProvider';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/navigation';

export function OrderForm({
    lang,
    dictionary,
}: {
    lang: Locale;
    dictionary: {
        errors: {
            recaptcha: string;
            somethingWentWrong: string;
        };
        order: string;
        orderMinimum: string;
        howToContactYou: string;
    };
}) {
    const router = useRouter();

    const [selectedWayToContact, setSelectedWayToContact] = useState<number>(0);
    const [contactInfo, setContactInfo] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const recaptchaRef = createRef<ReCAPTCHA>();

    const { clearCart } = useContext(CartActionContext);
    const cart = useContext(CartContentsContext);

    const wayToContact = waysToContact[selectedWayToContact];

    // Reset contact info when changing way to contact
    useEffect(() => {
        setContactInfo('');
    }, [selectedWayToContact]);

    useEffect(() => {
        setError(
            getLocalizedString(wayToContact.validation(contactInfo), lang)
        );
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
            setError(dictionary.errors.recaptcha);
            return;
        }
        setLoading(true);
        const result = await fetch('/order', {
            method: 'POST',
            body: JSON.stringify({
                contactInfo,
                selectedWayToContact,
                cart,
                recaptchaValue,
            }),
        });
        setLoading(false);
        if (!result.ok) {
            setError(dictionary.errors.somethingWentWrong);
            return;
        }
        clearCart();
        router.push('/checkout/success');
    };

    if (totalPrice < 20)
        return (
            <div className="alert alert-error">
                <div>
                    <span>{dictionary.orderMinimum}</span>
                </div>
            </div>
        );
    return (
        <form
            className="flex w-full flex-col items-center gap-2"
            onSubmit={handleSubmit}
        >
            <h1 className="text-xl">{dictionary.howToContactYou}</h1>
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
                    <span>{wayToContact.prefix}</span>
                    <input
                        type="text"
                        placeholder={wayToContact.placeholder}
                        onInput={(e) => setContactInfo(e.currentTarget.value)}
                        value={contactInfo}
                        maxLength={wayToContact.maxLength}
                        minLength={wayToContact.minLength}
                        className="input-bordered input w-full max-w-2xl"
                        required
                    />
                </label>
                <label className="label">
                    <span className="h-6 text-error">{error}</span>
                </label>
            </div>
            {wayToContact.warning && (
                <div className="alert alert-warning">
                    <div>
                        <span>
                            {getLocalizedString(wayToContact.warning, lang)}
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
                className={`btn-success btn-block btn ${
                    loading ? 'loading' : ''
                }`}
                type="submit"
                disabled={!!error || loading}
            >
                {dictionary.order}
            </button>
        </form>
    );
}
