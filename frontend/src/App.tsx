import "./App.css";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import OrderConfirmation from "./components/OrderConfirmation";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  createOrUpdateCart,
  getCart,
  checkout,
} from "./api/index";

const TENANT_ID = "tenant1";
const CART_ID = "cart1";
//will do the upsale enable toggle from the UI
function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [promoCode, setPromoCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upsellEnabled, setUpsellEnabled] = useState(true); // NEW: global toggle

  // Load products and cart on startup
  useEffect(() => {
    fetchProducts(TENANT_ID).then(setProducts);
    getCart(TENANT_ID, CART_ID).then(setCart);
  }, []);

  // Add or update cart
  const handleAddToCart = async (productId: string) => {
    const items = cart?.items ? [...cart.items] : [];
    const idx = items.findIndex((i: any) => i.product_id === productId);
    if (idx > -1) {
      items[idx].quantity += 1;
    } else {
      items.push({ product_id: productId, quantity: 1 });
    }
    const newCart = await createOrUpdateCart(TENANT_ID, CART_ID, items);
    setCart(newCart);
  };

  const handleUpdateCartItem = async (productId: string, quantity: number) => {
    if (!cart) return;
    const items = cart.items.map((item: any) =>
      item.product_id === productId ? { ...item, quantity } : item,
    );
    const newCart = await createOrUpdateCart(TENANT_ID, CART_ID, items);
    setCart(newCart);
  };

  const handleRemoveCartItem = async (productId: string) => {
    if (!cart) return;
    const items = cart.items.filter(
      (item: any) => item.product_id !== productId,
    );
    const newCart = await createOrUpdateCart(TENANT_ID, CART_ID, items);
    setCart(newCart);
  };

  // Handle checkout
  const handleCheckout = async () => {
    setLoading(true);
    const res = await checkout(TENANT_ID, CART_ID, promoCode, upsellEnabled);
    setLoading(false);
    if (res.order) {
      setOrder(res.order);
      setShowConfirmation(true);
    } else {
      alert(res.error || "Checkout failed");
    }
  };

  // Reset to shop
  const handleBackToShop = async () => {
    setShowConfirmation(false);
    setOrder(null);
    setPromoCode("");
    // Optionally, clear cart or refresh
    getCart(TENANT_ID, CART_ID).then(setCart);
  };

  if (showConfirmation && order) {
    return (
      <OrderConfirmation
        order={order}
        products={products}
        onBackToShop={handleBackToShop}
      />
    );
  }

  return (
    <div
      className="app-container"
      style={{ maxWidth: 900, margin: "auto", padding: 32 }}
    >
      <h1 style={{ marginBottom: 32, textAlign: "center", color: "#0f172a" }}>
        Simple Shop
      </h1>
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: 2 }}>
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <Cart
            cart={cart}
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            onCheckout={handleCheckout}
            loading={loading}
            products={products}
            onUpdateCartItem={handleUpdateCartItem}
            onRemoveCartItem={handleRemoveCartItem}
            upsellEnabled={upsellEnabled}
            setUpsellEnabled={setUpsellEnabled}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
