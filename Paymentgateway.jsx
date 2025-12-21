import React, { useState } from 'react';
import { X, ChevronRight, CreditCard } from 'lucide-react';
import './Paymentgateway.css';

const App = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const cartItems = [
    {
      id: 1,
      name: "Apple Watch Series 7",
      color: "Golden",
      price: 25999,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 2,
      name: "Beylob 90 Speaker",
      color: "Space Gray",
      price: 4999,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 3,
      name: "Beoplay M5 Bluetooth Speaker",
      color: "Gray",
      price: 7999,
      image: "https://images.unsplash.com/photo-1614102073832-030967418971?auto=format&fit=crop&q=80&w=200",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const GPayLogo = () => (
    <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.53 7.82V12.92H14.86V2.62H18.66C19.74 2.62 20.67 2.98 21.45 3.7C22.23 4.41 22.62 5.3 22.62 6.36C22.62 7.42 22.23 8.32 21.45 9.04C20.67 9.76 19.74 10.12 18.66 10.12H16.53V7.82ZM16.53 4.13V8.61H18.68C19.3 8.61 19.82 8.41 20.24 8C20.66 7.59 20.87 7.04 20.87 6.37C20.87 5.7 20.66 5.16 20.24 4.75C19.82 4.34 19.3 4.13 18.68 4.13H16.53Z" fill="#5F6368"/>
      <path d="M31.28 10.27C30.34 10.27 29.56 9.98 28.94 9.4C28.32 8.81 28.01 8.01 28.01 7C28.01 5.99 28.32 5.19 28.94 4.61C29.56 4.02 30.34 3.73 31.28 3.73C32.22 3.73 33 4.02 33.62 4.61C34.24 5.19 34.55 5.99 34.55 7C34.55 8.01 34.24 8.81 33.62 9.4C33 9.98 32.22 10.27 31.28 10.27ZM31.28 5.23C30.77 5.23 30.36 5.4 30.05 5.74C29.74 6.07 29.58 6.49 29.58 7C29.58 7.51 29.74 7.93 30.05 8.26C30.36 8.59 30.77 8.76 31.28 8.76C31.79 8.76 32.2 8.59 32.51 8.26C32.82 7.93 32.98 7.51 32.98 7C32.98 6.49 32.82 6.07 32.51 5.74C32.2 5.4 31.79 5.23 31.28 5.23Z" fill="#5F6368"/>
      <path d="M7.4 7.21V9.21H11.75C11.62 10.36 10.64 11.21 9.32 11.21C7.79 11.21 6.55 9.95 6.55 8.39C6.55 6.83 7.79 5.57 9.32 5.57C10.01 5.57 10.63 5.82 11.12 6.28L12.54 4.86C11.66 4.04 10.51 3.53 9.32 3.53C6.64 3.53 4.46 5.7 4.46 8.38C4.46 11.06 6.64 13.23 9.32 13.23C12.13 13.23 13.98 11.25 13.98 8.46C13.98 8.04 13.94 7.62 13.87 7.21H7.4Z" fill="#4285F4"/>
    </svg>
  );

  return (
    <div className="checkout-wrapper">
      <div className="checkout-main-container">
        {/* Centered Header */}
        <div className="checkout-header-section">
          <h1 className="main-title">Checkout</h1>
          <span className="items-count-badge">3 ITEMS</span>
        </div>

        {/* Main Content Card */}
        <div className="main-content-card">
          
          {/* LEFT SIDE: SUMMARY */}
          <div className="summary-sidebar">
            <div className="items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="item-preview">
                    <div className="img-holder">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="text-meta">
                      <h3>{item.name}</h3>
                      <p className="color-label">{item.color}</p>
                      <p className="qty-label">x 1</p>
                    </div>
                  </div>
                  <div className="item-price-actions">
                    <span className="price-tag">Rs. {item.price.toLocaleString()}</span>
                    <button className="delete-item-btn"><X size={18} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="coupon-box">
              <input type="text" placeholder="Enter coupon code" />
              <button className="apply-coupon-btn">Apply coupon</button>
            </div>

            <div className="financial-totals">
              <div className="line-item">
                <span>Sub total</span>
                <span className="val-text">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="line-item grand-total">
                <span>Total</span>
                <span className="val-text">Rs. {subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PAYMENT BOX */}
          <div className="payment-interaction-box">
            <div className="form-container-inner">
              
              {/* Previous Steps (Collapsed) */}
              <div className="inactive-steps-stack">
                <div className="step-row">
                  <span className="step-label">Contact Information</span>
                  <ChevronRight size={18} />
                </div>
                <div className="step-row">
                  <span className="step-label">Shipping Information</span>
                  <ChevronRight size={18} />
                </div>
                <div className="step-row">
                  <span className="step-label">Billing Information</span>
                  <ChevronRight size={18} />
                </div>
              </div>

              {/* Active Step: Payment Method */}
              <div className="active-payment-step">
                <h2 className="section-header">Payment Method</h2>
                
                <div className="selection-stack">
                  {/* Card Option */}
                  <div 
                    className={`payment-option ${selectedMethod === 'card' ? 'is-selected' : ''}`}
                    onClick={() => setSelectedMethod('card')}
                  >
                    <div className="option-identity">
                      <div className="radio-circle">
                        {selectedMethod === 'card' && <div className="dot" />}
                      </div>
                      <span className="method-name">Credit Card</span>
                    </div>
                    <CreditCard className="icon-fade" />
                  </div>

                  {/* Google Pay Option */}
                  <div 
                    className={`payment-option ${selectedMethod === 'gpay' ? 'is-selected' : ''}`}
                    onClick={() => setSelectedMethod('gpay')}
                  >
                    <div className="option-identity">
                      <div className="radio-circle">
                        {selectedMethod === 'gpay' && <div className="dot" />}
                      </div>
                      <span className="method-name">Google Pay</span>
                    </div>
                    <GPayLogo />
                  </div>
                </div>

                {/* Conditional Form */}
                {selectedMethod === 'card' && (
                  <div className="card-details-fields">
                    <div className="input-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid-inputs">
                      <div className="input-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM / YY" />
                      </div>
                      <div className="input-group">
                        <label>CVV</label>
                        <input type="password" placeholder="000" />
                      </div>
                    </div>
                  </div>
                )}

                <button className="final-checkout-btn">
                  Complete Purchase
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      
    </div>
  );
};

export default App;