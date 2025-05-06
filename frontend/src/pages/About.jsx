import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://tastytreatsmakhana.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-orange-50 py-20 text-center px-4">
        <h1 className="text-5xl font-bold text-orange-700 mb-4 tracking-tight">
          About Tasty Treats Makhana
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Elevating India's favorite super-snack with bold flavors, clean ingredients, and love.
        </p>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-2 items-center gap-10">
        <img
          src="/makhana_bowl.jpg"
          alt="Makhana Bowl"
          className="w-full rounded-3xl shadow-lg object-cover h-[400px]"
        />
        <div>
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Tasty Treats was born from a passion to redefine snacking. We started with a simple idea—make makhanas fun, flavorful, and guilt-free. Sourced from the finest farms and roasted with care, our makhanas are a crunch above the rest.
          </p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-orange-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-12">
          Signature Makhana Flavors
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-orange-700">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-sm text-gray-500">Flavor: {item.flavor}</p>
              <p className="font-semibold text-orange-800 mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-6">
          <div>
            <h3 className="text-4xl font-bold text-orange-700">100K+</h3>
            <p className="text-sm text-gray-500">Makhanas Sold</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-700">10+</h3>
            <p className="text-sm text-gray-500">Delicious Flavors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-700">4.9★</h3>
            <p className="text-sm text-gray-500">Customer Rating</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-700">100%</h3>
            <p className="text-sm text-gray-500">Natural & Gluten Free</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-14 text-center px-4">
        <h2 className="text-3xl font-bold mb-3">Ready to Snack Smarter?</h2>
        <p className="text-lg mb-6">Join the Makhana Revolution with Tasty Treats today!</p>
        <button
         onClick={() => navigate("/products")}
        className="bg-white text-orange-600 font-bold py-2 px-6 rounded-full shadow hover:bg-orange-100 transition">
          Explore Our Products
        </button>
      </section>
    </div>
  );
};

export default About;

