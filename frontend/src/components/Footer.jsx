import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/tastycrunch-logo.jpg"; // ✅ Correct path

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 text-gray-800 pt-12 pb-8 border-t border-orange-200 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="TastyCrunch Logo"
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
              <h2 className="text-xl font-extrabold text-orange-700 tracking-wide">
                TastyCrunch
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Indulge in the healthiest, crunchiest, and most delicious makhanas,
              packed with flavor, purity, and love. #SnackSmart
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Products", "About Us", "Contact", "Terms & Conditions"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-gray-700 hover:text-orange-600 transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>
                📧 Email: <a href="mailto:wecaretastycrunch@gmail.com" className="text-blue-600 hover:underline">wecaretastycrunch@gmail.com</a>
              </li>
              <li>
                📞 Phone: <a href="tel:+919833763739" className="text-blue-600 hover:underline">+91 9833763739</a>
              </li>
              <li>📍 Mumbai, Andheri West, Maharashtra</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-orange-700 mb-3">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="hover:scale-110 transition duration-300 text-blue-600">
                <FaFacebookF size={20} />
              </a>
              <a href="https://www.instagram.com/tastycrunch_official?igsh=NGdvYW5idnlzYTY%3D&utm_source=qr" target="_blank" className="hover:scale-110 transition duration-300 text-pink-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:scale-110 transition duration-300 text-blue-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:scale-110 transition duration-300 text-red-600">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center text-sm text-gray-500 border-t border-orange-100 pt-4">
          © {new Date().getFullYear()} <span className="font-bold text-orange-700">TastyCrunchMakhana.com</span>. All rights reserved. <br />
          Developed by <span className="text-blue-600 font-semibold">Md Aamir Khan</span> — 
          <a href="mailto:aamir73690@gmail.com" className="ml-1 text-blue-500 hover:underline">aamir73690@gmail.com</a> | 
          <a href="tel:+917369041570" className="ml-1 text-blue-500 hover:underline">+91 7369041570</a>
        </div>
      </footer>

      {/* Legal Section */}
      <footer className="bg-gray-100 text-sm text-center py-3">
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          <a href="/terms-and-conditions" className="hover:text-orange-700 transition">Terms</a>
          <a href="/refund-policy" className="hover:text-orange-700 transition">Refund</a>
          <a href="/cancellation-policy" className="hover:text-orange-700 transition">Cancellation</a>
          <a href="/privacy-policy" className="hover:text-orange-700 transition">Privacy</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;

