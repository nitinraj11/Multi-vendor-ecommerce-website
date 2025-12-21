import React from 'react';
import './Checkoutpage.css';

const Checkout = () => {
  const cartItems = [
    {
      id: 1,
      name: "Apple Watch Series 7",
      color: "Golden",
      price: 20000,
      image: "https://via.placeholder.com/80", // Replace with your actual image paths
    },
    {
      id: 2,
      name: "Beylob 90 Speaker",
      color: "Space Gray",
      price: 2000,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Beoplay M5 Bluetooth Speaker",
      color: "Gray",
      price: 5000,
      image: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <span className="item-badge">3 ITEMS</span>
      </header>

      <div className="checkout-layout">
        {/* Left Side: Cart Items */}
        <div className="cart-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-color">{item.color}</p>
                  <p className="item-quantity">x 1</p>
                </div>
              </div>
              <div className="item-actions">
                <span className="item-price">Rs. {item.price}</span>
                <button className="remove-btn">✕</button>
              </div>
            </div>
          ))}

          <div className="coupon-section">
            <input type="text" placeholder="Enter coupon code" className="coupon-input" />
            <button className="apply-btn">Apply coupon</button>
          </div>

          <div className="summary-section">
            <div className="summary-row">
              <span>Sub total</span>
              <span>27000</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>27000</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Information */}
        <div className="form-section">
          <section className="form-group active">
            <label className="section-title">Contact Information</label>
            <div className="input-field">
              <label>First & Last Name</label>
              <input type="text" placeholder="Enter first and last name" />
            </div>
            <div className="input-field">
              <label>Email Address</label>
              <input type="email" placeholder="Enter email address" />
            </div>
            <button className="continue-btn">Continue to Next</button>
          </section>

          <section className="form-group disabled">
            <label className="section-title">Shipping Information</label>
          </section>

          <section className="form-group disabled">
            <label className="section-title">Billing Information</label>
          </section>

          <section className="form-group disabled">
            <label className="section-title">Payment Method</label>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;