const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get All Products
router.get('/', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products');
    res.json(allProducts.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    res.json(product.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Product
router.post('/', async (req, res) => {
  const { name, category, price, is_premium, image_url } = req.body;
  try {
    const newProduct = await pool.query(
      'INSERT INTO products (name, category, price, is_premium, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category, price, is_premium, image_url]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Product
// Delete Product
// ... other product-related functionalities

module.exports = router;
