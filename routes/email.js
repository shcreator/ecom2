const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../db');

const router = express.Router();

// Send Order Confirmation Email
router.post('/order-confirmation', async (req, res) => {
  const { email, orderId } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation',
      text: `Thank you for your purchase! Your order ID is ${orderId}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json({ message: 'Email sent successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send Newsletter or Promotional Email
router.post('/marketing-email', async (req, res) => {
  // Get email addresses from database (e.g., users who opted in)
  // Send email using Nodemailer
  // ...
});

// ... other email-related functionalities

module.exports = router;
