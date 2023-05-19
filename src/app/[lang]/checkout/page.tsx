'use client';

import { CartContentsContext } from '@/components/CartProvider';
import { useContext } from 'react';

export default function page() {
    const cart = useContext(CartContentsContext);
    return (
        <div>
            <h1>Checkout</h1>
            <p>Cart contents:</p>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name.en} ({item.sizeString}) x {item.quantity} |{' '}
                        {item.price}$
                    </li>
                ))}
            </ul>
        </div>
    );
}
