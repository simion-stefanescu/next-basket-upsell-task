import { Cart, CartItem } from '../models/cart';

const carts: Record<string, Cart> = {};

export function getCart(tenant_id: string, cart_id: string): Cart | undefined {
  const key = `${tenant_id}_${cart_id}`;
  return carts[key];
}

export function saveCart(cart: Cart) {
  const key = `${cart.tenant_id}_${cart.id}`;
  carts[key] = cart;
}

export function createOrUpdateCart(tenant_id: string, cart_id: string, items: CartItem[]): Cart {
  const cart: Cart = { id: cart_id, tenant_id, items };
  saveCart(cart);
  return cart;
}
