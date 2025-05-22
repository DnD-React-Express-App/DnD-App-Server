const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require('../models/User.model')
const jwt = require('jsonwebtoken');


router.put('/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    const updates = { ...req.body };
  
    delete updates.password; 
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const payload = {
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name
      };
  
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '6h'
      });
  
      res.json({ user: payload, authToken });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;