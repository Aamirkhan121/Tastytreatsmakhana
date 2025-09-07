import Cart from "../models/Cart.js";

// Add or increment
export const addToCart = async (req, res) => {
  const { product } = req.body; // { productId, name, price, image, quantity? }
  try {
    const userId = req.user._id; // ✅ consistent
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{
          ...product,
          quantity: product.quantity && product.quantity > 0 ? product.quantity : 1
        }]
      });
    } else {
      const idx = cart.products.findIndex(p => p.productId === product.productId);
      if (idx > -1) {
        cart.products[idx].quantity += product.quantity && product.quantity > 0 ? product.quantity : 1;
      } else {
        cart.products.push({
          ...product,
          quantity: product.quantity && product.quantity > 0 ? product.quantity : 1
        });
      }
    }
    await cart.save();
    return res.status(200).json({ products: cart.products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ products: [] });
    return res.status(200).json({ products: cart.products });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(item => item.productId !== productId);
    await cart.save();
    return res.status(200).json({ message: "Item removed", products: cart.products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Optional: update quantity (inc/dec or set)
export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body; // quantity >= 1
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(p => p.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (quantity <= 0) {
      cart.products = cart.products.filter(p => p.productId !== productId);
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    return res.status(200).json({ products: cart.products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Optional: clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ products: [] });
    cart.products = [];
    await cart.save();
    return res.status(200).json({ products: [] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
