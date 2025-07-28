import { CartItem } from './cart';

export interface Order {
  id: string;
  tenant_id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  upsell?: any;
  createdAt: Date;
  promoApplied?: boolean;
}
