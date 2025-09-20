import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    extraImages: [""]
  });

  // For edit
  useEffect(() => {
    if (id) {
      axios
        .get(`https://tastytreatsmakhana.onrender.com/api/products/${id}`)
        .then((res) => {
          setFormData({
            ...res.data,
            extraImages: res.data.extraImages?.join(", ") || ""
          });
        })
        .catch((err) => console.error("Failed to fetch product", err));
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // ✅ Auto-generate slug from name
      const slug = formData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      // ✅ Convert extraImages string into array
      const dataToSend = {
        ...formData,
        price: Number(formData.price), // ✅ ensure number
        slug,
        extraImages: formData.extraImages
          ? formData.extraImages.split(",").map((img) => img.trim())
          : []
      };
      
      if (id) {
        await axios.put(`https://api.tastycrunchmakhana.com/api/products/${id}`, dataToSend);
        alert("Product updated!");
      } else {
        await axios.post("https://api.tastycrunchmakhana.com/api/products", dataToSend);
        alert("Product created!");
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-20">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full border p-2 rounded" />
        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" required className="w-full border p-2 rounded" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Main Image URL" required className="w-full border p-2 rounded" />
        <input name="extraImages" value={formData.extraImages} onChange={handleChange} placeholder="Extra Image URLs (comma separated)" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {id ? "Update" : "Add"} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
