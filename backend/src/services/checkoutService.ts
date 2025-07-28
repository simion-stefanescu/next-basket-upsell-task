import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { listProducts, getProduct } from './catalogService';
import { saveOrder } from './orderStore';

const VAT_RATE = 0.20;
const PROMO_CODE = process.env.PROMO_CODE || "SUMMER10";
const PROMO_DISCOUNT = 0.10;

export interface CheckoutResult {
  order: Order;
  error?: string;
}

export function checkoutCart(
  tenant_id: string,
  cart: Cart,
  promoCode?: string,
  upsell?: any
): CheckoutResult {
  // 1. Stock validation
  const allProducts = listProducts(tenant_id);
  for (const item of cart.items) {
    const product = allProducts.find(p => p.id === item.product_id);
    if (!product || product.stock < item.quantity) {
      return { order: null as any, error: `Product ${item.product_id} out of stock.` };
    }
  }
  // 2. Atomic stock decrement (in-memory for demo)
  for (const item of cart.items) {
    const product = allProducts.find(p => p.id === item.product_id);
    if (product) {
      product.stock -= item.quantity;
    }
  }
  // 3. Calculate totals
  let subtotal = 0;
  cart.items.forEach(item => {
    const prod = allProducts.find(p => p.id === item.product_id);
    if (prod) subtotal += prod.price * item.quantity;
  });
  const discount = (promoCode === PROMO_CODE) ? subtotal * PROMO_DISCOUNT : 0;
  const vat = (subtotal - discount) * VAT_RATE;
  const total = subtotal - discount + vat;

  const order: Order = {
    id: Date.now().toString(),
    tenant_id,
    items: cart.items,
    subtotal,
    discount,
    vat,
    total,
    upsell,
    createdAt: new Date(),
    promoApplied: discount > 0
  };
  saveOrder(order);
  return { order };
}
