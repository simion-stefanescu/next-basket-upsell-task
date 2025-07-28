import { Product } from "../models/product";
import productsJson from "../db/products.json";

const products: Product[] = productsJson as Product[];

export function listProducts(tenant_id: string): Product[] {
  return products.filter((p) => p.tenant_id === tenant_id);
}

export function getProduct(tenant_id: string, id: string): Product | undefined {
  return products.find((p) => p.tenant_id === tenant_id && p.id === id);
}
