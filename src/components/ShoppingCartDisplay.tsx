'use client';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import { useContext, useMemo } from 'react';
import { CartContentsContext } from './CartProvider';

export function ShoppingCartDisplay() {
    const cart = useContext(CartContentsContext);
    const cartItemCount = useMemo(
        () => cart.reduce((a, b) => a + (b.quantity ?? 1), 0),
        [cart]
    );

    return (
        <div className="indicator">
            <span className="indicator-start indicator-bottom badge-secondary badge indicator-item bottom-1">
                {cartItemCount}
            </span>
            <button
                className={`animate-bounce-once btn-ghost btn-square btn relative`}
                type="button"
                aria-label="Shopping cart"
            >
                <ShoppingCartIcon className="absolute h-6 w-6" />
            </button>
        </div>
    );
}
