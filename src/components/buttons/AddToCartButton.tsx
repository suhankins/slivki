'use client';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import { CartContext } from '../CartProvider';
import { useContext } from 'react';

export function AddToCartButton() {
    const { addToCart } = useContext(CartContext);
    return (
        <button
            className="btn-success btn-square btn"
            title="Add to cart"
            type="button"
            onClick={() =>
                addToCart({
                    name: {
                        en: 'Latte',
                        ru: 'Латте',
                    },
                    price: 5,
                    categoryId: 'placeholder',
                    itemIndex: 0,
                })
            }
        >
            <ShoppingCartIcon className="absolute h-6 w-6" />
        </button>
    );
}
