import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => (
  <div>
    <h2>Product Catalog</h2>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price} ({product.stock} in stock)
          <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
