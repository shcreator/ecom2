const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmation = (email, orderId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Confirmation',
    text: `Thank you for your purchase! Your order ID is ${orderId}.`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

const sendNewsletter = (email, subject, content) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: content,
  };

  // Send email using transporter
  // ...
};

module.exports = {
  sendOrderConfirmation,
  sendNewsletter,
};
