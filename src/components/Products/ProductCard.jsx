import { HiOutlineShoppingBag } from "react-icons/hi";

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 🔑 CREATE A STABLE ID
    const productId = product.name.replace(/\s+/g, "-").toLowerCase();

    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: Number(product.price.replace(/,/g, "")), // ✅ convert string → number
        image: product.image,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔔 FORCE UI UPDATE
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div
      className="
        bg-white rounded-2xl border border-gray-200 p-4 flex flex-col
        transition-all duration-300 hover:border-orange-400 hover:shadow-lg hover:-translate-y-1
      "
    >
      {/* IMAGE */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* NAME */}
      <h3 className="text-sm font-medium mb-2">{product.name}</h3>

      {/* PRICE */}
      <p className="font-semibold mb-4">₹{product.price}</p>

      {/* BUTTON */}
      <button
        onClick={addToCart}
        className="
          group mt-auto bg-orange-500 hover:bg-orange-600
          text-white py-2 rounded-md font-semibold
          flex items-center justify-center gap-2 transition cursor-pointer
        "
      >
        <HiOutlineShoppingBag className="opacity-0 group-hover:opacity-100 transition" />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
