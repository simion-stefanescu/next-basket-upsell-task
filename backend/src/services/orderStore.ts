import { Order } from '../models/order';

const orders: Record<string, Order> = {};

export function saveOrder(order: Order) {
  const key = `${order.tenant_id}_${order.id}`;
  orders[key] = order;
}

export function getOrder(tenant_id: string, order_id: string): Order | undefined {
  const key = `${tenant_id}_${order_id}`;
  return orders[key];
}
