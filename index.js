const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const templateRoutes = require('./routes/template');
const orderRoutes = require('./routes/order');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
