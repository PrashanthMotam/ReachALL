const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);
router.put("/:id", updateQuantity);  // update quantity

module.exports = router;