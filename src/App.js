// App.js
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetailsModal from './components/ProductDetailsModal';
import ShoppingCart from './components/ShoppingCart';
import './App.css'; // Import the styles (create a separate CSS file)

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Fetch products from the FakeStoreAPI
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const showProductDetails = (productId) => {
    const selected = products.find(product => product.id === productId);
    setSelectedProduct(selected);
  };

  const addToCart = (productId) => {
    const selectedProduct = products.find(product => product.id === productId);

    // Check if the product is already in the cart
    const isInCart = cart.some(item => item.id === productId);

    if (isInCart) {
      // If the product is already in the cart, update the quantity
      const updatedCart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart(prevCart => [...prevCart, { ...selectedProduct, quantity: 1 }]);
      setShowNotification(true);

      // Hide the notification after 2 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  return (
     <div className="app">
      <div className="top-section">
        <h1>E Commerce</h1>
      </div>
      <div className="middle-section">
        <ProductList products={products} showProductDetails={showProductDetails} addToCart={addToCart} />
        <ShoppingCart cart={cart} onUpdateCart={updateCart} />
      </div>
      <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      {showNotification && <div className="notification">Product added to the cart!</div>}
    </div>
  );
}

export default App;
