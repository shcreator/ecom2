const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../db');

const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
  const { userId, templateId } = req.body;
  try {
    const newOrder = await pool.query(
      'INSERT INTO orders (user_id, template_id) VALUES ($1, $2) RETURNING *',
      [userId, templateId]
    );

    // Send Email Confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Order Confirmation',
      text: `Thank you for your purchase! Your order ID is ${newOrder.rows[0].id}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json(newOrder.rows[0]);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
