import { createContext } from 'react';
import type { CartItem } from '../types/cart';

export interface CartContextType {
    items: CartItem[];
    addToCart: (name: string, price: number, id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
