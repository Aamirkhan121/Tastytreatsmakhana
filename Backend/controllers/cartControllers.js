// import Cart from "../models/Cart.js";

// export const addToCart = async (req, res) => {
//   const { product } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId: req.user.id });

//     if (!cart) {
//       cart = new Cart({ userId: req.user.id, products: [product] });
//     } else {
//       const existing = cart.products.find(p => p.productId === product.productId);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         cart.products.push(product);
//       }
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id });

//     if (!cart) {
//       return res.status(200).json({ products: [] }); // empty cart
//     }

//     res.status(200).json({ products: cart.products });
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res.status(500).json({ message: "Error fetching cart" });
//   }
// };


// export const removeFromCart = async (req, res) => {
//   const { productId } = req.body;

//   try {
//     const cart = await Cart.findOne({ userId: req.user.id });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.products = cart.products.filter(item => item.productId !== productId);

//     await cart.save();

//     res.status(200).json({ message: "Item removed", cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


