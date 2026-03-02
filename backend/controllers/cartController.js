const Cart = require("../models/cart");
const Product = require("../models/Product");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existing = await Cart.findOne({ productId });

    if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = existing.quantity * product.price;
      await existing.save();
      return res.json(existing);
    }

    const cartItem = await Cart.create({
      productId,
      quantity,
      totalPrice: product.price * quantity
    });

    res.status(201).json(cartItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find().populate("productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// REMOVE ITEM
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE QUANTITY (NEW)
const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findById(req.params.id)
      .populate("productId");

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity * cartItem.productId.price;

    await cartItem.save();

    res.json(cartItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
};