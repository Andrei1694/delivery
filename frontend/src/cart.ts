import { useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  note: string;
  unitPrice: number;
  quantity: number;
  restaurantName: string;
};

export const SERVICE_FEE = 4.2;

const CART_KEY = 'delivery_cart';

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  function sync(next: CartItem[]) {
    writeCart(next);
    setItems(next);
  }

  function addItem(item: Omit<CartItem, 'id'>) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    sync([...items, { ...item, id }]);
  }

  function updateQuantity(id: string, delta: number) {
    const next = items
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0);
    sync(next);
  }

  function clearCart() {
    sync([]);
  }

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addItem, updateQuantity, clearCart, subtotal, itemCount };
}
