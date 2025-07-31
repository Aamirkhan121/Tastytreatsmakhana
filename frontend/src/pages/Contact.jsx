import React, { useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { name, email, phoneNumber, message };

    try {
      const response = await axios.post(
        "https://api.tastycrunchmakhana.com/api/contact/submit",
        contactData
      );
      if (response.data.success) {
        setStatus("✅ Thank you for contacting us! We'll get back to you soon.");
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      }
    } catch (error) {
      setStatus("❌ Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10 relative">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-12">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4 animate-pulse">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Fill out the form and our team will be in touch shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-semibold">Phone</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="+91 XXXXX-XXXXX"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-semibold">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              ✉️ Send Message
            </button>

            {status && (
              <p className="mt-3 text-sm font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-md">
                {status}
              </p>
            )}
          </form>
        </div>

        {/* Right Side - Map + Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">📍 Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54576.190533684385!2d72.78420701937958!3d19.138741500899336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b618b6d891dd%3A0x91f8a857c731d132!2sAndheri%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e1!3m2!1sen!2sin!4v1746257019044!5m2!1sen!2sin"
            width="100%"
            height="280"
            loading="lazy"
            className="rounded-xl shadow-md"
          ></iframe>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" /> Andheri West, Mumbai, Maharashtra
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" /> +91 98337 63739
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> wecaretastycrunch@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* ✅ WhatsApp Floating Button */}
      <a
        href="https://wa.me/+919833763739?text=Hello%20Tasty%20Crunch!%20I%20have%20a%20query."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition z-50"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default Contact;


