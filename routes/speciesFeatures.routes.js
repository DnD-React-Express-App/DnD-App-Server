const express = require('express');
const router = express.Router();
const speciesFeature = require('../models/SpeciesFeature.model');

// POST /api/abilities
router.post('/', async (req, res) => {
  try {
    const speciesFeature = new SpeciesFeature(req.body);
    await speciesFeature.save();
    res.status(201).json(speciesFeature);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;