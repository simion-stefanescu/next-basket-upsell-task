import React from 'react';
import Upsell from './Upsell';

interface ProductMap {
  [key: string]: { name: string; price: number };
}

interface OrderConfirmationProps {
  order: any;
  products: any[];
  onBackToShop: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, products, onBackToShop }) => {
  // Build a lookup map to get product names/prices from ids
  const productMap: ProductMap = {};
  products.forEach(p => (productMap[p.id] = { name: p.name, price: p.price }));

  return (
    <div style={{ maxWidth: 480, margin: 'auto', border: '1px solid #ccc', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #eee', background: '#fff' }}>
      <h2 style={{ color: "#16a34a" }}>Thank you for your order!</h2>
      <p>Order ID: <b>{order.id}</b></p>
      <table style={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item: any, idx: number) => (
            <tr key={idx}>
              <td>{productMap[item.product_id]?.name || item.product_id}</td>
              <td>{item.quantity}</td>
              <td>${productMap[item.product_id]?.price?.toFixed(2) || '-'}</td>
              <td>${((productMap[item.product_id]?.price || 0) * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginBottom: 8 }}>
        <div>Subtotal: <b>${order.subtotal.toFixed(2)}</b></div>
        {order.discount > 0 && (
          <div>Promo Discount: <b style={{ color: "#16a34a" }}>- ${order.discount.toFixed(2)}</b></div>
        )}
        <div>VAT (20%): <b>${order.vat.toFixed(2)}</b></div>
        <div style={{ fontSize: 20, marginTop: 12 }}>Total: <b>${order.total.toFixed(2)}</b></div>
      </div>
      {order.upsell && order.upsell.length > 0 && (
        <Upsell upsell={order.upsell} />
      )}
      <button
        style={{ marginTop: 24, padding: "8px 32px", borderRadius: 6, background: "#16a34a", color: "#fff", border: "none", cursor: "pointer" }}
        onClick={onBackToShop}
      >
        Back to Shop
      </button>
    </div>
  );
};

export default OrderConfirmation;
