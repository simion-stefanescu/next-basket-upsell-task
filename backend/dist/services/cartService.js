"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.saveCart = saveCart;
exports.createOrUpdateCart = createOrUpdateCart;
const carts = {};
function getCart(tenant_id, cart_id) {
  const key = `${tenant_id}_${cart_id}`;
  return carts[key];
}
function saveCart(cart) {
  const key = `${cart.tenant_id}_${cart.id}`;
  carts[key] = cart;
}
function createOrUpdateCart(tenant_id, cart_id, items) {
  const cart = { id: cart_id, tenant_id, items };
  saveCart(cart);
  return cart;
}
