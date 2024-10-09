const express = require('express');
const pool = require('../db');
const emailService = require('../services/email'); // Assuming you have a separate email service

const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
  const { userId, templateId } = req.body;
  try {
    const newOrder = await pool.query(
      'INSERT INTO orders (user_id, template_id) VALUES ($1, $2) RETURNING *',
      [userId, templateId]
    );

    // Send Order Confirmation Email
    await emailService.sendOrderConfirmation(req.body.email, newOrder.rows[0].id);

    res.json(newOrder.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Orders for a User
// ... other order-related functionalities

module.exports = router;
