'use client';

import { LocalizedStringObject } from '@/lib/i18n-config';
import { createContext, useEffect, useReducer } from 'react';

export interface CartItem {
    name: LocalizedStringObject;
    price: number;
    categoryId: string;
    itemIndex: number;
    quantity?: number;
}

export type Cart = CartItem[];

export type CartAction = {
    type: 'ADD_ITEM' | 'REMOVE_ITEM';
    payload: CartItem;
};

const itemEquals = (a: CartItem, b: CartItem): boolean =>
    a.categoryId === b.categoryId && a.itemIndex === b.itemIndex;

function cartReducer(state: Cart, action: CartAction) {
    switch (action.type) {
        case 'ADD_ITEM':
            console.log('Adding item to cart');
            const foundItem = state.find((item) =>
                itemEquals(item, action.payload)
            );
            if (!foundItem) return [...state, action.payload];
            foundItem.quantity = (foundItem.quantity ?? 1) + 1;
            return state;
        case 'REMOVE_ITEM':
            console.log('Removing item from cart');
            return state.filter((item) => !itemEquals(item, action.payload));
        default:
            return state;
    }
}

export const CartContext = createContext({
    addToCart: (item: CartItem) => {},
    removeFromCart: (item: CartItem) => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        console.log('Items updated!', cartItems);
    }, [cartItems]);

    function addToCart(item: CartItem) {
        dispatch({ type: 'ADD_ITEM', payload: item });
    }

    function removeFromCart(item: CartItem) {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
    }

    return (
        <CartContext.Provider value={{ addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}
