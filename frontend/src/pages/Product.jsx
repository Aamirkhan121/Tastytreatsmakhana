import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [addingToCartId, setAddingToCartId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      return navigate("/login");
    }
  
    navigate("/checkout", { state: { product } });

  
  
    // try {
    //   await axios.post(
    //     "/api/cart/add",
    //     { product: { ...product, productId: product._id, quantity: 1 } },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   localStorage.setItem("buyNowItem", JSON.stringify({ ...product, quantity: 1 }));
    //   navigate("/checkout?buyNow=true");
    // } catch (error) {
    //   toast.error("Failed to proceed to checkout");
    //   console.error(error);
    // }
  };
  

  return (
    <div className="bg-orange-50 py-12 px-6 min-h-screen text-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-10">
        Explore Our Signature Flavors
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-80">
          <div className="w-12 h-12 border-4 border-dotted rounded-full border-orange-500 animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Fetching deliciousness...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {products.length === 0 ? (
            <p className="text-center text-gray-600">No products available.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-t-2xl"
                  onClick={() => navigate(`/products/${product._id}`)}
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-orange-700">{product.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-800">₹{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      // disabled={addingToCartId === product._id}
                      // className={`mt-2 px-4 py-2 rounded text-white ${
                      //   addingToCartId === product._id ? "bg-blue-300" : "bg-blue-500"
                      // }
                      // `}
                    >
                      {/* {addingToCartId === product._id ? "Adding..." : "Add to Cart"} */}
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-full transition duration-200"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;


