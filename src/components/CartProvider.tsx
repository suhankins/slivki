'use client';

import { LocalizedStringObject } from '@/lib/i18n-config';
import { createContext, useEffect, useReducer } from 'react';

export interface CartItem {
    name: LocalizedStringObject;
    price: number;
    sizeString?: string;
    selectedSize: number;
    categoryId: string;
    itemIndex: number;
    quantity?: number;
}
function cloneItem(item: CartItem) {
    return { ...item };
}

export type Cart = CartItem[];

export type CartAction = {
    type: 'ADD_ITEM' | 'REMOVE_ITEM';
    payload: CartItem;
};

const itemEquals = (a: CartItem, b: CartItem): boolean =>
    a.categoryId === b.categoryId &&
    a.itemIndex === b.itemIndex &&
    a.selectedSize === b.selectedSize;

function cartReducer(state: Cart, action: CartAction) {
    switch (action.type) {
        case 'ADD_ITEM': {
            console.log('Adding item to cart');
            const foundItem = state.find((item) =>
                itemEquals(item, action.payload)
            );
            if (!foundItem) {
                console.log('Item not found in cart, adding new item');
                return [...state, cloneItem(action.payload)];
            }
            console.log('Item found in cart, increasing quantity');
            if (!foundItem.quantity) {
                console.log('Item had no quantity, setting it to 1');
                foundItem.quantity = 1;
            }
            console.log('Increasing quantity by', action.payload.quantity ?? 1);
            foundItem.quantity += action.payload.quantity ?? 1;
            return [...state];
        }
        case 'REMOVE_ITEM': {
            console.log('Removing item from cart');
            const foundItem = state.find((item) =>
                itemEquals(item, action.payload)
            );
            if (!foundItem) {
                console.log('Item not found in cart, doing nothing');
                return state;
            }
            const decreaseQuantity = action.payload.quantity ?? 1;
            if (
                foundItem.quantity &&
                foundItem.quantity > 1 &&
                foundItem.quantity > decreaseQuantity
            ) {
                console.log(
                    'Item found in cart and has quantity > 1, decreasing quantity'
                );
                foundItem.quantity -= decreaseQuantity;
                return state;
            }
            console.log(
                'Item found in cart and quantity is too low, removing item'
            );
            return state.filter((item) => !itemEquals(item, action.payload));
        }
        default:
            return state;
    }
}

export const CartActionContext = createContext({
    addToCart: (item: CartItem) => {},
    removeFromCart: (item: CartItem) => {},
});

export const CartContentsContext = createContext<Cart>([]);

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
        <CartContentsContext.Provider value={cartItems}>
            <CartActionContext.Provider value={{ addToCart, removeFromCart }}>
                {children}
            </CartActionContext.Provider>
        </CartContentsContext.Provider>
    );
}
