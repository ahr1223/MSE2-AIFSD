const Item = require('../models/Item');

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('user', ['name', 'email']).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', ['name', 'email']);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Search items by name
const searchItems = async (req, res) => {
  try {
    const { name } = req.query;

    const items = await Item.find({
      itemName: { $regex: name, $options: 'i' }
    }).populate('user', ['name', 'email']).sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add item
const addItem = async (req, res) => {
  try {
    const { itemName, description, category, type, location, date, contactInfo } = req.body;

    const newItem = new Item({
      itemName,
      description,
      category,
      type,
      location,
      date,
      contactInfo,
      user: req.user.id
    });

    const item = await newItem.save();
    await item.populate('user', ['name', 'email']);

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { itemName, description, category, type, location, date, contactInfo } = req.body;

    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check user ownership
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update item
    item.itemName = itemName;
    item.description = description;
    item.category = category;
    item.type = type;
    item.location = location;
    item.date = date;
    item.contactInfo = contactInfo;

    await item.save();
    await item.populate('user', ['name', 'email']);

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check user ownership
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllItems,
  getItemById,
  searchItems,
  addItem,
  updateItem,
  deleteItem
};
