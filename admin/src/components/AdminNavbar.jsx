import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide">
          <Link to="/" className="hover:text-blue-500 transition duration-300">
            TastyCrunch
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-gray-700 font-medium text-lg">
          <Link to="/" className="hover:text-blue-600 transition duration-300">Dashboard</Link>
          <Link to="/admin/orders" className="hover:text-blue-600 transition duration-300">AllOrders</Link>
          <Link to="/admin/order/update" className="hover:text-blue-600 transition duration-300">UpdateOrder</Link>
          <Link to="/admin/products" className="hover:text-blue-600 transition duration-300">Products</Link>
          <Link to="/admin/products/new" className="hover:text-blue-600 transition duration-300">Add Product</Link>
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
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-gray-700 font-medium hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link to="/admin/orders" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">AllOrders</Link>
          <Link to="/admin/order/update" onClick={closeMenu} className="block text-gray-700 font-medium hover:text-blue-600">UpdateOrder</Link>

          <Link
            to="/admin/products"
            onClick={closeMenu}
            className="block text-gray-700 font-medium hover:text-blue-600"
          >
            Products
          </Link>
          <Link
            to="/admin/products/new"
            onClick={closeMenu}
            className="block text-gray-700 font-medium hover:text-blue-600"
          >
            Add Product
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;


