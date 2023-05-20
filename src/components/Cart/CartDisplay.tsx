'use client';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import { useContext, useMemo, useRef } from 'react';
import { CartContentsContext } from './CartProvider';
import Link from 'next/link';

export function CartDisplay() {
    const cart = useContext(CartContentsContext);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const cartItemCount = useMemo(() => {
        buttonRef?.current?.classList.add('animate-ping-once');
        return cart.reduce((a, b) => a + (b.quantity ?? 1), 0);
    }, [cart]);

    const handleAnimationEnd = useMemo(
        () => () => {
            buttonRef?.current?.classList.remove('animate-ping-once');
        },
        []
    );

    return (
        <Link
            className="btn-ghost btn-square btn relative mr-3"
            type="button"
            aria-label="Shopping cart"
            ref={buttonRef}
            onAnimationEnd={handleAnimationEnd}
            href={'/checkout'}
        >
            <div className="indicator absolute">
                {cartItemCount !== 0 && (
                    <span className="indicator-start indicator-bottom badge-secondary badge indicator-item">
                        {cartItemCount}
                    </span>
                )}
                <ShoppingCartIcon className="h-6 w-6" />
            </div>
        </Link>
    );
}
