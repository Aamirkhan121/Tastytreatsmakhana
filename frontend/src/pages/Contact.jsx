import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");  // Added phone number field
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      phoneNumber, // Added phone number to contact data
      message,
    };

    try {
      const response = await axios.post("https://tastytreatsmakhana.onrender.com/api/contact/submit", contactData);
      if (response.data.success) {
        setStatus("Thank you for reaching out! We will get back to you soon.");
        setName("");
        setEmail("");
        setPhoneNumber(""); // Reset phone number field
        setMessage("");
      }
    } catch (error) {
      setStatus("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-2xl grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Get in Touch with Tasty Crunch Makhana</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your phone number (+91XXXXXXXXXX)"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Please provide a detailed description of your inquiry or feedback. We will get back to you as soon as possible."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-gray-600">{status}</p>}
        </div>

        {/* Google Map */}
        <div className="rounded-lg overflow-hidden">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visit Us</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54576.190533684385!2d72.78420701937958!3d19.138741500899336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b618b6d891dd%3A0x91f8a857c731d132!2sAndheri%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e1!3m2!1sen!2sin!4v1746257019044!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

