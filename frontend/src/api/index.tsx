const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts(tenantId: string) {
  const res = await fetch(`${API_BASE}/${tenantId}/products`);
  return res.json();
}

export async function createOrUpdateCart(
  tenantId: string,
  cartId: string,
  items: any[],
) {
  const res = await fetch(`${API_BASE}/${tenantId}/cart/${cartId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return res.json();
}

export async function getCart(tenantId: string, cartId: string) {
  const res = await fetch(`${API_BASE}/${tenantId}/cart/${cartId}`);
  return res.json();
}

export async function checkout(
  tenantId: string,
  cartId: string,
  promoCode?: string,
  upsellEnabled?: boolean,
) {
  const res = await fetch(`${API_BASE}/${tenantId}/checkout/${cartId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ promoCode, upsellEnabled }),
  });
  return res.json(); //now everything seems to work as promised, next up the docker tests
}
