"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCart = checkoutCart;
const catalogService_1 = require("./catalogService");
const orderStore_1 = require("./orderStore");
const VAT_RATE = 0.2;
const PROMO_CODE = process.env.PROMO_CODE || "SUMMER10";
const PROMO_DISCOUNT = 0.1;
function checkoutCart(tenant_id, cart, promoCode, upsell) {
  // 1. Stock validation
  const allProducts = (0, catalogService_1.listProducts)(tenant_id);
  for (const item of cart.items) {
    const product = allProducts.find((p) => p.id === item.product_id);
    if (!product || product.stock < item.quantity) {
      return {
        order: null,
        error: `Product ${item.product_id} out of stock.`,
      };
    }
  }
  // 2. Atomic stock decrement (in-memory for demo)
  for (const item of cart.items) {
    const product = allProducts.find((p) => p.id === item.product_id);
    if (product) {
      product.stock -= item.quantity;
    }
  }
  // 3. Calculate totals
  let subtotal = 0;
  cart.items.forEach((item) => {
    const prod = allProducts.find((p) => p.id === item.product_id);
    if (prod) subtotal += prod.price * item.quantity;
  });
  const discount = promoCode === PROMO_CODE ? subtotal * PROMO_DISCOUNT : 0;
  const vat = (subtotal - discount) * VAT_RATE;
  const total = subtotal - discount + vat;
  const order = {
    id: Date.now().toString(),
    tenant_id,
    items: cart.items,
    subtotal,
    discount,
    vat,
    total,
    upsell,
    createdAt: new Date(),
    promoApplied: discount > 0,
  };
  (0, orderStore_1.saveOrder)(order);
  return { order };
}
