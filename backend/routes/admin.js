const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

// Get all users with their item counts
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ date: -1 });
    
    // Get item counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const itemCount = await Item.countDocuments({ user: user._id });
        return {
          ...user.toObject(),
          itemCount,
          registeredAt: user.date
        };
      })
    );
    
    res.json({
      totalUsers: usersWithStats.length,
      users: usersWithStats
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get system stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    const lostItems = await Item.countDocuments({ type: 'Lost' });
    const foundItems = await Item.countDocuments({ type: 'Found' });
    
    // Recent users (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentUsers = await User.countDocuments({ date: { $gte: sevenDaysAgo } });
    
    // Recent items (last 7 days)
    const recentItems = await Item.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
    
    res.json({
      users: {
        total: totalUsers,
        recent: recentUsers
      },
      items: {
        total: totalItems,
        lost: lostItems,
        found: foundItems,
        recent: recentItems
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage()
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
