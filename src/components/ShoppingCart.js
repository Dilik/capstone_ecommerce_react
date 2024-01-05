import React, { useState } from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cart, onUpdateCart }) => {
  const [quantity, setQuantity] = useState({});

  const handleRemove = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    onUpdateCart(updatedCart);
  };

  const handleIncrement = (productId) => {
    const updatedQuantity = { ...quantity };
    updatedQuantity[productId] = (updatedQuantity[productId] || 0) + 1;
    setQuantity(updatedQuantity);

    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });

    onUpdateCart(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedQuantity = { ...quantity };
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = (item.quantity || 0) - 1;
        if (newQuantity > 0) {
          updatedQuantity[productId] = newQuantity;
          return { ...item, quantity: newQuantity };
        } else {
          updatedQuantity[productId] = 0;
          return null;
        }
      }
      return item;
    });

    setQuantity(updatedQuantity);
    onUpdateCart(updatedCart.filter(Boolean));
  };

  return (
    <aside className="shopping-cart">
    <h2>Shopping Cart</h2>
    <ul>
      {cart.map(item => (
        <li key={item.id} className="cart-item">
          <div className="cart-item-info">
            <p>{item.title}</p>
            <p className="price">${item.price}</p>
          </div>
          <div className="cart-item-actions">
            <button className="increment" onClick={() => handleIncrement(item.id)}>+</button>
            <span className="quantity">{quantity[item.id] || item.quantity || 1}</span>
            <button className="decrement" onClick={() => handleDecrement(item.id)}>-</button>
            <button className="remove" onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
    {cart.length === 0 && <p>Your cart is empty.</p>}
    <button className="checkout-button">Checkout</button>
  </aside>
  );
}

export default ShoppingCart;
