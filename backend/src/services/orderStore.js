"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOrder = saveOrder;
exports.getOrder = getOrder;
const orders = {};
function saveOrder(order) {
  const key = `${order.tenant_id}_${order.id}`;
  orders[key] = order;
}
function getOrder(tenant_id, order_id) {
  const key = `${tenant_id}_${order_id}`;
  return orders[key];
}
