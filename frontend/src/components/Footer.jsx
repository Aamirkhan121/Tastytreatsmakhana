import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-50 text-gray-700 pt-10 pb-6 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-orange-700 mb-2">
            TastyCrunchMakhana
          </h2>
          <p className="text-sm text-gray-600">
            Indulge in the healthiest, crunchiest, and most delicious makhanas,
            packed with flavor and nutrition.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-700 transition">Home</a></li>
            <li><a href="/products" className="hover:text-orange-700 transition">Products</a></li>
            <li><a href="/about" className="hover:text-orange-700 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-700 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:wecaretastycrunch@gmail.com" className="text-orange-700">wecaretastycrunch@gmail.com</a></li>
            <li>Phone: <a href="tel:+919833763739" className="text-orange-700">+91 9833763739</a></li>
            <li>Address: Mumbai,Maharashtra,Andheri West, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-orange-700 hover:text-orange-900">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/tastytreatz9?igsh=MWd5azd5Y3RlbWRpbQ==" className="text-orange-700 hover:text-orange-900">
              <FaInstagram />
            </a>
            <a href="#" className="text-orange-700 hover:text-orange-900">
              <FaTwitter />
            </a>
            <a href="#" className="text-orange-700 hover:text-orange-900">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-orange-100 pt-4">
      &copy; {new Date().getFullYear()} TastyCrunchyMakhana.com. All rights reserved. <br />
      Developed by Md Aamir Khan.
      <br />
  Contact: 
  <a href="mailto:aamir73690@gmail.com" className="text-blue-500 hover:underline">aamir73690@gmail.com</a> | 
  <a href="tel:+917369041570" className="text-blue-500 hover:underline">+91 7369041570</a>

      </div>
    </footer>
  );
};

export default Footer;
