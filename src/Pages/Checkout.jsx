import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Common/Navbar";

const Checkout = () => {
  const navigate = useNavigate();

  /* 🛒 READ CART FROM STORAGE */
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  /* 💾 KEEP CART SYNCED */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ➕➖ QTY */
  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  /* 🧮 TOTAL */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ✅ PLACE ORDER */
  const handlePlaceOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <Navbar />

      <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 shadow mt-6">
        <h2 className="text-xl font-bold mb-6">Your Cart</h2>

        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Cart is empty</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-4"
          >
            <div className="flex gap-4">
              <img
                src={item.image}
                className="w-20 h-20 rounded"
                alt={item.name}
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="px-2 border rounded"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="font-bold">
              ₹{(item.price * item.qty).toFixed(2)}
            </div>
          </div>
        ))}

        <div className="flex justify-between text-lg font-bold mt-6">
          <span>Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
