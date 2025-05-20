const express = require("express");
const router = express.Router();
const Character = require("../models/Character.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// CREATE a new character
router.post("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const characterData = { ...req.body, user: userId };

  try {
    const newCharacter = await Character.create(characterData);
    res.status(201).json(newCharacter);
  } catch (err) {
    next(err);
  }
});

// GET all characters for the logged-in user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const characters = await Character.find({ user: req.payload._id }).populate("items");
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

// GET one character by ID
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const character = await Character.findOne({ _id: id, user: req.payload._id }).populate("items");

    if (!character) {
      return res.status(404).json({ message: "Character not found or unauthorized." });
    }

    res.json(character);
  } catch (err) {
    next(err);
  }
});

// UPDATE character by ID
router.put("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedCharacter = await Character.findOneAndUpdate(
      { _id: id, user: req.payload._id },
      req.body,
      { new: true }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found or unauthorized." });
    }

    res.json(updatedCharacter);
  } catch (err) {
    next(err);
  }
});

// DELETE character by ID
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCharacter = await Character.findOneAndDelete({ _id: id, user: req.payload._id });

    if (!deletedCharacter) {
      return res.status(404).json({ message: "Character not found or unauthorized." });
    }

    res.json({ message: "Character deleted successfully." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
