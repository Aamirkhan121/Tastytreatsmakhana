import React, { useState, useContext } from "react";
import { Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../assets/tastycrunch-logo.jpg"; // ✅ Import the logo

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="TastyCrunch Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full"
          />
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide hover:text-blue-500 transition duration-300"
          >
            TastyCrunch
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-gray-700 font-medium text-lg">
          <Link to="/" className="hover:text-blue-600 transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition duration-300">About</Link>
          <Link to="/products" className="hover:text-blue-600 transition duration-300">Products</Link>
          <Link to="/contact" className="hover:text-blue-600 transition duration-300">Contact</Link>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="text-gray-700 font-medium hover:text-blue-600">
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
            <>

            <div className="flex items-center space-x-2 text-gray-500 font-medium">
  <User size={20} />
  <span>Guest</span>
</div>
              {/* <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="hover:text-blue-600">Register</Link> */}
             
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-blue-700 focus:outline-none">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-md rounded-b-lg transition-all">
          <Link to="/" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">Home</Link>
          <Link to="/about" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">About</Link>
          <Link to="/products" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">Products</Link>
          <Link to="/contact" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">Contact</Link>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="text-gray-700 font-medium hover:text-blue-600">
                {user?.name} ▼
              </button>
              {isDropdownOpen && (
                <div className="mt-2 w-full bg-white border rounded-md shadow-md z-50">
                  <Link to="/profile" onClick={() => { closeDropdown(); closeMenu(); }} className="block px-4 py-2 hover:bg-gray-100">👤 Profile</Link>
                  <Link to="/my-orders" onClick={() => { closeDropdown(); closeMenu(); }} className="block px-4 py-2 hover:bg-gray-100">📦 My Orders</Link>
                  <button onClick={() => { logout(); closeDropdown(); closeMenu(); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">Login</Link>
              <Link to="/register" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

