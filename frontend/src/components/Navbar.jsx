// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Menu, User, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import logo from "../assets/tastycrunch-logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-yellow-100 via-orange-50 to-white shadow-md fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="TastyCrunch Logo" className="w-10 h-10 object-contain rounded-full shadow-md" />
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform"
          >
            TastyCrunch
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-semibold text-lg items-center">
          <Link to="/" className="hover:text-orange-600 transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-orange-600 transition duration-300">About</Link>
          <Link to="/products" className="hover:text-orange-600 transition duration-300">Products</Link>
          <Link to="/contact" className="hover:text-orange-600 transition duration-300">Contact</Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-orange-600 transition duration-300">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="hover:text-orange-600">
                {user?.name} ▼
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                  <Link to="/profile" onClick={closeDropdown} className="block px-4 py-2 hover:bg-gray-100">👤 Profile</Link>
                  <Link to="/my-orders" onClick={closeDropdown} className="block px-4 py-2 hover:bg-gray-100">📦 My Orders</Link>
                  <button onClick={() => { logout(); closeDropdown(); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-600 font-medium">
              <User size={20} />
              <span>Guest</span>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative text-orange-600">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="text-orange-600 focus:outline-none">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-md rounded-b-lg transition-all">
          <Link to="/" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-orange-600">Home</Link>
          <Link to="/about" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-orange-600">About</Link>
          <Link to="/products" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-orange-600">Products</Link>
          <Link to="/contact" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-orange-600">Contact</Link>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="text-gray-700 font-medium hover:text-orange-600">{user?.name} ▼</button>
              {isDropdownOpen && (
                <div className="mt-2 w-full bg-white border rounded-md shadow-md z-50">
                  <Link to="/profile" onClick={() => { closeDropdown(); closeMenu(); }} className="block px-4 py-2 hover:bg-gray-100">👤 Profile</Link>
                  <Link to="/my-orders" onClick={() => { closeDropdown(); closeMenu(); }} className="block px-4 py-2 hover:bg-gray-100">📦 My Orders</Link>
                  <button onClick={() => { logout(); closeDropdown(); closeMenu(); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-600 font-medium">
              <User size={20} />
              <span>Guest</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
