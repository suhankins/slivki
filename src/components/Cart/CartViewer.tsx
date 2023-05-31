'use client';

import { useContext } from 'react';
import { CartActionContext, CartContentsContext } from './CartProvider';
import { Locale } from '@/lib/i18n-config';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export function CartViewer({
    lang,
    dictionary,
}: {
    lang: Locale;
    dictionary: {
        total: string;
    };
}) {
    const { addToCart, removeFromCart } = useContext(CartActionContext);
    const cart = useContext(CartContentsContext);

    return (
        <table className="w-full border-collapse">
            <tbody>
                {cart.map((item, index) => (
                    <tr key={index} className="border-b-2">
                        <td className="w-full py-3">
                            <p className="text-lg font-bold">
                                {item.name[lang]}
                            </p>
                            <p className="text-sm">{item.sizeString}</p>
                        </td>
                        <td className="px-2">
                            <button
                                className="btn-primary btn-square btn"
                                onClick={() => removeFromCart(item)}
                            >
                                {item.quantity && item.quantity > 1 ? (
                                    <MinusIcon className="h-6 w-6" />
                                ) : (
                                    <TrashIcon className="h-6 w-6" />
                                )}
                            </button>
                        </td>
                        <td>
                            <p className="w-full px-2 text-center text-3xl font-bold">
                                {item.quantity ?? 1}
                            </p>
                        </td>
                        <td className="px-2">
                            <button
                                className="btn-primary btn-square btn"
                                onClick={() => addToCart(item)}
                            >
                                <PlusIcon className="h-6 w-6" />
                            </button>
                        </td>
                        <td className="px-4">
                            <p className="text-right text-3xl font-bold">
                                {item.price * (item.quantity ?? 1)}&#8382;
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td />
                    <td className="w-full py-3" colSpan={3}>
                        <p className="text-right text-2xl font-bold">
                            {dictionary.total}
                        </p>
                    </td>
                    <td className="px-4">
                        <p className="text-3xl font-bold">
                            {cart.reduce(
                                (acc, item) =>
                                    acc + item.price * (item.quantity ?? 1),
                                0
                            )}
                            &#8382;
                        </p>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}
