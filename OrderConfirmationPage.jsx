import React from "react";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const order = {
    orderId: "ORD-458963",
    orderDate: "16 Jan 2025",
    paymentMethod: "Cash on Delivery",
    shippingAddress: {
      name: "Alex Kumar",
      phone: "9876543210",
      address: "21, MG Road, Bangalore, India",
    },
    vendors: [
      {
        vendorId: "V101",
        vendorName: "Electro Mart",
        items: [
          {
            id: "P1",
            name: "Bluetooth Headphones",
            price: 1999,
            quantity: 1,
            image: "https://via.placeholder.com/70",
          },
        ],
      },
      {
        vendorId: "V102",
        vendorName: "Style Store",
        items: [
          {
            id: "P2",
            name: "Men's Jacket",
            price: 2499,
            quantity: 1,
            image: "https://via.placeholder.com/70",
          },
        ],
      },
    ],
  };

  const vendorTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const grandTotal = order.vendors.reduce(
    (total, vendor) => total + vendorTotal(vendor.items),
    0
  );

  return (
    <div className="order-container">
      <h1>✅ Order Confirmed</h1>
      <p>Thank you for your order!</p>

      {/* Order Details */}
      <div className="order-details">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Date:</strong> {order.orderDate}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
      </div>

      {/* Address */}
      <div className="address">
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress.name}</p>
        <p>{order.shippingAddress.phone}</p>
        <p>{order.shippingAddress.address}</p>
      </div>

      {/* Vendor Wise Items */}
      {order.vendors.map((vendor) => (
        <div key={vendor.vendorId} className="vendor-box">
          <h3>Sold by: {vendor.vendorName}</h3>

          {vendor.items.map((item) => (
            <div key={item.id} className="product">
              <img src={item.image} alt={item.name} />
              <div className="product-info">
                <p>{item.name}</p>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
              <strong>₹{item.price * item.quantity}</strong>
            </div>
          ))}

          <div className="vendor-total">
            Vendor Total: ₹{vendorTotal(vendor.items)}
          </div>
        </div>
      ))}

      {/* Grand Total */}
      <h2 className="grand-total">Grand Total: ₹{grandTotal}</h2>

      <button className="shop-btn">Continue Shopping</button>
    </div>
  );
};

export default OrderConfirmation;
