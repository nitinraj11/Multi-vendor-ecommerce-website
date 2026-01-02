
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import CardDrawer from "../Layout/CardDrawer";
import SellModal from "./SellModal";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  const [sellOpen, setSellOpen] = useState(false);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/profile"); // later
    else navigate("/login");
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCount(cart.reduce((s, i) => s + i.qty, 0));
    };

    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  const menu = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Listing", path: "/listing" },
    { label: "Doctor", path: "/doctor" },
    { label: "Veterinary", path: "/veterinary" },
  ];

  return (
    <>

      {/* DESKTOP NAVBAR */}
      <div className="bg-[#222] text-white">

        <nav className="container mx-auto flex items-center py-4 px-4 md:px-6">

          {/* LEFT: Mobile Menu + Logo */}
          <div className="flex items-center gap-3 min-w-45">

            {/* Mobile menu button */}
            <button
              onClick={toggleNavDrawer}
              className="md:hidden cursor-pointer"
              aria-label="Open Menu"
            >
              <HiBars3BottomRight className="h-6 w-6 text-gray-200" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-medium cursor-pointer text-white"
            >
              pet-pashu
            </Link>
          </div>

          {/* CENTER: Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-10">
              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex space-x-10">
                  {menu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="text-sm font-medium uppercase text-white hover:text-gray-300 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Icons */}
          <div className="flex items-center gap-4 min-w-65 justify-end">

            {/* Search */}
            <div className="cursor-pointer">
              <SearchBar />
            </div>

            {/* SELL BUTTON */}
            <button
              onClick={() => setSellOpen(true)}
              className="relative overflow-hidden flex items-center gap-2
                 bg-linear-to-r from-orange-500 to-orange-400
                 text-white px-3 py-2 md:px-4 md:py-2
                 rounded-md text-sm font-semibold
                 shadow-md cursor-pointer"
            >
              {/* SHINE LAYER */}
              <span
                className="absolute inset-0 w-1/2 h-full
                   bg-white/30 blur-sm rotate-12 animate-shine"
              />
              <span className="relative z-10 text-base md:text-lg">🐄</span>
              <span className="relative z-10 hidden sm:inline">SELL</span>
            </button>

            {/* 🛒 CART */}
            <button
              onClick={toggleCartDrawer}
              className="relative"
              aria-label="Cart"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-200" />

              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white px-2 rounded-full">
                  {count}
                </span>
              )}
            </button>

            {/* User */}
            {/* <Link to="/login" className="cursor-pointer">
              <HiOutlineUser className="h-6 w-6 text-gray-200" />
            </Link> */}
            <button onClick={handleProfileClick} className="cursor-pointer">
              <HiOutlineUser className="h-6 w-6 text-gray-200 hover:text-gray-300" />
            </button>
          </div>

        </nav>


        {/* CART DRAWER */}
        <CardDrawer
          drawerOpen={drawerOpen}
          toggleCartDrawer={toggleCartDrawer}
        />
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg
        transform transition-transform duration-300 z-50
        ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer} className="cursor-pointer">
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <nav className="space-y-4">
              {menu.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={toggleNavDrawer}
                  className="block text-gray-600 hover:text-black cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

          </nav>
        </div>
      </div>

      <SellModal sellOpen={sellOpen} setSellOpen={setSellOpen} />
    </>
  );
};

export default Navbar;