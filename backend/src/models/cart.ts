import { Product } from './product';

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface Cart {
  id: string;
  tenant_id: string;
  items: CartItem[];
}