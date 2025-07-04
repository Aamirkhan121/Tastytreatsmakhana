import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const About = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://tastytreatsmakhana.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 text-gray-900">
      
      {/* Hero Section */}
      <section className="py-20 text-center px-4 relative overflow-hidden">
        <motion.h1
          className="text-5xl font-extrabold text-orange-700 mb-4 tracking-tight drop-shadow-sm"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Tasty Crunch Makhana
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Elevating India’s favorite super-snack with bold flavors, clean ingredients & love.
        </motion.p>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-2 items-center gap-10">
        <motion.img
          src="/makhana_bowl.jpg"
          alt="Makhana Bowl"
          className="w-full rounded-3xl shadow-2xl object-cover h-[400px]"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Tasty Crunch was born from a passion to redefine snacking. We started with a simple idea—
            make makhanas fun, flavorful, and guilt-free. Sourced from the finest farms and roasted with care,
            our makhanas are a crunch above the rest.
          </p>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <section className="bg-orange-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-12">
          Signature Makhana Flavors
        </h2>
        {loading ? (
          <p className="text-center text-orange-600">Loading products...</p>
        ) : (
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((item) => (
              <motion.div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 text-center"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-xl mb-4 shadow-sm"
                />
                <h3 className="text-xl font-bold text-orange-700">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <p className="text-sm text-gray-500 mt-1">Flavor: {item.flavor}</p>
                <p className="text-orange-800 font-semibold mt-2 text-lg">₹{item.price}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-6">
          {[
            { number: "100K+", label: "Makhanas Sold" },
            { number: "10+", label: "Delicious Flavors" },
            { number: "4.9★", label: "Customer Rating" },
            { number: "100%", label: "Natural & Gluten Free" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="space-y-2"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <h3 className="text-4xl font-bold text-orange-700">{stat.number}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16 text-center px-4">
        <motion.h2
          className="text-3xl font-bold mb-3"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          Ready to Snack Smarter?
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Join the Makhana Revolution with Tasty Treats today!
        </motion.p>
        <motion.button
          onClick={() => navigate("/products")}
          className="bg-white text-orange-600 font-bold py-2 px-6 rounded-full shadow-md hover:bg-orange-100 transition"
          whileHover={{ scale: 1.05 }}
        >
          Explore Our Products
        </motion.button>
      </section>
    </div>
  );
};

export default About;

