'use client';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import { CartActionContext, CartItem } from '../CartProvider';
import { useContext } from 'react';

export function AddToCartButton({ cartItem }: { cartItem: CartItem }) {
    const { addToCart } = useContext(CartActionContext);
    return (
        <button
            className="btn-success btn-square btn"
            title="Add to cart"
            type="button"
            onClick={() => addToCart(cartItem)}
        >
            <ShoppingCartIcon className="absolute h-6 w-6" />
        </button>
    );
}
