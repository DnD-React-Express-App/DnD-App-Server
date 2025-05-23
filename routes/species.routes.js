const express = require('express');
const router = express.Router();
const Species = require('../models/Species.model');

router.post('/', async (req, res) => {
  try {
    const species = new Species(req.body);
    await species.save();
    res.status(201).json(species);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const species = await Species.findOne({ name: req.params.name })
      .populate('abilities');
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;