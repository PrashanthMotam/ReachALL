const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", require("./models/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

// Seed multiple products into DB
app.get("/seed-products", async (req, res) => {
  try {
    const Product = require("./models/Product");

    await Product.deleteMany(); // optional: clears existing products

    const products = await Product.insertMany([
      {
        name: "iPhone 15",
        description:
          "The iPhone 15 features a powerful A16 Bionic chip, Super Retina display, advanced dual-camera system, and premium build quality.",
        price: 80000,
        category: "electronics",
        stock: 10,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
      },
      {
        name: "Samsung Galaxy S23",
        description:
          "Flagship Android smartphone with Snapdragon processor, dynamic AMOLED display, and professional-grade camera performance.",
        price: 75000,
        category: "electronics",
        stock: 15,
        image:
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
      },
      {
        name: "OnePlus 12",
        description:
          "High-performance smartphone featuring fast charging, smooth AMOLED display, and optimized OxygenOS experience.",
        price: 65000,
        category: "electronics",
        stock: 12,
        image:
          "https://images.unsplash.com/photo-1580910051074-3eb694886505"
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        description:
          "Industry-leading noise cancellation headphones with crystal clear audio and long-lasting battery life.",
        price: 30000,
        category: "accessories",
        stock: 20,
         image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Apple Watch Series 9",
        description:
          "Advanced smartwatch with health tracking, fitness monitoring, and seamless iPhone integration.",
        price: 45000,
        category: "wearables",
        stock: 8,
        image:
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
      }
    ]);

    res.json({
      message: "Products seeded successfully",
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});