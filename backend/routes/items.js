const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllItems,
  getItemById,
  searchItems,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// Get all items
router.get('/', auth, getAllItems);

// Get item by ID
router.get('/:id', auth, getItemById);

// Search items by name
router.get('/search', auth, searchItems);

// Add item (Protected)
router.post('/', auth, addItem);

// Update item (Protected - Only owner)
router.put('/:id', auth, updateItem);

// Delete item (Protected - Only owner)
router.delete('/:id', auth, deleteItem);

module.exports = router;
