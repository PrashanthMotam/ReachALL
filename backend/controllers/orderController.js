const Order = require("../models/Order");
const Cart = require("../models/cart");

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price
    }));

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const order = await Order.create({
      items: orderItems,
      totalAmount
    });

    // clear cart after placing order
    await Cart.deleteMany();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder };