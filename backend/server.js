const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const errorHandler = require('./utils/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', async (req, res) => {
  try {
    const User = require('./models/User');
    const Item = require('./models/Item');

    const userCount = await User.countDocuments();
    const itemCount = await Item.countDocuments();

    res.json({
      msg: 'Lost & Found API is running',
      stats: {
        totalUsers: userCount,
        totalItems: itemCount,
        uptime: process.uptime()
      }
    });
  } catch (err) {
    res.json({ msg: 'Lost & Found API is running', error: 'Could not fetch stats' });
  }
});

// Define Routes
app.use('/api', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/admin', require('./routes/admin'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
