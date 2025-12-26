import React from "react";
import "./OrderConfirmation.css";

const orderData = {
  orderId: "ORDER12345",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main Street, City, Country",
  },
  vendors: [
    {
      vendorName: "Tech Store",
      items: [
        { name: "Wireless Mouse", price: 20 },
        { name: "Keyboard", price: 35 },
      ],
    },
    {
      vendorName: "Fashion Hub",
      items: [{ name: "Hoodie", price: 40 }],
    },
  ],
  shipping: 5,
};

const OrderConfirmation = () => {
  const itemsTotal = orderData.vendors.reduce(
    (total, vendor) =>
      total +
      vendor.items.reduce((sum, item) => sum + item.price, 0),
    0
  );

  const grandTotal = itemsTotal + orderData.shipping;

  return (
    <div className="container">
      {/* Header */}
      <div className="confirmation-header">
        <h1>✅ Order Confirmed</h1>
        <p>Thank you for your purchase!</p>
        <p className="order-id">
          Order ID: <strong>{orderData.orderId}</strong>
        </p>
      </div>

      {/* Customer Info */}
      <div className="card">
        <h2>Delivery Details</h2>
        <p><strong>Name:</strong> {orderData.customer.name}</p>
        <p><strong>Email:</strong> {orderData.customer.email}</p>
        <p><strong>Address:</strong> {orderData.customer.address}</p>
      </div>

      {/* Vendors */}
      {orderData.vendors.map((vendor, index) => {
        const vendorSubtotal = vendor.items.reduce(
          (sum, item) => sum + item.price,
          0
        );

        return (
          <div className="card vendor" key={index}>
            <h2>Seller: {vendor.vendorName}</h2>

            {vendor.items.map((item, i) => (
              <div className="item" key={i}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="subtotal">
              <span>Vendor Subtotal</span>
              <span>${vendorSubtotal.toFixed(2)}</span>
            </div>
          </div>
        );
      })}

      {/* Order Summary */}
      <div className="card summary">
        <h2>Order Summary</h2>

        <div className="row">
          <span>Items Total</span>
          <span>${itemsTotal.toFixed(2)}</span>
        </div>

        <div className="row">
          <span>Shipping</span>
          <span>${orderData.shipping.toFixed(2)}</span>
        </div>

        <div className="row total">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button>Track Order</button>
        <button className="secondary">Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
