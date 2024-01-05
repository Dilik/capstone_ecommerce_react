import React from 'react';
import './ProductList.css';

const truncateDescription = (description, wordCount) => {
  const words = description.split(' ');
  const truncated = words.slice(0, wordCount).join(' ');

  if (words.length > wordCount) {
    return `${truncated}...`;
  }

  return truncated;
};

const ProductList = ({ products, showProductDetails, addToCart }) => {
  return (
    <section className="product-list-container">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{truncateDescription(product.description, 20)}</p>
              <p className="price">${product.price}</p>
              <button onClick={() => showProductDetails(product.id)}>Details</button>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
