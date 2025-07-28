import React from "react";
import "./Cart.css";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  product_id: string;
  quantity: number;
}

interface CartProps {
  cart: { items: CartItem[] } | null;
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onCheckout: () => void;
  onUpdateCartItem: (productId: string, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  loading?: boolean;
  products: Product[];
  upsellEnabled: boolean; // NEW
  setUpsellEnabled: React.Dispatch<React.SetStateAction<boolean>>; // NEW
}

const Cart: React.FC<CartProps> = ({
  cart,
  promoCode,
  onPromoCodeChange,
  onCheckout,
  onUpdateCartItem,
  onRemoveCartItem,
  loading,
  products,
  upsellEnabled,
  setUpsellEnabled,
}) => {
  const productMap: { [id: string]: Product } = {};
  products.forEach((p) => (productMap[p.id] = p));

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    onUpdateCartItem(productId, quantity);
  };

  return (
    <div className="cart-container" aria-label="Shopping cart">
      <h2 className="cart-title">Your Cart</h2>
      {cart?.items && cart.items.length > 0 ? (
        <ul className="cart-list">
          {cart.items.map((item: any, idx: number) => (
            <li className="cart-item" key={idx}>
              <span className="cart-item-name">
                {productMap[item.product_id]?.name || item.product_id}
                <span style={{ color: "#6b7280", fontSize: 12 }}>
                  {" "}
                  @ ${productMap[item.product_id]?.price?.toFixed(2) || "-"}
                </span>
              </span>
              <button
                className="cart-btn"
                aria-label={`Decrease quantity of ${productMap[item.product_id]?.name || item.product_id}`}
                onClick={() =>
                  handleQuantityChange(item.product_id, item.quantity - 1)
                }
                disabled={loading || item.quantity <= 1}
                type="button"
              >
                –
              </button>
              <label
                htmlFor={`qty-input-${item.product_id}`}
                className="visually-hidden"
              >
                Quantity for{" "}
                {productMap[item.product_id]?.name || item.product_id}
              </label>
              <input
                className="cart-qty-input"
                id={`qty-input-${item.product_id}`}
                type="number"
                min={1}
                max={productMap[item.product_id]?.stock || 99}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.product_id, Number(e.target.value))
                }
                disabled={loading}
                aria-label={`Quantity for ${productMap[item.product_id]?.name || item.product_id}`}
              />
              <button
                className="cart-btn"
                aria-label={`Increase quantity of ${productMap[item.product_id]?.name || item.product_id}`}
                onClick={() =>
                  handleQuantityChange(item.product_id, item.quantity + 1)
                }
                disabled={
                  loading ||
                  item.quantity >= (productMap[item.product_id]?.stock || 99)
                }
                type="button"
              >
                +
              </button>
              <button
                className="cart-btn-remove"
                onClick={() => onRemoveCartItem(item.product_id)}
                disabled={loading}
                aria-label={`Remove ${productMap[item.product_id]?.name || item.product_id} from cart`}
                type="button"
                title={`Remove ${productMap[item.product_id]?.name || item.product_id}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#999" }}>Cart is empty</p>
      )}
      <label htmlFor="cart-promo-input" className="cart-promo-label">
        Promo code
      </label>
      <input
        id="cart-promo-input"
        className="cart-promo-input"
        value={promoCode}
        onChange={(e) => onPromoCodeChange(e.target.value)}
        placeholder="Enter promo code"
        disabled={loading}
        aria-label="Promo code"
      />
      <label style={{ marginLeft: 16, userSelect: "none", fontSize: 14 }}>
        <input
          type="checkbox"
          checked={upsellEnabled}
          onChange={(e) => setUpsellEnabled(e.target.checked)}
          style={{ marginRight: 4 }}
          aria-label="Enable upsell suggestions"
        />
        Enable Upsell
      </label>
      <button
        className="cart-checkout-btn"
        onClick={onCheckout}
        disabled={loading || !(cart?.items && cart.items.length > 0)}
        type="button"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

export default Cart;
