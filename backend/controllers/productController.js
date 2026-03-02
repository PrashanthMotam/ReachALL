const Product = require("../models/Product");

// POST /api/products
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products (with search + pagination)
const getProducts = async (req, res) => {
  try {
    const { search, category, page = 1 } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const limit = 3; // 3 products per page
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct
};