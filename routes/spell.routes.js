const router = require('express').Router();
const Spell = require('../models/Spell.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const spells = await Spell.find();
    res.json(spells);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isAuthenticated, async (req, res) => {
    try {
      const spell = await Spell.findById(req.params.id);
      if (!spell) return res.status(404).json({ error: 'Spell not found' });
      res.json(spell);
    } catch (err) {
      res.status(400).json({ error: 'Invalid ID format' });
    }
  });

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const newSpell = await Spell.create(req.body);
    res.status(201).json(newSpell);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const deleted = await Spell.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'spell not found' });
    res.json({ message: 'spell deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updated = await Spell.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Spell not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
