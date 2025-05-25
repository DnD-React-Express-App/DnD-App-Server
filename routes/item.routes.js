const express = require('express');
const router = express.Router();

const Item = require('../models/Item.model');
const Armor = require('../models/Items/Armor.model');
const Weapon = require('../models/Items/Weapon.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");

const modelMap = {
  Armor,
  Weapon,
};

router.post('/', isAuthenticated, async (req, res) => {
  const { type } = req.body;

  const Model = modelMap[type];
  if (!Model) {
    return res.status(400).json({ error: 'Invalid item type' });
  }

  try {
    const newItem = await Model.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    item.set(req.body);     
    await item.save();       

    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;