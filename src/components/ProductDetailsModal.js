import React from 'react';
import './ProductDetailsModal.css'; 

const ProductDetailsModal = ({ product, onClose }) => {
  return (
    product && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>{product.title}</h2>
            <button onClick={onClose}>&times;</button>
          </div>
          <div className="modal-content">
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetailsModal;
